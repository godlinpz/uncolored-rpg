import EventSource from '../engine/EventSource';

const cellTypes = {
    wall: 'black',
    grass: 'green',
    lava: 'red',
    player: 'orange',
};

class GameObject extends EventSource {
    constructor(cfg, cell = null) {
        super();
        Object.assign(this, cfg);

        if (cfg === 'player') cell.map.game.setPlayer(this);

        Object.assign(this, {
            cell,
            cfg,
            state: cfg['state'] || 'main',
        });
        Object.assign(this, cell ? cell.worldPosition() : { x: 0, y: 0 });
    }

    worldPosition() {
        const { cell } = this;
        return {
            x: cell.x,
            y: cell.y,
        };
    }

    render(time, timeGap) {
        const cfg = this.cfg;
        const map = this.cell.map;
        const ctx = map.engine.ctx;

        const { x, y } = this.worldPosition();

        ctx.fillStyle = cellTypes[cfg];
        ctx.fillRect(x, y, map.cellWidth, map.cellHeight);
    }

    setCell(cell) {
        this.cell = cell;
    }

    moveToCell(cell) {
        if (this.cell) this.cell.remove(this);
        console.log('moveToCell');
        cell.push(this);
    }
}

export default GameObject;
