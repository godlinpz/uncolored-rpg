import Engine from '../engine/Engine';
import GameMap from './GameMap';
import levelCfg from './map.json';

class Game {
    constructor(id = 'game') {
        const eng = (this.engine = new Engine(document.getElementById(id)));

        this.map = new GameMap(this, eng, levelCfg);

        this.initEngine();
    }

    initEngine() {
        let eng = this.engine;
        eng.on('init', () => this.onEngineReady());

        eng.init();
    }

    onEngineReady() {
        let eng = this.engine;
        this.map.init();

        // подключим обработчики событий движка
        [['render', (e, data) => this.onRender(data)]].forEach(([e, handler]) => eng.on(e, handler));

        eng.start();

        return this;
    }

    onRender([time, timeGap]) {
        this.map.render(time, timeGap);
        // console.log(x);
    }

    static init(id = 'game') {
        console.log('INIT');

        if (!Game.game) Game.game = new Game(id);
    }
}

export default Game;
