const drumBoxs = Array.from(document.querySelectorAll('.drum-box'));

const playDrumSound = drum_key => {
    // Drum doesn't stop immediately!!
    const drum = document.querySelector(`audio[data-key="${drum_key}"]`);
    if (!drum) return;

    drum.currentTime = 0;
    drum.play();
};

const playDrumAnimation = drum_key => {
    const drumBox = document.querySelector(`div[data-key="${drum_key}"]`);
    if (!drumBox) return;

    drumBox.classList.add('drum-box-playing');
};

// Speration based on function for unit test
const playDrum = key => {
    playDrumSound(key);
    playDrumAnimation(key);
};

const removeDrumAnimation = event => {
    if (event.propertyName !== 'transform') return;
    event.target.classList.remove('drum-box-playing');
};

// Prevent unnessery searching DOM
const isDrumKeys = key =>
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].includes(key);

window.addEventListener(
    'keydown',
    event => {
        if (event.defaultPrevented) return;
        if (!event.isTrusted) return; // Check input from User-Agent

        // Not recommended to use 'keyCode'
        // Because output different values in Inputs like OS, Contury..
        // https://stackoverflow.com/a/49903087
        const userInputedKey = event.key.toUpperCase(); // 'key' distingush Upper, Lowercase in readable char
        if (!isDrumKeys(userInputedKey)) return;

        playDrum(userInputedKey);
    },
    true // Event Capturing(https://ko.javascript.info/bubbling-and-capturing)
);

drumBoxs.forEach(drumBox =>
    drumBox.addEventListener('transitionend', removeDrumAnimation)
);
