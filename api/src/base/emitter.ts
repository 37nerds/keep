import { EventEmitter } from "events";

let emitterInstance: EventEmitter;

const emitter = () => {
    if (!emitterInstance) {
        emitterInstance = new EventEmitter();
    }
    return emitterInstance;
};

export default emitter;
