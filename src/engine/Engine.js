import EventSource from './EventSource';

class Engine extends EventSource {
    constructor(canvas) {
        super();

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        /* Хитрая вещь: делаем canvas активным для пользовательского ввода*/
        canvas.tabIndex = 1000;
        canvas.style.outline = 'none';

        // this.char_pos = { x: 300, y: 300 };

        this.thisLoop = this.loop.bind(this);

        Object.assign(this, {
            thisLoop: this.loop.bind(this),
            startTime: 0, // время начала работы движка по времений браузера
            lastRenderTime: 0, // время предыдущего вызова рендера
            lastTimeStamp: 0, // время последего вызова по времений браузера
            keysPressed: new Set(),
            images: {},
            sprites: {},
        });

        canvas.addEventListener('keydown', (e) => this.onKeyDown(e), false);
        canvas.addEventListener('keyup', (e) => this.onKeyUp(e), false);
        canvas.addEventListener('mousedown', (e) => this.onMouseDown(e), false);
        canvas.addEventListener('mouseup', (e) => this.onMouseUp(e), false);
    }

    loadImage(url) {
        return new Promise((resolve) => {
            if (this.images[url]) {
                resolve(this.images[url]);
            } else {
                let img = new Image();
                this.images[url] = img;
                img.onload = () => resolve(img);
                img.src = url;
            }
        });
    }

    loadSprites(spritesGroups) {
        const imageLoaders = [];

        for (let groupName in spritesGroups) {
            const group = spritesGroups[groupName];

            this.sprites[groupName] = group;

            for (let spriteName in group) {
                const sprite = group[spriteName];
                const { img } = sprite;

                if (!this.images[img]) imageLoaders.push(this.loadImage(img));
            }
        }

        console.log('loadSprites', imageLoaders);

        return Promise.all(imageLoaders);
    }

    renderFrame({ sprite, frame, x, y, w, h }) {
        const spriteCfg = this.sprites[sprite[0]][sprite[1]];
        const [fx, fy, fw, fh] = spriteCfg.frames[frame];
        const img = this.images[spriteCfg.img];

        this.ctx.drawImage(img, fx, fy, fw, fh, x, y, w, h);
    }

    onKeyDown(e) {
        console.log('KEY PRESSED', e.code);

        this.keysPressed.add(e.code);
        this.trigger('keydown', e);
    }

    onKeyUp(e) {
        console.log('KEY UP', e.code);

        this.keysPressed.delete(e.code);
        this.trigger('keyup', e);
    }

    onMouseDown(e) {
        this.trigger('mousedown', e);
    }

    onMouseUp(e) {
        this.trigger('mouseup', e);
    }

    start() {
        this.loop();
    }

    loop(timestamp) {
        if (!this.startTime) {
            this.startTime = timestamp;
            this.lastRenderTime = 0;
        }

        const oldTime = this.lastRenderTime;

        this.lastRenderTime = timestamp - this.startTime;
        this.lastTimeStamp = timestamp;

        this.trigger('render', [this.lastRenderTime, timestamp - oldTime]);

        window.requestAnimationFrame(this.thisLoop);
    }

    init() {
        this.trigger('init');
    }
}

export default Engine;
