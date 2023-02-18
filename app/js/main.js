console.log('hi')
$(function () {

  $('.shop-content__filter-btn').on('click', function () {
    $('.shop-content__filter-btn').removeClass('shop-content__filter-btn--active')
    $(this).addClass('shop-content__filter-btn--active')
  })

  $('.button-list').on('click', function () {
    $('.product-item').addClass('product-item--list')
  })

  $('.button-grid').on('click', function () {
    $('.product-item').removeClass('product-item--list')
  })

  $('.filter-price__input').ionRangeSlider({
    type: "double",
    prefix: '$',
    onChange: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
    onStart: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    }
  })



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


  $('.select-style').styler();


  const countDownClock = (number = 100, format = 'seconds') => {

    const d = document;
    const daysElement = d.querySelector('.promo__days');
    const hoursElement = d.querySelector('.promo__hours');
    const minutesElement = d.querySelector('.promo__minutes');
    const secondsElement = d.querySelector('.promo__seconds');
    let countdown;
    convertFormat(format);


    function convertFormat(format) {
      switch (format) {
        case 'seconds':
          return timer(number);
        case 'minutes':
          return timer(number * 60);
        case 'hours':
          return timer(number * 60 * 60);
        case 'days':
          return timer(number * 60 * 60 * 24);
      }
    }

    function timer(seconds) {
      const now = Date.now();
      const then = now + seconds * 1000;

      countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        if (secondsLeft <= 0) {
          clearInterval(countdown);
          return;
        };

        displayTimeLeft(secondsLeft);

      }, 1000);
    }

    function displayTimeLeft(seconds) {
      daysElement.textContent = Math.floor(seconds / 86400);
      hoursElement.textContent = Math.floor((seconds % 86400) / 3600);
      minutesElement.textContent = Math.floor((seconds % 86400) % 3600 / 60);
      secondsElement.textContent = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
    }
  }


  /*
    start countdown
    enter number and format
    days, hours, minutes or seconds
  */
  countDownClock(20, 'days');
})


