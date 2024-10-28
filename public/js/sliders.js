document.addEventListener('DOMContentLoaded', (event) => {
    const sliders = document.querySelectorAll('.slider');
    
    sliders.forEach(slider => {
        const valueDisplay = document.getElementById(slider.id + 'Value');
        
        slider.oninput = function() {
            valueDisplay.innerHTML = this.value;
        }
    });
});