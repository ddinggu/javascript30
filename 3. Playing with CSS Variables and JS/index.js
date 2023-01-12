import inputHandleRootCSSPropertyChange from './handler.js';

const inputs = document.querySelectorAll('.control-wrapper input');
const isDarkMode =
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

inputs.forEach(input => {
    input.addEventListener('mousemove', inputHandleRootCSSPropertyChange);
    input.addEventListener('change', inputHandleRootCSSPropertyChange);
});

// DOM의 기본값으로 다크모드의 색상값(#ffc600)을 부여하였고, 다크모드가 아닌 경우 input의 속성값을 변경하는 로직.
// *1. DOM 구성이 완료(DOMContentLoaded) 전에 js문이 실행되나, 현 실력으로는 DOM을 불필요하게 흔들어 놓는지 추적불가.
// *2. 재사용하는 로직이 아니므로, 함수화하지 않음.
(function () {
    if (!isDarkMode) {
        inputs[2].value = '#f93434';
    }
})();
