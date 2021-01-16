import EventSource from './EventSource';

class Engine extends EventSource {
    constructor(canvas) {
        super();

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        /* Хитрая вещь: делаем canvas активным для пользовательского ввода*/
        canvas.tabIndex = 1000;
        canvas.style.outline = 'none';

        console.log('ENGINE');
        canvas.addEventListener('keydown', (e) => this.onKeyDown(e), false);

        // this.char_pos = { x: 300, y: 300 };

        this.thisLoop = this.loop.bind(this);

        Object.assign(this, {
            thisLoop: this.loop.bind(this),
            startTime: 0, // время начала работы движка по времений браузера
            lastRenderTime: 0, // время предыдущего вызова рендера
            lastTimeStamp: 0, // время последего вызова по времений браузера
        });
    }

    onKeyDown(e) {
        console.log('KEY PRESSED', e.code);

        if (e.code === 'ArrowLeft') this.char_pos.x -= 10;
        else if (e.code === 'ArrowRight') this.char_pos.x += 10;
        else if (e.code === 'ArrowUp') this.char_pos.y -= 10;
        else if (e.code === 'ArrowDown') this.char_pos.y += 10;
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
