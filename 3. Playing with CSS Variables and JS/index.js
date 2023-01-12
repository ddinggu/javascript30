const inputs = document.querySelectorAll('.control-wrapper input');

inputs.forEach(input => {
    input.addEventListener('mousemove', handleChange);
    input.addEventListener('change', handleChange);
});

function handleChange(event) {
    const suffix = this.dataset.sizing || '';

    document.documentElement.style.setProperty(
        `--${this.name}`,
        event.target.value + suffix
    );
}
