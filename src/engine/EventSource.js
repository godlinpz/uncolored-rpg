class EventSource {
    constructor() {
        this.subscribers = {};
    }

    on(event, sub) {
        let subs = this.subscribers[event];
        if (!subs) subs = this.subscribers[event] = [];
        subs.push(sub);
    }

    trigger(event, data = null) {
        let subs = this.subscribers[event];
        if (subs && subs.length) {
            subs.forEach((sub) => sub(event, data));
        }
    }
}

export default EventSource;
