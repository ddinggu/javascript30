import setTimeToClock from './helper.js';

let clockIntervalId;

const excuteClock = () => {
    setTimeToClock();
    return setInterval(setTimeToClock, 1000);
};

clockIntervalId = excuteClock();

setTimeout(() => clearInterval(clockIntervalId), 50000);
