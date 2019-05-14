const slider = document.getElementById('test-slider');
const inputFormat = document.getElementById('input-format');

noUiSlider.create(slider, {
 start: 70,
 step: 1,
 orientation: 'horizontal',
 range: {
   'min': 0,
   'max': 100
 },
 format: wNumb({
   decimals: 0
 })
});

slider.noUiSlider.on('update', function (values, handle) {
    inputFormat.value = values[handle];
});

inputFormat.addEventListener('change', function () {
    slider.noUiSlider.set(this.value);
});



var resultElement = document.getElementById('result');
var sliders = document.getElementsByClassName('sliders');
var colors = [0, 0, 0];

[].slice.call(sliders).forEach(function (slider, index) {

    noUiSlider.create(slider, {
        start: 127,
        connect: [true, false],
        orientation: "vertical",
        range: {
            'min': 0,
            'max': 255
        },
        format: wNumb({
            decimals: 0
        })
    });

    // Bind the color changing function to the update event.
    slider.noUiSlider.on('update', function () {

        colors[index] = slider.noUiSlider.get();

        var color = 'rgb(' + colors.join(',') + ')';

        resultElement.style.background = color;
        resultElement.style.color = color;
    });
});
