import { resolveConfigFile } from 'prettier';
import Cell from './Cell';
import GameMapWindow from './GameMapWindow';
import { clamp } from '../engine/util';

class GameMap {
    constructor(game, engine, levelCfg) {
        const mapWidth = levelCfg.map[0].length;
        const mapHeight = levelCfg.map.length;
        const { width, height } = engine.canvas;

        const [cellWidth, cellHeight] = [width / levelCfg.window.width, height / levelCfg.window.height];
        Object.assign(this, {
            game,
            engine,
            levelCfg,
            width: mapWidth, // ширина карты в ячейках
            height: mapHeight, // высота карты в ячейках
            cellWidth, // ширина ячейки в условных пикселях
            cellHeight, // высота ячейки в условных пикселях
            worldWidth: mapWidth * cellWidth, // ширина мира в условных пикселях
            worldHeight: mapHeight * cellHeight, // высота мира в условных пикселях
            level: [],
            window: new GameMapWindow(this, levelCfg.window),
        });
    }

    init() {
        let level = this.level;
        this.window.init();

        this.levelCfg.map.forEach((rowCfg, y) => {
            rowCfg.forEach((cellCfg, x) => {
                level[y] || (level[y] = []);
                level[y][x] = new Cell(cellCfg, this, x, y);
            });
        });

        console.log(level);
    }

    render(time, timeGap) {
        const ctx = this.engine.ctx;
        const level = this.level;
        const { window } = this;

        window.render();

        const startCell = window.startCell();
        const endCell = window.endCell();

        for (let y = startCell.cellY; y <= endCell.cellY; ++y)
            for (let x = startCell.cellX; x <= endCell.cellX; ++x) {
                const cell = this.cell(x, y);
                cell.render(time, timeGap);
            }
    }

    cell(cellX, cellY) {
        return this.level[cellY] && this.level[cellY][cellX];
    }

    cellAt(x, y) {
        return this.cell(
            clamp((x / this.cellWidth) | 0, 0, this.width - 1),
            clamp((y / this.cellHeight) | 0, 0, this.height - 1),
        );
    }
}

export default GameMap;
