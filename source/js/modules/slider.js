var Slider = (function () {
  var items, // = $('.work-slider__item', '.work-slider__list_next'),
    index = 1,
    ndx,
    duration = 500,
    title = $('.work__title'),
    skills = $('.work__technology'),
    imgContainer = $('.work__pic');

  // var sliders = function () {
  //   let xhr = new XMLHttpRequest();
  //   xhr.open('POST', '/works/slider', true);
  //   xhr.onload = function (e) {
  //     let result = JSON.parse(xhr.responseText);
  //     return result;
  //   };
  //   xhr.send();
  // }

  function _init() {
    function sendRequest(url) {
      return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.onload = function (e) {
          let result = JSON.parse(xhr.responseText);
          resolve(result)
        };
        xhr.send();
        xhr.onerror = function (e) {
          reject()
        }
      })
    }

    sendRequest('/works/slider')
      .then(function (result) {
        items = result.workList;

        var prevContainer = $('.work-slider__list_prev'),
          nextContainer = $('.work-slider__list_next');
        // items = Array.prototype.slice.call(items);

        console.log(items);
        var activeItem = items[index];
          // imgSrc = activeItem.find('img').attr('src'),
          // activeTitle = activeItem.data('title'),
          // activeSlill = activeItem.data('technology');
        // console.log(activeItem.picture);

        items.forEach(function(item, i) {

          var li = $('<li class="work-slider__item">' +
            '<img alt="" src="' + item.picture + '" > </li>');
          console.log(li);
          prevContainer.append(li);
          nextContainer.append(li);
          console.log(prevContainer);
        });


        imgContainer.attr('src', activeItem.picture);
        title.text(activeItem.title);
        skills.text(activeItem.technology);

        var nextItem = $('.work-slider__item', '.work-slider__list_next').eq(index + 1);
        nextItem.addClass('work-slider__item_current');
        var prevItem = $('.work-slider__item', '.work-slider__list_prev').eq(index - 1);
        prevItem.addClass('work-slider__item_current');
      })
  }

  function animateSlide(ndx, container, direction) {
    var nextItems = $('.work-slider__item', container),
      currentItem = nextItems.filter('.work-slider__item_current'),
      reqItem = nextItems.eq(ndx);
    direction = direction === 'up' ? -100 : 100;

    currentItem.animate({
      'top': direction + '%'
    }, duration);

    reqItem.animate({
      'top': 0
    }, duration, function () {
      currentItem.removeClass('work-slider__item_current').css('top', -direction + '%');
      reqItem.addClass('work-slider__item_current');
    })
  }

  function _moveNext() {
    var container = $('.work-slider__list_next'),
      direction = 'up';

    if (index == items.length - 1) {
      ndx = 0;
    } else if (index < 0) {
      ndx = items.length - 1;
    } else {
      ndx = index + 1;
    }

    animateSlide(ndx, container, direction);
  }

  function _movePrev() {
    var container = $('.work-slider__list_prev'),
      direction = 'down';

    if (index > items.length - 1) {
      ndx = 0;
    } else if (index <= 0) {
      ndx = items.length - 1;
    } else {
      ndx = index - 1;
    }

    animateSlide(ndx, container, direction);
  }

  function _slideShow() {
    var fadedOut = $.Deferred(),
      loaded = $.Deferred(),
      nextSrc = items.eq(index).find('img').attr('src'),
      nextTitle = items.eq(index).data('title'),
      nextSkills = items.eq(index).data('technology');

    _moveNext();
    _movePrev();

    imgContainer.fadeOut(function () {
      title.slideUp();
      skills.fadeOut();
      fadedOut.resolve();
    });

    fadedOut.done(function () {
      title.text(nextTitle);
      skills.text(nextSkills);
      imgContainer.attr('src', nextSrc).on('load', function () {
        loaded.resolve();
      })
    });

    loaded.done(function () {
      title.slideDown();
      skills.fadeIn();
      imgContainer.fadeIn();
    });
  }

  return {
    init: _init,
    move: function () {

      $('.toggle__link').on('click', function (e) {
        e.preventDefault();

        if ($(this).hasClass('toggle__link_next')) {
          index++;
        } else if ($(this).hasClass('toggle__link_prev')) {
          index--;
        }

        if (index > items.length - 1) {
          index = 0;
        } else if (index < 0) {
          index = items.length - 1;
        }

        _slideShow();

      })
    }
  }
})
();