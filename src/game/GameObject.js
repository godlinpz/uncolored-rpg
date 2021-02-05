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

    worldPosition(offset_percent_x = 0, offset_percent_y = 0) {
        const { cell } = this;
        const map = this.cell.map;
        return {
            x: cell.x + (map.cellWidth * offset_percent_x) / 100,
            y: cell.y + (map.cellHeight * offset_percent_y) / 100,
        };
    }

    canvasPosition(offset_percent_x = 0, offset_percent_y = 0) {
        const win = this.cell.map.window;
        const pos = this.worldPosition(offset_percent_x, offset_percent_y);

        return {
            x: pos.x - win.x,
            y: pos.y - win.y,
        };
    }

    render(time, timeGap) {
        const cfg = this.cfg;
        const map = this.cell.map;
        const ctx = map.engine.ctx;

        const { x, y } = this.canvasPosition();

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
