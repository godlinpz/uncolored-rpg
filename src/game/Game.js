import Engine from '../engine/Engine';
import GameMap from './GameMap';
import levelCfg from './map.json';

class Game {
    constructor(id = 'game') {
        const eng = (this.engine = new Engine(document.getElementById(id)));

        Object.assign(this, {
            map: new GameMap(this, eng, levelCfg),
            player: null,
        });

        this.initEngine();
        this.initKeys();
    }

    initEngine() {
        let eng = this.engine;
        eng.on('init', () => this.onEngineReady());

        eng.init();
    }

    initKeys() {
        this.keys = {
            ArrowLeft: () => this.movePlayer(-1, 0),
            ArrowRight: () => this.movePlayer(1, 0),
            ArrowUp: () => this.movePlayer(0, -1),
            ArrowDown: () => this.movePlayer(0, 1),
        };
    }
    onEngineReady() {
        let eng = this.engine;
        this.map.init();

        // подключим обработчики событий движка
        [
            ['keydown', (eName, e) => this.onKeyDown(e)],
            ['keyup', (eName, e) => this.onKeyUp(e)],
            ['mousedown', (eName, e) => this.onMouseDown(e)],
            ['mouseup', (eName, e) => this.onMouseUp(e)],
            ['render', (eName, data) => this.onRender(data)],
        ].forEach(([e, handler]) => eng.on(e, handler));

        eng.start();

        return this;
    }

    onKeyDown({ code }) {
        //this.keys[code] && this.keys[code]();
    }

    onKeyUp({ code }) {
        this.keys[code] && this.keys[code]();
    }

    onMouseDown(e) {}

    onMouseUp(e) {}

    onRender([time, timeGap]) {
        this.map.render(time, timeGap);
        // console.log(x);
    }

    setPlayer(player) {
        this.player = player;
    }

    movePlayer(dx, dy) {
        const player = this.player;

        if (player) {
            const cell = player.cell;
            const [newX, newY] = [cell.cellX + dx, cell.cellY + dy];
            const newCell = this.map.cell(newX, newY);

            // console.log('MOVE PLAYER', newCell);

            if (newCell && newCell.filter((o) => o.cfg === 'grass').length) {
                console.log('MOVE PLAYER', newCell);
                player.moveToCell(newCell);
            }
        }
    }

    static init(id = 'game') {
        console.log('INIT');

        if (!Game.game) Game.game = new Game(id);
    }
}

export default Game;
