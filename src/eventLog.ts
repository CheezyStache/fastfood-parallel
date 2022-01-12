export interface Event {
    level: string;
    date: Date;
    point: string;
    action: string;
}


export class EventLog {
    log: Event[];

    constructor() {
        this.log = [];
    }

    info(point: string, action: string) {
        this.log.push({ level: "INFO", date: new Date(), point, action });
    }

    export() {
        return this.log
            .map(event =>
                 `${event.date.toISOString()}: ${event.level}: ${event.point}: ${event.action}`)
            .join("\n");
    }
}
