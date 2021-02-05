import EventSource from '../engine/EventSource';
import { clamp } from '../engine/util';

class GameMapWindow extends EventSource {
    constructor(map, cfg) {
        super();
        Object.assign(this, {
            cfg,
            map,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            followedObject: null,
        });
    }

    init() {
        const { map, cfg } = this;

        Object.assign(this, {
            x: map.cellWidth * cfg.x,
            y: map.cellHeight * cfg.y,
            width: map.cellWidth * cfg.width,
            height: map.cellHeight * cfg.height,
        });
    }

    worldPosition(offset_percent_x = 0, offset_percent_y = 0) {
        return {
            x: this.x + (this.width * offset_percent_x) / 100,
            y: this.y + (this.height * offset_percent_y) / 100,
        };
    }

    moveTo(x, y) {
        const { map } = this;
        const [newX, newY] = [clamp(x, 0, map.worldWidth - this.width), clamp(y, 0, map.worldHeight - this.height)];

        this.x = newX;
        this.y = newY;
    }

    startCell() {
        const { map } = this;
        const { x, y } = this.worldPosition();
        return map.cellAt(clamp(x, 0, map.worldWidth - 1), clamp(y, 0, map.worldHeight - 1));
    }

    endCell() {
        const { map } = this;
        const { x, y } = this.worldPosition(100, 100);

        return map.cellAt(clamp(x - 1, 0, map.worldWidth - 1), clamp(y - 1, 0, map.worldHeight - 1));
    }

    focus(obj) {
        if (obj) {
            const pos = obj.worldPosition(50, 50);
            this.moveTo(pos.x - this.width / 2, pos.y - this.height / 2);
        }
    }

    follow(obj) {
        this.followedObject = obj;
    }

    render(time, timeGap) {
        this.focus(this.followedObject);
    }
}

export default GameMapWindow;
