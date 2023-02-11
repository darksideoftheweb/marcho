console.log('hi')
$(function () {
    $('.top-slider__inner').slick({
        dots: true,
        arrows: false,
        accessibility: false,
        fade: true
    });

    $('.star').rateYo({
        starWidth: "17px",
        normalFill: '#ccccce',
        ratedFill: "#ffc35b",
        readOnly: true
    });
})


