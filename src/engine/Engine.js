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

        this.char_pos = { x: 300, y: 300 };

        this.thisLoop = this.loop.bind(this);
        console.log('TEST');
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
        const ctx = this.ctx;

        ctx.fillStyle = 'black';

        ctx.fillRect(0, 0, 660, 660);

        ctx.fillStyle = 'red';

        // const x = ((timestamp|0.5) % 660000 / 10)|0.5;
        // ctx.fillRect(x, x, 150, 150);

        const { x, y } = this.char_pos;

        ctx.fillRect(x, y, 50, 50);

        // console.log(x);

        window.requestAnimationFrame(this.thisLoop);
    }

    init() {
        this.trigger('init');
    }
}

export default Engine;
