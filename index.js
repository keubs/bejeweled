/**
 * Game class takes two (optional) constructor arguments: rows/cols
 * initialized as a 2d array multiple rows within a column, to allow
 * easier computation of removal of a 'jewel''s falling effect when cleared
 */
class Game {
    jewels = [
        'diamond',
        'sapphire',
        'ruby',
        'opal',
        'amethyst',
        'topaz',
        'onyx',
    ];

    all() {
        const len = arguments.length;
        for (let i = 1; i< len; i++){
            if (arguments[i] === null || arguments[i] !== arguments[i-1])
                return false;
        }
        return true;
    }

    check(jewel, next, skip ) {
        // return if there aren't adjacent jewels to check against
        if(!next || !skip) return jewel;

        // if all three are the same, loop through generating a random jewel until they aren't
        while((this.all(jewel, next, skip))) {
            jewel = this.generateJewel();
        }
        return jewel;
    }

    generateJewel() {
        return this.jewels[Math.floor(Math.random() * this.jewels.length)];
    }


    constructor(rows, cols) {
        this.rowcount = rows || 8;
        this.colcount = cols || 9;
        this.cols = [];
        
        for(let i = 0; i < this.rowcount; i++) {
            const col = [];
            for (let j = 0; j < this.rowcount; j++) {
                let jewel = this.generateJewel();
                // determine previous and 2nd previous jewels in column
                const next = col[j-1] ? col[j-1] : undefined;
                const skip = col[j-1] ? col[j-2] : undefined;

                // determine previous and 2nd previous jewels in a row
                let adjacent, nextAdjacent;
                if (i === 0) {
                    adjacent = undefined;
                    nextAdjacent = undefined;
                } else {
                    adjacent = -1;
                    nextAdjacent = -2;
                }
                
                // check for 3 adjacent jewels in a column, replace if so
                jewel = this.check(jewel, next, skip);
                
                if(this.cols[i+adjacent] && this.cols[i+nextAdjacent]){
                    // check for 3 adjacent jewels in a row, replace if so
                    jewel = this.check(jewel, this.cols[i+adjacent][j], this.cols[i+nextAdjacent][j])
                    jewel = this.check(jewel, next, skip);
                    col.push(jewel);
                }
                else col.push(jewel);
                
            }
            this.cols.push(col);
        }
    }
}

class ui {
    constructor(game) {
        this.game = game;
    }

    render() {
        const board = document.createElement('div');
        board.setAttribute('class', 'board');

        for(let i = 0; i < this.game.cols.length; i++){
            const col = document.createElement('div');
            col.setAttribute('class', 'col');
            
            for(let j = 0; j < this.game.cols[i].length; j++){
                const row = document.createElement('div');
                row.setAttribute('class', `cell ${this.game.cols[i][j]}`);
                col.appendChild(row);
            }
            board.appendChild(col);
        }
        document.getElementById('board').innerHTML = '';
        document.getElementById('board').appendChild(board);
    }
}