/**
 * input 태그들의 value 값으로 루트(:root) css 변수 값을 변경하는 이벤트핸들러
 *
 * @param {EventListenerOrEventListenerObject} event
 * @returns {void} void
 */
export default function inputHandleRootCSSPropertyChange(event) {
    const suffix = this.dataset.sizing || '';

    document.documentElement.style.setProperty(
        `--${this.name}`,
        event.target.value + suffix
    );
}
