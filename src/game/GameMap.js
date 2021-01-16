import { resolveConfigFile } from 'prettier';

class GameMap {
    constructor(game, engine, levelCfg) {
        Object.assign(this, {
            game,
            engine,
            levelCfg,
            width: levelCfg.map[0].length, // ширина карты в ячейках
            height: levelCfg.map.length, // высота карты в ячейках
            cellWidth: 60, // ширина ячейки в условных пикселях
            cellHeight: 60, // высота ячейки в условных пикселях
            worldWidth: 600, // ширина мира в условных пикселях
            worldHeight: 600, // высота мира в условных пикселях
            level: [],
        });
    }

    init() {
        let level = this.level;

        this.levelCfg.map.forEach((rowCfg, y) => {
            rowCfg.forEach((cellCfg, x) => {
                level[y] || (level[y] = []);
                level[y][x] = cellCfg[0];
            });
        });

        console.log(level);
    }

    render(time, timeGap) {
        const ctx = this.engine.ctx;
        const level = this.level;

        for (let y = 0; y < level.length; ++y)
            for (let x = 0; x < level[y].length; ++x) {
                if (level[y][x] === 'wall') ctx.fillStyle = 'black';
                else ctx.fillStyle = 'green';

                ctx.fillRect(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
            }
    }
}

export default GameMap;
