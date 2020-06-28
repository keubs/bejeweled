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

    constructor(rows, cols) {
        this.rowcount = rows || 8;
        this.colcount = cols || 9;
        this.cols = [];
        
        for(let i = 0; i < this.rowcount; i++) {
            this.cols.push(Array.from(({length: this.colcount}), () => this.jewels[Math.floor(Math.random() * this.jewels.length)]));
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

        document.body.appendChild(board);
    }
}