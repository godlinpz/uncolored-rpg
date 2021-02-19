import _ from 'lodash';
import GameObject from './GameObject';

class Cell {
    constructor(cfg, map, cellX, cellY) {
        Object.assign(this, {
            cfg,
            map,
            cellX,
            cellY,
            x: cellX * map.cellWidth,
            y: cellY * map.cellHeight,
            objects: [],
        });

        this.initCell();
    }

    initCell() {
        const { cfg, map } = this;
        const gameObjs = map.game.gameObjects;

        cfg.forEach((objName) => {
            const objCfg = _.cloneDeep(gameObjs[objName]);
            this.objects.push(new GameObject(objCfg, this));
        });
    }

    worldPosition() {
        return {
            x: this.x,
            y: this.y,
        };
    }

    render(time, timeGap) {
        const objs = this.objects;

        if (objs.length)
            objs.forEach((obj) => {
                obj.render(time, timeGap);
            });
    }

    remove(obj) {
        const objects = this.objects;
        console.log('REMOVE 1', this.objects);
        this.objects = objects.filter((o) => o !== obj);
        console.log('REMOVE 2', this.objects);

        obj.setCell(null);

        return obj;
    }

    push(obj) {
        // const objects = this.objects;
        this.remove(obj).setCell(this);
        this.objects.push(obj);
    }

    filter(callback) {
        return this.objects.filter(callback);
    }
}

export default Cell;
