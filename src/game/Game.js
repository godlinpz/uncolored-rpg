import Engine from '../engine/Engine';

class Game {
    constructor(id = 'game') {
        const eng = (this.engine = new Engine(document.getElementById(id)));

        eng.on('init', () => eng.start());

        eng.init();
    }

    static init(id = 'game') {
        console.log('INIT');

        if (!Game.game) Game.game = new Game(id);
    }
}

export default Game;
