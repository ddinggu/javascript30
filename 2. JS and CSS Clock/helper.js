const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');

export const getCurrentTime = () => {
    const currentDate = new Date();
    const hours12Format = currentDate.getHours() % 12 || 12; // change HOUR format 24H to 12H

    // return local(user) time
    return {
        hour: hours12Format,
        minute: currentDate.getMinutes(),
        second: currentDate.getSeconds(),
    };
};

export const getTimeDegreeForClock = currentTime => {
    // prettier-ignore
    const hourDegree = (-90) - ((12 - currentTime.hour) * (360 / 12));
    const minuteDegree = 90 + currentTime.minute * (360 / 60);
    const secondDegree = 90 + currentTime.second * (360 / 60);

    return {
        hourDegree,
        minuteDegree,
        secondDegree,
    };
};

const setTimeToClock = () => {
    const currentTime = getCurrentTime();
    const degrees = getTimeDegreeForClock(currentTime);

    hourHand.style.transform = `rotate(${degrees.hourDegree}deg)`;
    minuteHand.style.transform = `rotate(${degrees.minuteDegree}deg)`;
    secondHand.style.transform = `rotate(${degrees.secondDegree}deg)`;
};

export default setTimeToClock;
