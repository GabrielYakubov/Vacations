import EventEmitter from 'events';

class MyEmitter extends EventEmitter { }

const eventEmitter = new MyEmitter();

eventEmitter.on('start', () => {
    console.log('started')
})


export default eventEmitter;