var Tabs = (function () {
  var tabs = $('.admin-tabs__item'),
    contents = $('.tab-content__item'),
    index = 0;

  function _init() {
    tabs[index].classList.add('admin-tabs__item_active');
    contents[index].classList.add('tab-content__item_active');
  }

  function _toggle() {
    tabs.on('click', function (e) {
      e.preventDefault();

      var that = $(this);
      $(this).addClass('admin-tabs__item_active')
        .siblings()
        .removeClass('admin-tabs__item_active')

      var ndx = $(this).index();
      contents.eq(ndx).addClass('tab-content__item_active')
        .siblings()
        .removeClass('tab-content__item_active')

    })

  }

  return {
    init: _init,
    switch: _toggle
  }
})();
var BlogMenu = (function () {
  var sidebar = document.querySelector('.sidebar');

  function _fixMenu() {
    var nav = document.querySelector('.blog-menu'),
      navCoords = sidebar.getBoundingClientRect().top;

    if (window.innerWidth >= 780) {
      if (navCoords <= -50) {
        nav.style.position = 'fixed';
        nav.style.top = '20px';
        nav.style.width = '20%';
      } else {
        nav.style.position = 'static';
        nav.style.width = 'auto';
      }
    } else {
      nav.style.position = 'absolute';
      nav.style.top = '';
      nav.style.width = 'auto';
    }

  }

  function _initActive () {
    var posts = document.querySelectorAll('.post__title'),
      postLinks = document.querySelectorAll('.blog-menu__link'),
      activeLink = document.getElementsByClassName('blog-menu__link_active');


    for (var i = 0; i < posts.length; i++) {
      var post = posts[i],
        postTop = post.getBoundingClientRect().top;

      if (postTop <= 100) {
        activeLink[0].classList.remove('blog-menu__link_active');
        postLinks[i].classList.add('blog-menu__link_active');
      }
    }
  }

  var _openMenu = function () {
    sidebar.classList.add('sidebar_open');
  };
  var _closeMenu = function () {
    sidebar.classList.remove('sidebar_open');
  };

  return {
    init: _fixMenu,
    initActive: _initActive,
    toggle: function () {
      if (!sidebar.classList.contains('sidebar_open')) {
        _openMenu();
      }
      else {
        _closeMenu();
      }
    }
  }
})();
// BLUR EFFECT
var Blur = (function () {
  var section = document.querySelector('.feedback'),
    blurWrapper = document.querySelector('.feedback-form'),
    blur = document.querySelector('.feedback-form__blur');

  return {
    set: function () {
      var imgWidth = document.querySelector('.feedback__bg').offsetWidth,
        img = document.querySelector('.feedback__bg'),
        imgCoords = img.getBoundingClientRect(),
        sectionCoords = section.getBoundingClientRect(),
        blurCoords = blurWrapper.getBoundingClientRect(),
        posLeft = -blurWrapper.offsetLeft,
        posTop = img.offsetTop - blurWrapper.offsetTop,
        blurCSS = blur.style;

      blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
      blurCSS.backgroundPosition = posLeft + 'px ' + posTop + 'px';
    }
  }
})();
var AddData = (function () {

  function fileUpload(url, data, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onload = function (e) {
      let result = JSON.parse(xhr.responseText);
      cb(result.status);
    };
    xhr.send(data);
  }

  function _prepareData(e) {
    e.preventDefault();
    let resultContainer = document.querySelector('.status');
    let formData = new FormData();
    let file = document.querySelector('#file-select').files[0];
    let name = document.querySelector('#work-title').value;
    let tech = document.querySelector('#work-tech').value;

    formData.append('photo', file, file.name);
    formData.append('name', name);
    formData.append('tech', tech);

    // resultContainer.innerHTML = 'Uploading..';
    fileUpload('/admin', formData, function (data) {
      resultContainer.innerHTML = data;
    });
  }

  return {
    init: _prepareData
  }

})();
// index flip
var Flip = (function () {
  var btn = document.querySelector('.auth-button'),
    flipper = document.querySelector('.flipper');

  var _auth = function () {
    flipper.style.transform = 'rotateY(180deg)';
    btn.style.display = 'none';
  };

  var _welcome = function () {
    flipper.style.transform = 'rotateY(0deg)';
    btn.style.display = 'block';
  };

  return {
    auth: _auth,
    welcome: _welcome
  }

})();
var Validation = (function () {
  var errorField = document.querySelector('.input-error-msg'),
    captchaError = document.querySelector('.welcome__error'),
    formContainer = document.querySelector('.form__container');

  var _init = function (form) {
    var elems = form.elements;
    return _validate(elems) ? true : false;
  };

  function _validate(inputs) {

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].tagName === 'BUTTON') continue;

      var elem = inputs[i];

      if (elem.value == '') {
        return _showError(elem)
      }

      if (elem.type === 'checkbox' || elem.type === 'radio') {

        if (elem.checked && elem.value === 'yes') {
          return true;
        }
        if (!elem.checked) {
          captchaError.style.display = 'flex';
        }
      }
    }

    return true;
  };

  function _showError(elem) {
    var text = elem.getAttribute('placeholder').toLowerCase();
    var position = elem.parentNode.offsetTop + elem.parentNode.offsetHeight;

    elem.parentNode.classList.add('input-group_error');
    errorField.style.display = 'block';
    errorField.innerText = 'Вы не ввели ' + text;

    // if (position > formContainer.offsetHeight)
    errorField.style.top = position + 'px';
  }

  function _clearError(elem) {
    elem.parentNode.classList.remove('input-group_error');
    errorField.style.display = 'none';
  }


  return {
    init: _init,
    clear: _clearError
  }
})();
function initMap () {
  var pointer = new google.maps.LatLng(55.787069, 37.478220),
    center = new google.maps.LatLng(55.786273, 37.418623);

  var styles = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#96d7c8"},{"visibility":"on"}]}];

  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  var mapSettings = {
    center: center,
    scrollwheel: false,
    zoom: 13,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    streetViewControl: false
  };

  var map = new google.maps.Map(document.getElementById('map'), mapSettings);

  var marker = new google.maps.Marker({
    icon: 'assets/img/decor/map_marker.png',
    position: pointer,
    map: map,
    title: "I'm here!",
    animation: google.maps.Animation.BOUNCE
  });

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
};

var SendData = (function () {

  //подготовка данных к отправке
  function prepareSendMail(e) {
    e.preventDefault();
    let form = e.target;
    let resultContainer = document.querySelector('.status');

    let data = {
      name: form.name.value,
      email: form.email.value,
      text: form.text.value
    };

    resultContainer.innerHTML = 'sending...';
    sendAjaxJson('/works', data, function (data) {
      resultContainer.innerHTML = data;
      resultContainer.parentNode.style.display = 'block';
    });
  }

  //подготовка данных новой статьи
  function prepareSendPost(e) {
    e.preventDefault();
    let form = e.target;
    let resultContainer = document.querySelector('.status');

    let data = {
      title: form.title.value,
      date: form.date.value,
      text: form.text.value
    };

    resultContainer.innerHTML = 'sending...';
    sendAjaxJson('/blog', data, function (data) {
      resultContainer.innerHTML = data;
      resultContainer.parentNode.style.display = 'block';
    });
  }

  //подготовка скиллов
  function prepareSkillData(e) {
    e.preventDefault();
    let form = e.target;
    let resultContainer = document.querySelector('.status');

    var inputs = form.elements;

    let data = [];

    for (var i = 0; i < inputs.length; i++) {
      var elem = inputs[i];
      if (inputs[i].tagName === 'BUTTON') continue;
      // console.log(elem.dataset.category);
      var obj = {
        category: elem.dataset.category,
        tech: [
          {
            title: elem.name,
            percent: elem.value
          }
        ]
      };

      if (!data.length) {
        data.push(obj);
      } else {
        var ndx = data.findIndex(function (item) {
          return item.category == obj.category
        });
        if (ndx >= 0) {
          data[ndx].tech = data[ndx].tech.concat(obj.tech)
        } else {
          data.push(obj);
        }
      }
    }

    console.log(data);

    sendAjaxJson('/about', data, function (data) {
      resultContainer.innerHTML = data;
      resultContainer.parentNode.style.display = 'block';
    });
  }


//отправка данных на сервер
  function sendAjaxJson(url, data, cb) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (e) {
      let result = JSON.parse(xhr.responseText);
      cb(result.status);
    };
    xhr.send(JSON.stringify(data))
  }


  return {
    mail: prepareSendMail,
    post: prepareSendPost,
    skill: prepareSkillData
  }

})
();
var Menu = (function () {
  var menu = document.querySelector('.main-navigation'),
    burgerMenu = document.querySelector('.hamburger-btn');

  return {
    toggle: function () {
      burgerMenu.classList.toggle('hamburger-btn_closed');
      menu.classList.toggle('main-navigation_disabled');

      document.body.style.overflow = (!menu.classList.contains('main-navigation_disabled')) ? 'hidden' : 'auto';
    }
  }
})();
//index paralax
var MainParalax = (function () {

  var _show = function () {

    var paralaxContainer = document.querySelector('#paralax'),
      layers = paralaxContainer.children;

    window.addEventListener('mousemove', function (e) {

      var pageX = e.pageX,
        pageY = e.pageY,
        initialX = (window.innerWidth / 2) - pageX,
        initialY = (window.innerHeight / 2) - pageY;

      [].slice.call(layers).forEach(function (layer, i) {
        var layerStyle = layer.style,
          divider = i / 40,
          bottomPosition = (window.innerHeight / 2) * divider,
          horizontalPosition = (window.innerWidth / 2) * divider,
          positionX = initialX * divider,
          positionY = initialY * divider,
          transformString = 'translate3d(' + positionX + 'px,' + positionY + 'px, 0)';

        layerStyle.transform = transformString;
        layerStyle.webkitTransform = transformString;
        layerStyle.bottom = '-' + bottomPosition + 'px';
        layerStyle.left = '-' + horizontalPosition + 'px';
        layerStyle.right = '-' + horizontalPosition + 'px';
      })

    });
  };

  var _disabled = function () {
    //для планшетов и телефонов подставить просто картинку, а не грузить весь паралакс
  };

  return {
    init: _show
  };

})();
var Preloader = (function () {
  var loader = document.querySelector('.preloader'),
    wrapper = document.querySelector('.index-wrapper'),
    images = document.querySelectorAll('img'),
    flipCard = document.querySelector('.flipper'),
    procentField = document.querySelector('.preloader__percent'),
    percent = 0,
    percentStep = 100 / (images.length + 0.4);

  function _loadImage(img) {
    return new Promise(function (resolve, reject) {
      img.onload = function () {
        percent = Math.ceil(percent + percentStep);
        procentField.innerHTML = percent + '%';
        resolve(img);
      };
      img.onerror = function () {
        reject(img);
      }
    });
  }

  function _showLoader(imgList) {
    var promiseImg = imgList.map(_loadImage);

    Promise.all(promiseImg)
      .then(function (value) {
        wrapper.style.display = 'block';

        percent = 100;
        procentField.innerHTML = percent + '%';
        setTimeout(function () {
          loader.style.opacity = '0';
          // loader.parentNode.removeChild(loader);
          loader.style.display = 'none';
        }, 1500)
      })
      .then(function () {
        setTimeout(function () {
          flipCard.style.transform = 'rotate3d(1,0,0, 0deg)';
        }, 1500)
      })
  };

function _closeLoader() {
  var imgArr = Array.prototype.slice.call(images);

  _showLoader(imgArr);
};


return {
  init: _closeLoader
}

})
();


/*
 1 - загрузить сам прелоадер
 2 - взять все картинки на странице
 3 - по мере загрузки картинок менять проценты
 4 - после загрузки всех картинок убрать прелоадер
 */
var ScrollPage = (function () {

  return {
    down: function (elem) {
      var section = elem.parentNode.nextSibling,
        posTop = section.offsetTop;

      $('body,html').animate({scrollTop: posTop}, 1500);
    },

    up: function () {
      $('body,html').animate({scrollTop: 0}, 1200);
    }
  }
})();
// ПАРАЛАКС ЭФФФЕКТ В ШАПКЕ САЙТА
var HeaderParallax = (function () {
  var bg = document.querySelector('.header__bg'),
    portfolio = document.querySelector('.header__portfolio'),
    user = document.querySelector('.header__user');

  var _move = function (block, windowScroll, strafeAmount) {
    var strafe = windowScroll / -strafeAmount + '%',
      transformString = 'translate3d(0, ' + strafe + ', 0)',
      style = block.style;

    if (windowScroll < window.innerHeight) {
      style.transform = transformString;
      style.webkitTransform = transformString;
    }
  };

  return {

    init: function (wScroll) {
      _move(bg, wScroll, 45);
      if (portfolio !== null) {
        _move(portfolio, wScroll, 20);
      };
      _move(user, wScroll, 3);
    }

  }

})();
// АНИМАЦИЯ ИКОНОК СКИЛОВ
var Skills = (function () {
  var skills = document.querySelectorAll('.skill'),
    circles = document.querySelectorAll('.circle-second'),
    windowHeight = window.innerHeight;

  // вычисляем длину окружности
  var circleLength = function (circle) {
    var circleRadius = circle.getAttribute('r'),
      circleLength = 2 * Math.PI * circleRadius;

    return circleLength;
  };

  // применяем к окружности свойства по умолчанию
  [].slice.call(circles).forEach(function (circle) {

    circle.style.strokeDashoffset = circleLength(circle);
    circle.style.strokeDasharray = circleLength(circle);

  });

  // функция анимирования окружности в зависимости от процентов
  var circleAnimation = function (skill) {

    var circleFill = skill.querySelector('.circle-second'),
      skillPercent = skill.getAttribute('data-percent'),
      length = circleLength(circleFill),
      percent = length * (100 - skillPercent) / 100;

    setTimeout(function () {
      circleFill.style.strokeDashoffset = percent;
      circleFill.style.transition = 'all 1s';

      if (skillPercent < 50) {
        skill.style.opacity = 0.4;
        skill.style.transition = 'all 1s';
      }
    }, 500);

  };

  return {
    grow: function () {

      [].slice.call(skills).forEach(function (skill) {

        var circleRect = skill.getBoundingClientRect(),
          circlePos = circleRect.bottom,
          startAnimation = circlePos - windowHeight;

        if (startAnimation <= 0) {
          circleAnimation(skill);
        }

      });
    }
  }

})();
var Slider = (function () {
  var items = $('.work-slider__item', '.work-slider__list_next'),
    index = 1,
    ndx,
    duration = 500,
    title = $('.work__title'),
    skills = $('.work__technology'),
    imgContainer = $('.work__pic');

  function _init() {
    var activeItem = items.eq(index),
      imgSrc = activeItem.find('img').attr('src'),
      activeTitle = activeItem.data('title'),
      activeSlill = activeItem.data('technology');

    imgContainer.attr('src', imgSrc);
    title.text(activeTitle);
    skills.text(activeSlill);

    var nextItem = $('.work-slider__item', '.work-slider__list_next').eq(index + 1);
    nextItem.addClass('work-slider__item_current');
    var prevItem = $('.work-slider__item', '.work-slider__list_prev').eq(index - 1);
    prevItem.addClass('work-slider__item_current');
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
var preload = document.querySelector('.preloader');

if (preload !== null) Preloader.init();

window.onload = function () {

  //MAIN PARALAX
  var paralax = document.querySelector('#paralax');

  if (paralax !== null) {
    MainParalax.init();
  }
  //
  // console.log(paralax);


  //FLIP CARD
  var authBtn = document.querySelector('.auth-button'),
    welcomeBtn = document.querySelector('.btn-return');

  if (authBtn !== null) {
    authBtn.addEventListener('click', function () {
      Flip.auth();
    });
  }

  if (welcomeBtn !== null) {
    welcomeBtn.addEventListener('click', function () {
      Flip.welcome();
    });
  }

  //BURGERMENU
  var burgerMenu = document.querySelector('.hamburger-btn');

  if (burgerMenu !== null) {
    burgerMenu.addEventListener('click', function () {
      Menu.toggle();
    });
  }


  //BLUR
  var blurForm = document.querySelector('.feedback-form__blur');

  if (blurForm !== null) {
    Blur.set();
    window.onresize = function () {
      Blur.set();
    };


  }


  var forms = document.querySelectorAll('form');

  if (forms !== null) {

    [].slice.call(forms).forEach(function (form) {

      //очистка ошибки
      var inputs = form.elements;
      var closeError = document.querySelector('.input-error-captcha__close');

      for (var i = 0; i < inputs.length; i++) {
        inputs[i].onfocus = function () {
          if (this.parentNode.classList.contains('input-group_error')) {
            Validation.clear(this);
          }
        }
      }

      if (closeError !== null) {
        closeError.onclick = function () {
          closeError.parentNode.parentNode.style.display = 'none';
        };
      }

      var mailForm = document.querySelector('#mailer');
      var newPost = document.querySelector('#new-post');
      var newWork = document.querySelector('#new-work');
      var skillForm = document.querySelector('#skills');

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var valid = Validation.init(form);

        console.log(valid);

        if (valid) {
          if (e.target == mailForm) SendData.mail(e);

          if (e.target == newPost) SendData.post(e);

          if (e.target == skillForm) SendData.skill(e);

          if (e.target == newWork) AddData.init(e);
        }
      })

    })
  }


  //SCROLL PAGE
  var scrollLinkDown = document.querySelector('.scroll-link_down');
  var scrollLinkUp = document.querySelector('.scroll-link_up');

  if (scrollLinkDown !== null) {
    scrollLinkDown.addEventListener('click', function (e) {
      e.preventDefault();

      ScrollPage.down(this);
    })
  }
  if (scrollLinkUp !== null) {
    scrollLinkUp.addEventListener('click', function (e) {
      e.preventDefault();

      ScrollPage.up(this);
    })
  }

  //SLIDER
  var slider = document.querySelector('.work__slider');

  if (slider !== null) {
    (function () {
      // Slider.init();
      Slider.init();
      Slider.move();
    })();
  }

  //HEADER PARALAX & SKILLS
  var bg = document.querySelector('.header__bg'),
    skills = document.querySelectorAll('.skill'),
    blogWrapper = document.querySelector('.blog-container');

  // ВЫЗОВ ФУНКЦИЯ ПО СКРОЛЛУ СТРАНИЦЫ
  window.onscroll = function () {

    var wScroll = window.pageYOffset;

    if (bg !== null) {
      HeaderParallax.init(wScroll);
    }

    if (skills !== null) {
      Skills.grow();
    }

    if (blogWrapper !== null) {
      if (wScroll >= window.innerHeight) BlogMenu.init();
      BlogMenu.initActive();
    }

  };

  var sideMenu = document.querySelector('.sidemenu-btn');

  if (sideMenu !== null) {
    sideMenu.onclick = function () {
      BlogMenu.toggle();
    };

    window.onresize = function () {
      BlogMenu.init();
    }
  }

  var admin = document.querySelector('.admin-tabs__item');

  if (admin) {
    Tabs.switch();
  }


};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluLXBhbmVsLmpzIiwiYmxvZy1tZW51LmpzIiwiYmx1ci5qcyIsImRhdGEtdXBsb2FkLmpzIiwiZmxpcC5qcyIsImZvcm1zLmpzIiwiZ29vZ2xlLW1hcC5qcyIsIm1haWxlci5qcyIsIm1haW4tbWVudS5qcyIsIm1haW4tcGFyYWxheC5qcyIsInByZWxvYWRlci5qcyIsInNjcm9sbC1wYWdlLmpzIiwic2Nyb2xsLXBhcmFsYXguanMiLCJza2lsbHMuanMiLCJzbGlkZXIuanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVGFicyA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciB0YWJzID0gJCgnLmFkbWluLXRhYnNfX2l0ZW0nKSxcbiAgICBjb250ZW50cyA9ICQoJy50YWItY29udGVudF9faXRlbScpLFxuICAgIGluZGV4ID0gMDtcblxuICBmdW5jdGlvbiBfaW5pdCgpIHtcbiAgICB0YWJzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdhZG1pbi10YWJzX19pdGVtX2FjdGl2ZScpO1xuICAgIGNvbnRlbnRzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCd0YWItY29udGVudF9faXRlbV9hY3RpdmUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF90b2dnbGUoKSB7XG4gICAgdGFicy5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdGhhdCA9ICQodGhpcyk7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdhZG1pbi10YWJzX19pdGVtX2FjdGl2ZScpXG4gICAgICAgIC5zaWJsaW5ncygpXG4gICAgICAgIC5yZW1vdmVDbGFzcygnYWRtaW4tdGFic19faXRlbV9hY3RpdmUnKVxuXG4gICAgICB2YXIgbmR4ID0gJCh0aGlzKS5pbmRleCgpO1xuICAgICAgY29udGVudHMuZXEobmR4KS5hZGRDbGFzcygndGFiLWNvbnRlbnRfX2l0ZW1fYWN0aXZlJylcbiAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgLnJlbW92ZUNsYXNzKCd0YWItY29udGVudF9faXRlbV9hY3RpdmUnKVxuXG4gICAgfSlcblxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBfaW5pdCxcbiAgICBzd2l0Y2g6IF90b2dnbGVcbiAgfVxufSkoKTsiLCJ2YXIgQmxvZ01lbnUgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG5cbiAgZnVuY3Rpb24gX2ZpeE1lbnUoKSB7XG4gICAgdmFyIG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLW1lbnUnKSxcbiAgICAgIG5hdkNvb3JkcyA9IHNpZGViYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc4MCkge1xuICAgICAgaWYgKG5hdkNvb3JkcyA8PSAtNTApIHtcbiAgICAgICAgbmF2LnN0eWxlLnBvc2l0aW9uID0gJ2ZpeGVkJztcbiAgICAgICAgbmF2LnN0eWxlLnRvcCA9ICcyMHB4JztcbiAgICAgICAgbmF2LnN0eWxlLndpZHRoID0gJzIwJSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuYXYuc3R5bGUucG9zaXRpb24gPSAnc3RhdGljJztcbiAgICAgICAgbmF2LnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBuYXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgbmF2LnN0eWxlLnRvcCA9ICcnO1xuICAgICAgbmF2LnN0eWxlLndpZHRoID0gJ2F1dG8nO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gX2luaXRBY3RpdmUgKCkge1xuICAgIHZhciBwb3N0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3N0X190aXRsZScpLFxuICAgICAgcG9zdExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJsb2ctbWVudV9fbGluaycpLFxuICAgICAgYWN0aXZlTGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcblxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3N0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHBvc3QgPSBwb3N0c1tpXSxcbiAgICAgICAgcG9zdFRvcCA9IHBvc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xuXG4gICAgICBpZiAocG9zdFRvcCA8PSAxMDApIHtcbiAgICAgICAgYWN0aXZlTGlua1swXS5jbGFzc0xpc3QucmVtb3ZlKCdibG9nLW1lbnVfX2xpbmtfYWN0aXZlJyk7XG4gICAgICAgIHBvc3RMaW5rc1tpXS5jbGFzc0xpc3QuYWRkKCdibG9nLW1lbnVfX2xpbmtfYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIF9vcGVuTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzaWRlYmFyLmNsYXNzTGlzdC5hZGQoJ3NpZGViYXJfb3BlbicpO1xuICB9O1xuICB2YXIgX2Nsb3NlTWVudSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzaWRlYmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpZGViYXJfb3BlbicpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgaW5pdDogX2ZpeE1lbnUsXG4gICAgaW5pdEFjdGl2ZTogX2luaXRBY3RpdmUsXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoIXNpZGViYXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaWRlYmFyX29wZW4nKSkge1xuICAgICAgICBfb3Blbk1lbnUoKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBfY2xvc2VNZW51KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59KSgpOyIsIi8vIEJMVVIgRUZGRUNUXHJcbnZhciBCbHVyID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjaycpLFxyXG4gICAgYmx1cldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2stZm9ybScpLFxyXG4gICAgYmx1ciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1mb3JtX19ibHVyJyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGltZ1dpZHRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrX19iZycpLm9mZnNldFdpZHRoLFxyXG4gICAgICAgIGltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFja19fYmcnKSxcclxuICAgICAgICBpbWdDb29yZHMgPSBpbWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgc2VjdGlvbkNvb3JkcyA9IHNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgYmx1ckNvb3JkcyA9IGJsdXJXcmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgIHBvc0xlZnQgPSAtYmx1cldyYXBwZXIub2Zmc2V0TGVmdCxcclxuICAgICAgICBwb3NUb3AgPSBpbWcub2Zmc2V0VG9wIC0gYmx1cldyYXBwZXIub2Zmc2V0VG9wLFxyXG4gICAgICAgIGJsdXJDU1MgPSBibHVyLnN0eWxlO1xyXG5cclxuICAgICAgYmx1ckNTUy5iYWNrZ3JvdW5kU2l6ZSA9IGltZ1dpZHRoICsgJ3B4JyArICcgJyArICdhdXRvJztcclxuICAgICAgYmx1ckNTUy5iYWNrZ3JvdW5kUG9zaXRpb24gPSBwb3NMZWZ0ICsgJ3B4ICcgKyBwb3NUb3AgKyAncHgnO1xyXG4gICAgfVxyXG4gIH1cclxufSkoKTsiLCJ2YXIgQWRkRGF0YSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gIGZ1bmN0aW9uIGZpbGVVcGxvYWQodXJsLCBkYXRhLCBjYikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGxldCByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICBjYihyZXN1bHQuc3RhdHVzKTtcclxuICAgIH07XHJcbiAgICB4aHIuc2VuZChkYXRhKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9wcmVwYXJlRGF0YShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xyXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICBsZXQgZmlsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWxlLXNlbGVjdCcpLmZpbGVzWzBdO1xyXG4gICAgbGV0IG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd29yay10aXRsZScpLnZhbHVlO1xyXG4gICAgbGV0IHRlY2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjd29yay10ZWNoJykudmFsdWU7XHJcblxyXG4gICAgZm9ybURhdGEuYXBwZW5kKCdwaG90bycsIGZpbGUsIGZpbGUubmFtZSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ25hbWUnLCBuYW1lKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgndGVjaCcsIHRlY2gpO1xyXG5cclxuICAgIC8vIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnVXBsb2FkaW5nLi4nO1xyXG4gICAgZmlsZVVwbG9hZCgnL2FkbWluJywgZm9ybURhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogX3ByZXBhcmVEYXRhXHJcbiAgfVxyXG5cclxufSkoKTsiLCIvLyBpbmRleCBmbGlwXHJcbnZhciBGbGlwID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF1dGgtYnV0dG9uJyksXHJcbiAgICBmbGlwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKTtcclxuXHJcbiAgdmFyIF9hdXRoID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgxODBkZWcpJztcclxuICAgIGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIH07XHJcblxyXG4gIHZhciBfd2VsY29tZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZsaXBwZXIuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMGRlZyknO1xyXG4gICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBhdXRoOiBfYXV0aCxcclxuICAgIHdlbGNvbWU6IF93ZWxjb21lXHJcbiAgfVxyXG5cclxufSkoKTsiLCJ2YXIgVmFsaWRhdGlvbiA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGVycm9yRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5wdXQtZXJyb3ItbXNnJyksXHJcbiAgICBjYXB0Y2hhRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VsY29tZV9fZXJyb3InKSxcclxuICAgIGZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fY29udGFpbmVyJyk7XHJcblxyXG4gIHZhciBfaW5pdCA9IGZ1bmN0aW9uIChmb3JtKSB7XHJcbiAgICB2YXIgZWxlbXMgPSBmb3JtLmVsZW1lbnRzO1xyXG4gICAgcmV0dXJuIF92YWxpZGF0ZShlbGVtcykgPyB0cnVlIDogZmFsc2U7XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gX3ZhbGlkYXRlKGlucHV0cykge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpbnB1dHNbaV0udGFnTmFtZSA9PT0gJ0JVVFRPTicpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgdmFyIGVsZW0gPSBpbnB1dHNbaV07XHJcblxyXG4gICAgICBpZiAoZWxlbS52YWx1ZSA9PSAnJykge1xyXG4gICAgICAgIHJldHVybiBfc2hvd0Vycm9yKGVsZW0pXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlbGVtLnR5cGUgPT09ICdjaGVja2JveCcgfHwgZWxlbS50eXBlID09PSAncmFkaW8nKSB7XHJcblxyXG4gICAgICAgIGlmIChlbGVtLmNoZWNrZWQgJiYgZWxlbS52YWx1ZSA9PT0gJ3llcycpIHtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWVsZW0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgY2FwdGNoYUVycm9yLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfTtcclxuXHJcbiAgZnVuY3Rpb24gX3Nob3dFcnJvcihlbGVtKSB7XHJcbiAgICB2YXIgdGV4dCA9IGVsZW0uZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICB2YXIgcG9zaXRpb24gPSBlbGVtLnBhcmVudE5vZGUub2Zmc2V0VG9wICsgZWxlbS5wYXJlbnROb2RlLm9mZnNldEhlaWdodDtcclxuXHJcbiAgICBlbGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQtZ3JvdXBfZXJyb3InKTtcclxuICAgIGVycm9yRmllbGQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBlcnJvckZpZWxkLmlubmVyVGV4dCA9ICfQktGLINC90LUg0LLQstC10LvQuCAnICsgdGV4dDtcclxuXHJcbiAgICAvLyBpZiAocG9zaXRpb24gPiBmb3JtQ29udGFpbmVyLm9mZnNldEhlaWdodClcclxuICAgIGVycm9yRmllbGQuc3R5bGUudG9wID0gcG9zaXRpb24gKyAncHgnO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX2NsZWFyRXJyb3IoZWxlbSkge1xyXG4gICAgZWxlbS5wYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2lucHV0LWdyb3VwX2Vycm9yJyk7XHJcbiAgICBlcnJvckZpZWxkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfVxyXG5cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IF9pbml0LFxyXG4gICAgY2xlYXI6IF9jbGVhckVycm9yXHJcbiAgfVxyXG59KSgpOyIsImZ1bmN0aW9uIGluaXRNYXAgKCkge1xyXG4gIHZhciBwb2ludGVyID0gbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1NS43ODcwNjksIDM3LjQ3ODIyMCksXHJcbiAgICBjZW50ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU1Ljc4NjI3MywgMzcuNDE4NjIzKTtcclxuXHJcbiAgdmFyIHN0eWxlcyA9IFt7XCJmZWF0dXJlVHlwZVwiOlwiYWRtaW5pc3RyYXRpdmVcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMudGV4dC5maWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjNDQ0NDQ0XCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcImxhbmRzY2FwZVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiI2YyZjJmMlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJwb2lcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1widmlzaWJpbGl0eVwiOlwib25cIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJzYXR1cmF0aW9uXCI6LTEwMH0se1wibGlnaHRuZXNzXCI6NDV9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuaGlnaHdheVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJzaW1wbGlmaWVkXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInJvYWQuYXJ0ZXJpYWxcIixcImVsZW1lbnRUeXBlXCI6XCJsYWJlbHMuaWNvblwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwidHJhbnNpdFwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvZmZcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwid2F0ZXJcIixcImVsZW1lbnRUeXBlXCI6XCJhbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM5NmQ3YzhcIn0se1widmlzaWJpbGl0eVwiOlwib25cIn1dfV07XHJcblxyXG4gIHZhciBzdHlsZWRNYXAgPSBuZXcgZ29vZ2xlLm1hcHMuU3R5bGVkTWFwVHlwZShzdHlsZXMsXHJcbiAgICB7bmFtZTogXCJTdHlsZWQgTWFwXCJ9KTtcclxuXHJcbiAgdmFyIG1hcFNldHRpbmdzID0ge1xyXG4gICAgY2VudGVyOiBjZW50ZXIsXHJcbiAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICB6b29tOiAxMyxcclxuICAgIG1hcFR5cGVDb250cm9sT3B0aW9uczoge1xyXG4gICAgICBtYXBUeXBlSWRzOiBbZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlJPQURNQVAsICdtYXBfc3R5bGUnXVxyXG4gICAgfSxcclxuICAgIHpvb21Db250cm9sOiB0cnVlLFxyXG4gICAgem9vbUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgIHBvc2l0aW9uOiBnb29nbGUubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFRfVE9QXHJcbiAgICB9LFxyXG4gICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlXHJcbiAgfTtcclxuXHJcbiAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpLCBtYXBTZXR0aW5ncyk7XHJcblxyXG4gIHZhciBtYXJrZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTWFya2VyKHtcclxuICAgIGljb246ICdhc3NldHMvaW1nL2RlY29yL21hcF9tYXJrZXIucG5nJyxcclxuICAgIHBvc2l0aW9uOiBwb2ludGVyLFxyXG4gICAgbWFwOiBtYXAsXHJcbiAgICB0aXRsZTogXCJJJ20gaGVyZSFcIixcclxuICAgIGFuaW1hdGlvbjogZ29vZ2xlLm1hcHMuQW5pbWF0aW9uLkJPVU5DRVxyXG4gIH0pO1xyXG5cclxuICBtYXAubWFwVHlwZXMuc2V0KCdtYXBfc3R5bGUnLCBzdHlsZWRNYXApO1xyXG4gIG1hcC5zZXRNYXBUeXBlSWQoJ21hcF9zdHlsZScpO1xyXG59O1xyXG4iLCJ2YXIgU2VuZERhdGEgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICAvL9C/0L7QtNCz0L7RgtC+0LLQutCwINC00LDQvdC90YvRhSDQuiDQvtGC0L/RgNCw0LLQutC1XHJcbiAgZnVuY3Rpb24gcHJlcGFyZVNlbmRNYWlsKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCBmb3JtID0gZS50YXJnZXQ7XHJcbiAgICBsZXQgcmVzdWx0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXR1cycpO1xyXG5cclxuICAgIGxldCBkYXRhID0ge1xyXG4gICAgICBuYW1lOiBmb3JtLm5hbWUudmFsdWUsXHJcbiAgICAgIGVtYWlsOiBmb3JtLmVtYWlsLnZhbHVlLFxyXG4gICAgICB0ZXh0OiBmb3JtLnRleHQudmFsdWVcclxuICAgIH07XHJcblxyXG4gICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdzZW5kaW5nLi4uJztcclxuICAgIHNlbmRBamF4SnNvbignL3dvcmtzJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICAgIHJlc3VsdENvbnRhaW5lci5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvL9C/0L7QtNCz0L7RgtC+0LLQutCwINC00LDQvdC90YvRhSDQvdC+0LLQvtC5INGB0YLQsNGC0YzQuFxyXG4gIGZ1bmN0aW9uIHByZXBhcmVTZW5kUG9zdChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgZm9ybSA9IGUudGFyZ2V0O1xyXG4gICAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcclxuXHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgdGl0bGU6IGZvcm0udGl0bGUudmFsdWUsXHJcbiAgICAgIGRhdGU6IGZvcm0uZGF0ZS52YWx1ZSxcclxuICAgICAgdGV4dDogZm9ybS50ZXh0LnZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnc2VuZGluZy4uLic7XHJcbiAgICBzZW5kQWpheEpzb24oJy9ibG9nJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICAgIHJlc3VsdENvbnRhaW5lci5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvL9C/0L7QtNCz0L7RgtC+0LLQutCwINGB0LrQuNC70LvQvtCyXHJcbiAgZnVuY3Rpb24gcHJlcGFyZVNraWxsRGF0YShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgZm9ybSA9IGUudGFyZ2V0O1xyXG4gICAgbGV0IHJlc3VsdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMnKTtcclxuXHJcbiAgICB2YXIgaW5wdXRzID0gZm9ybS5lbGVtZW50cztcclxuXHJcbiAgICBsZXQgZGF0YSA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBlbGVtID0gaW5wdXRzW2ldO1xyXG4gICAgICBpZiAoaW5wdXRzW2ldLnRhZ05hbWUgPT09ICdCVVRUT04nKSBjb250aW51ZTtcclxuICAgICAgLy8gY29uc29sZS5sb2coZWxlbS5kYXRhc2V0LmNhdGVnb3J5KTtcclxuICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICBjYXRlZ29yeTogZWxlbS5kYXRhc2V0LmNhdGVnb3J5LFxyXG4gICAgICAgIHRlY2g6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IGVsZW0ubmFtZSxcclxuICAgICAgICAgICAgcGVyY2VudDogZWxlbS52YWx1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICghZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBkYXRhLnB1c2gob2JqKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbmR4ID0gZGF0YS5maW5kSW5kZXgoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgIHJldHVybiBpdGVtLmNhdGVnb3J5ID09IG9iai5jYXRlZ29yeVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChuZHggPj0gMCkge1xyXG4gICAgICAgICAgZGF0YVtuZHhdLnRlY2ggPSBkYXRhW25keF0udGVjaC5jb25jYXQob2JqLnRlY2gpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRhdGEucHVzaChvYmopO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgIHNlbmRBamF4SnNvbignL2Fib3V0JywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICAgIHJlc3VsdENvbnRhaW5lci5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbi8v0L7RgtC/0YDQsNCy0LrQsCDQtNCw0L3QvdGL0YUg0L3QsCDRgdC10YDQstC10YBcclxuICBmdW5jdGlvbiBzZW5kQWpheEpzb24odXJsLCBkYXRhLCBjYikge1xyXG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xyXG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKVxyXG4gIH1cclxuXHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBtYWlsOiBwcmVwYXJlU2VuZE1haWwsXHJcbiAgICBwb3N0OiBwcmVwYXJlU2VuZFBvc3QsXHJcbiAgICBza2lsbDogcHJlcGFyZVNraWxsRGF0YVxyXG4gIH1cclxuXHJcbn0pXHJcbigpOyIsInZhciBNZW51ID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLW5hdmlnYXRpb24nKSxcclxuICAgIGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyLWJ0bicpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGJ1cmdlck1lbnUuY2xhc3NMaXN0LnRvZ2dsZSgnaGFtYnVyZ2VyLWJ0bl9jbG9zZWQnKTtcclxuICAgICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdtYWluLW5hdmlnYXRpb25fZGlzYWJsZWQnKTtcclxuXHJcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAoIW1lbnUuY2xhc3NMaXN0LmNvbnRhaW5zKCdtYWluLW5hdmlnYXRpb25fZGlzYWJsZWQnKSkgPyAnaGlkZGVuJyA6ICdhdXRvJztcclxuICAgIH1cclxuICB9XHJcbn0pKCk7IiwiLy9pbmRleCBwYXJhbGF4XHJcbnZhciBNYWluUGFyYWxheCA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gIHZhciBfc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgcGFyYWxheENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwYXJhbGF4JyksXHJcbiAgICAgIGxheWVycyA9IHBhcmFsYXhDb250YWluZXIuY2hpbGRyZW47XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICB2YXIgcGFnZVggPSBlLnBhZ2VYLFxyXG4gICAgICAgIHBhZ2VZID0gZS5wYWdlWSxcclxuICAgICAgICBpbml0aWFsWCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpIC0gcGFnZVgsXHJcbiAgICAgICAgaW5pdGlhbFkgPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBwYWdlWTtcclxuXHJcbiAgICAgIFtdLnNsaWNlLmNhbGwobGF5ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChsYXllciwgaSkge1xyXG4gICAgICAgIHZhciBsYXllclN0eWxlID0gbGF5ZXIuc3R5bGUsXHJcbiAgICAgICAgICBkaXZpZGVyID0gaSAvIDQwLFxyXG4gICAgICAgICAgYm90dG9tUG9zaXRpb24gPSAod2luZG93LmlubmVySGVpZ2h0IC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgaG9yaXpvbnRhbFBvc2l0aW9uID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgcG9zaXRpb25YID0gaW5pdGlhbFggKiBkaXZpZGVyLFxyXG4gICAgICAgICAgcG9zaXRpb25ZID0gaW5pdGlhbFkgKiBkaXZpZGVyLFxyXG4gICAgICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKCcgKyBwb3NpdGlvblggKyAncHgsJyArIHBvc2l0aW9uWSArICdweCwgMCknO1xyXG5cclxuICAgICAgICBsYXllclN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICBsYXllclN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICBsYXllclN0eWxlLmJvdHRvbSA9ICctJyArIGJvdHRvbVBvc2l0aW9uICsgJ3B4JztcclxuICAgICAgICBsYXllclN0eWxlLmxlZnQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgIGxheWVyU3R5bGUucmlnaHQgPSAnLScgKyBob3Jpem9udGFsUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICB9KVxyXG5cclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIHZhciBfZGlzYWJsZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvL9C00LvRjyDQv9C70LDQvdGI0LXRgtC+0LIg0Lgg0YLQtdC70LXRhNC+0L3QvtCyINC/0L7QtNGB0YLQsNCy0LjRgtGMINC/0YDQvtGB0YLQviDQutCw0YDRgtC40L3QutGDLCDQsCDQvdC1INCz0YDRg9C30LjRgtGMINCy0LXRgdGMINC/0LDRgNCw0LvQsNC60YFcclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogX3Nob3dcclxuICB9O1xyXG5cclxufSkoKTsiLCJ2YXIgUHJlbG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVsb2FkZXInKSxcbiAgICB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmluZGV4LXdyYXBwZXInKSxcbiAgICBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKSxcbiAgICBmbGlwQ2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGlwcGVyJyksXG4gICAgcHJvY2VudEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcl9fcGVyY2VudCcpLFxuICAgIHBlcmNlbnQgPSAwLFxuICAgIHBlcmNlbnRTdGVwID0gMTAwIC8gKGltYWdlcy5sZW5ndGggKyAwLjQpO1xuXG4gIGZ1bmN0aW9uIF9sb2FkSW1hZ2UoaW1nKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlcmNlbnQgPSBNYXRoLmNlaWwocGVyY2VudCArIHBlcmNlbnRTdGVwKTtcbiAgICAgICAgcHJvY2VudEZpZWxkLmlubmVySFRNTCA9IHBlcmNlbnQgKyAnJSc7XG4gICAgICAgIHJlc29sdmUoaW1nKTtcbiAgICAgIH07XG4gICAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmVqZWN0KGltZyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBfc2hvd0xvYWRlcihpbWdMaXN0KSB7XG4gICAgdmFyIHByb21pc2VJbWcgPSBpbWdMaXN0Lm1hcChfbG9hZEltYWdlKTtcblxuICAgIFByb21pc2UuYWxsKHByb21pc2VJbWcpXG4gICAgICAudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgd3JhcHBlci5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICBwZXJjZW50ID0gMTAwO1xuICAgICAgICBwcm9jZW50RmllbGQuaW5uZXJIVE1MID0gcGVyY2VudCArICclJztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbG9hZGVyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XG4gICAgICAgICAgLy8gbG9hZGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobG9hZGVyKTtcbiAgICAgICAgICBsb2FkZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfSwgMTUwMClcbiAgICAgIH0pXG4gICAgICAudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZsaXBDYXJkLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUzZCgxLDAsMCwgMGRlZyknO1xuICAgICAgICB9LCAxNTAwKVxuICAgICAgfSlcbiAgfTtcblxuZnVuY3Rpb24gX2Nsb3NlTG9hZGVyKCkge1xuICB2YXIgaW1nQXJyID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoaW1hZ2VzKTtcblxuICBfc2hvd0xvYWRlcihpbWdBcnIpO1xufTtcblxuXG5yZXR1cm4ge1xuICBpbml0OiBfY2xvc2VMb2FkZXJcbn1cblxufSlcbigpO1xuXG5cbi8qXG4gMSAtINC30LDQs9GA0YPQt9C40YLRjCDRgdCw0Lwg0L/RgNC10LvQvtCw0LTQtdGAXG4gMiAtINCy0LfRj9GC0Ywg0LLRgdC1INC60LDRgNGC0LjQvdC60Lgg0L3QsCDRgdGC0YDQsNC90LjRhtC1XG4gMyAtINC/0L4g0LzQtdGA0LUg0LfQsNCz0YDRg9C30LrQuCDQutCw0YDRgtC40L3QvtC6INC80LXQvdGP0YLRjCDQv9GA0L7RhtC10L3RgtGLXG4gNCAtINC/0L7RgdC70LUg0LfQsNCz0YDRg9C30LrQuCDQstGB0LXRhSDQutCw0YDRgtC40L3QvtC6INGD0LHRgNCw0YLRjCDQv9GA0LXQu9C+0LDQtNC10YBcbiAqLyIsInZhciBTY3JvbGxQYWdlID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGRvd246IGZ1bmN0aW9uIChlbGVtKSB7XHJcbiAgICAgIHZhciBzZWN0aW9uID0gZWxlbS5wYXJlbnROb2RlLm5leHRTaWJsaW5nLFxyXG4gICAgICAgIHBvc1RvcCA9IHNlY3Rpb24ub2Zmc2V0VG9wO1xyXG5cclxuICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBwb3NUb3B9LCAxNTAwKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJCgnYm9keSxodG1sJykuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwgMTIwMCk7XHJcbiAgICB9XHJcbiAgfVxyXG59KSgpOyIsIi8vINCf0JDQoNCQ0JvQkNCa0KEg0K3QpNCk0KTQldCa0KIg0JIg0KjQkNCf0JrQlSDQodCQ0JnQotCQXHJcbnZhciBIZWFkZXJQYXJhbGxheCA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fYmcnKSxcclxuICAgIHBvcnRmb2xpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3BvcnRmb2xpbycpLFxyXG4gICAgdXNlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX3VzZXInKTtcclxuXHJcbiAgdmFyIF9tb3ZlID0gZnVuY3Rpb24gKGJsb2NrLCB3aW5kb3dTY3JvbGwsIHN0cmFmZUFtb3VudCkge1xyXG4gICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJScsXHJcbiAgICAgIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCAnICsgc3RyYWZlICsgJywgMCknLFxyXG4gICAgICBzdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG5cclxuICAgIGlmICh3aW5kb3dTY3JvbGwgPCB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcclxuICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuXHJcbiAgICBpbml0OiBmdW5jdGlvbiAod1Njcm9sbCkge1xyXG4gICAgICBfbW92ZShiZywgd1Njcm9sbCwgNDUpO1xyXG4gICAgICBpZiAocG9ydGZvbGlvICE9PSBudWxsKSB7XHJcbiAgICAgICAgX21vdmUocG9ydGZvbGlvLCB3U2Nyb2xsLCAyMCk7XHJcbiAgICAgIH07XHJcbiAgICAgIF9tb3ZlKHVzZXIsIHdTY3JvbGwsIDMpO1xyXG4gICAgfVxyXG5cclxuICB9XHJcblxyXG59KSgpOyIsIi8vINCQ0J3QmNCc0JDQptCY0K8g0JjQmtCe0J3QntCaINCh0JrQmNCb0J7QklxyXG52YXIgU2tpbGxzID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsJyksXHJcbiAgICBjaXJjbGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNpcmNsZS1zZWNvbmQnKSxcclxuICAgIHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgLy8g0LLRi9GH0LjRgdC70Y/QtdC8INC00LvQuNC90YMg0L7QutGA0YPQttC90L7RgdGC0LhcclxuICB2YXIgY2lyY2xlTGVuZ3RoID0gZnVuY3Rpb24gKGNpcmNsZSkge1xyXG4gICAgdmFyIGNpcmNsZVJhZGl1cyA9IGNpcmNsZS5nZXRBdHRyaWJ1dGUoJ3InKSxcclxuICAgICAgY2lyY2xlTGVuZ3RoID0gMiAqIE1hdGguUEkgKiBjaXJjbGVSYWRpdXM7XHJcblxyXG4gICAgcmV0dXJuIGNpcmNsZUxlbmd0aDtcclxuICB9O1xyXG5cclxuICAvLyDQv9GA0LjQvNC10L3Rj9C10Lwg0Log0L7QutGA0YPQttC90L7RgdGC0Lgg0YHQstC+0LnRgdGC0LLQsCDQv9C+INGD0LzQvtC70YfQsNC90LjRjlxyXG4gIFtdLnNsaWNlLmNhbGwoY2lyY2xlcykuZm9yRWFjaChmdW5jdGlvbiAoY2lyY2xlKSB7XHJcblxyXG4gICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcclxuICAgIGNpcmNsZS5zdHlsZS5zdHJva2VEYXNoYXJyYXkgPSBjaXJjbGVMZW5ndGgoY2lyY2xlKTtcclxuXHJcbiAgfSk7XHJcblxyXG4gIC8vINGE0YPQvdC60YbQuNGPINCw0L3QuNC80LjRgNC+0LLQsNC90LjRjyDQvtC60YDRg9C20L3QvtGB0YLQuCDQsiDQt9Cw0LLQuNGB0LjQvNC+0YHRgtC4INC+0YIg0L/RgNC+0YbQtdC90YLQvtCyXHJcbiAgdmFyIGNpcmNsZUFuaW1hdGlvbiA9IGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgIHZhciBjaXJjbGVGaWxsID0gc2tpbGwucXVlcnlTZWxlY3RvcignLmNpcmNsZS1zZWNvbmQnKSxcclxuICAgICAgc2tpbGxQZXJjZW50ID0gc2tpbGwuZ2V0QXR0cmlidXRlKCdkYXRhLXBlcmNlbnQnKSxcclxuICAgICAgbGVuZ3RoID0gY2lyY2xlTGVuZ3RoKGNpcmNsZUZpbGwpLFxyXG4gICAgICBwZXJjZW50ID0gbGVuZ3RoICogKDEwMCAtIHNraWxsUGVyY2VudCkgLyAxMDA7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNpcmNsZUZpbGwuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IHBlcmNlbnQ7XHJcbiAgICAgIGNpcmNsZUZpbGwuc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMnO1xyXG5cclxuICAgICAgaWYgKHNraWxsUGVyY2VudCA8IDUwKSB7XHJcbiAgICAgICAgc2tpbGwuc3R5bGUub3BhY2l0eSA9IDAuNDtcclxuICAgICAgICBza2lsbC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyc7XHJcbiAgICAgIH1cclxuICAgIH0sIDUwMCk7XHJcblxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBncm93OiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICBbXS5zbGljZS5jYWxsKHNraWxscykuZm9yRWFjaChmdW5jdGlvbiAoc2tpbGwpIHtcclxuXHJcbiAgICAgICAgdmFyIGNpcmNsZVJlY3QgPSBza2lsbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgIGNpcmNsZVBvcyA9IGNpcmNsZVJlY3QuYm90dG9tLFxyXG4gICAgICAgICAgc3RhcnRBbmltYXRpb24gPSBjaXJjbGVQb3MgLSB3aW5kb3dIZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChzdGFydEFuaW1hdGlvbiA8PSAwKSB7XHJcbiAgICAgICAgICBjaXJjbGVBbmltYXRpb24oc2tpbGwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0pKCk7IiwidmFyIFNsaWRlciA9IChmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGl0ZW1zID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JyksXHJcbiAgICBpbmRleCA9IDEsXHJcbiAgICBuZHgsXHJcbiAgICBkdXJhdGlvbiA9IDUwMCxcclxuICAgIHRpdGxlID0gJCgnLndvcmtfX3RpdGxlJyksXHJcbiAgICBza2lsbHMgPSAkKCcud29ya19fdGVjaG5vbG9neScpLFxyXG4gICAgaW1nQ29udGFpbmVyID0gJCgnLndvcmtfX3BpYycpO1xyXG5cclxuICBmdW5jdGlvbiBfaW5pdCgpIHtcclxuICAgIHZhciBhY3RpdmVJdGVtID0gaXRlbXMuZXEoaW5kZXgpLFxyXG4gICAgICBpbWdTcmMgPSBhY3RpdmVJdGVtLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxyXG4gICAgICBhY3RpdmVUaXRsZSA9IGFjdGl2ZUl0ZW0uZGF0YSgndGl0bGUnKSxcclxuICAgICAgYWN0aXZlU2xpbGwgPSBhY3RpdmVJdGVtLmRhdGEoJ3RlY2hub2xvZ3knKTtcclxuXHJcbiAgICBpbWdDb250YWluZXIuYXR0cignc3JjJywgaW1nU3JjKTtcclxuICAgIHRpdGxlLnRleHQoYWN0aXZlVGl0bGUpO1xyXG4gICAgc2tpbGxzLnRleHQoYWN0aXZlU2xpbGwpO1xyXG5cclxuICAgIHZhciBuZXh0SXRlbSA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsICcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLmVxKGluZGV4ICsgMSk7XHJcbiAgICBuZXh0SXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgdmFyIHByZXZJdGVtID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9wcmV2JykuZXEoaW5kZXggLSAxKTtcclxuICAgIHByZXZJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbmltYXRlU2xpZGUobmR4LCBjb250YWluZXIsIGRpcmVjdGlvbikge1xyXG4gICAgdmFyIG5leHRJdGVtcyA9ICQoJy53b3JrLXNsaWRlcl9faXRlbScsIGNvbnRhaW5lciksXHJcbiAgICAgIGN1cnJlbnRJdGVtID0gbmV4dEl0ZW1zLmZpbHRlcignLndvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKSxcclxuICAgICAgcmVxSXRlbSA9IG5leHRJdGVtcy5lcShuZHgpO1xyXG4gICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uID09PSAndXAnID8gLTEwMCA6IDEwMDtcclxuXHJcbiAgICBjdXJyZW50SXRlbS5hbmltYXRlKHtcclxuICAgICAgJ3RvcCc6IGRpcmVjdGlvbiArICclJ1xyXG4gICAgfSwgZHVyYXRpb24pO1xyXG5cclxuICAgIHJlcUl0ZW0uYW5pbWF0ZSh7XHJcbiAgICAgICd0b3AnOiAwXHJcbiAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICBjdXJyZW50SXRlbS5yZW1vdmVDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpLmNzcygndG9wJywgLWRpcmVjdGlvbiArICclJyk7XHJcbiAgICAgIHJlcUl0ZW0uYWRkQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBfbW92ZU5leHQoKSB7XHJcbiAgICB2YXIgY29udGFpbmVyID0gJCgnLndvcmstc2xpZGVyX19saXN0X25leHQnKSxcclxuICAgICAgZGlyZWN0aW9uID0gJ3VwJztcclxuXHJcbiAgICBpZiAoaW5kZXggPT0gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBuZHggPSAwO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA8IDApIHtcclxuICAgICAgbmR4ID0gaXRlbXMubGVuZ3RoIC0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG5keCA9IGluZGV4ICsgMTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU2xpZGUobmR4LCBjb250YWluZXIsIGRpcmVjdGlvbik7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBfbW92ZVByZXYoKSB7XHJcbiAgICB2YXIgY29udGFpbmVyID0gJCgnLndvcmstc2xpZGVyX19saXN0X3ByZXYnKSxcclxuICAgICAgZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG5cclxuICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgbmR4ID0gMDtcclxuICAgIH0gZWxzZSBpZiAoaW5kZXggPD0gMCkge1xyXG4gICAgICBuZHggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmR4ID0gaW5kZXggLSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9zbGlkZVNob3coKSB7XHJcbiAgICB2YXIgZmFkZWRPdXQgPSAkLkRlZmVycmVkKCksXHJcbiAgICAgIGxvYWRlZCA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgbmV4dFNyYyA9IGl0ZW1zLmVxKGluZGV4KS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKSxcclxuICAgICAgbmV4dFRpdGxlID0gaXRlbXMuZXEoaW5kZXgpLmRhdGEoJ3RpdGxlJyksXHJcbiAgICAgIG5leHRTa2lsbHMgPSBpdGVtcy5lcShpbmRleCkuZGF0YSgndGVjaG5vbG9neScpO1xyXG5cclxuICAgIF9tb3ZlTmV4dCgpO1xyXG4gICAgX21vdmVQcmV2KCk7XHJcblxyXG4gICAgaW1nQ29udGFpbmVyLmZhZGVPdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aXRsZS5zbGlkZVVwKCk7XHJcbiAgICAgIHNraWxscy5mYWRlT3V0KCk7XHJcbiAgICAgIGZhZGVkT3V0LnJlc29sdmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZhZGVkT3V0LmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aXRsZS50ZXh0KG5leHRUaXRsZSk7XHJcbiAgICAgIHNraWxscy50ZXh0KG5leHRTa2lsbHMpO1xyXG4gICAgICBpbWdDb250YWluZXIuYXR0cignc3JjJywgbmV4dFNyYykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbG9hZGVkLnJlc29sdmUoKTtcclxuICAgICAgfSlcclxuICAgIH0pO1xyXG5cclxuICAgIGxvYWRlZC5kb25lKGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGl0bGUuc2xpZGVEb3duKCk7XHJcbiAgICAgIHNraWxscy5mYWRlSW4oKTtcclxuICAgICAgaW1nQ29udGFpbmVyLmZhZGVJbigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogX2luaXQsXHJcbiAgICBtb3ZlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAkKCcudG9nZ2xlX19saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGVfX2xpbmtfbmV4dCcpKSB7XHJcbiAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoJCh0aGlzKS5oYXNDbGFzcygndG9nZ2xlX19saW5rX3ByZXYnKSkge1xyXG4gICAgICAgICAgaW5kZXgtLTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpbmRleCA+IGl0ZW1zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgaW5kZXggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX3NsaWRlU2hvdygpO1xyXG5cclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcbn0pXHJcbigpOyIsInZhciBwcmVsb2FkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcicpO1xyXG5cclxuaWYgKHByZWxvYWQgIT09IG51bGwpIFByZWxvYWRlci5pbml0KCk7XHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAvL01BSU4gUEFSQUxBWFxyXG4gIHZhciBwYXJhbGF4ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsYXgnKTtcclxuXHJcbiAgaWYgKHBhcmFsYXggIT09IG51bGwpIHtcclxuICAgIE1haW5QYXJhbGF4LmluaXQoKTtcclxuICB9XHJcbiAgLy9cclxuICAvLyBjb25zb2xlLmxvZyhwYXJhbGF4KTtcclxuXHJcblxyXG4gIC8vRkxJUCBDQVJEXHJcbiAgdmFyIGF1dGhCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICAgIHdlbGNvbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXJldHVybicpO1xyXG5cclxuICBpZiAoYXV0aEJ0biAhPT0gbnVsbCkge1xyXG4gICAgYXV0aEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgRmxpcC5hdXRoKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGlmICh3ZWxjb21lQnRuICE9PSBudWxsKSB7XHJcbiAgICB3ZWxjb21lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBGbGlwLndlbGNvbWUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy9CVVJHRVJNRU5VXHJcbiAgdmFyIGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGFtYnVyZ2VyLWJ0bicpO1xyXG5cclxuICBpZiAoYnVyZ2VyTWVudSAhPT0gbnVsbCkge1xyXG4gICAgYnVyZ2VyTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgTWVudS50b2dnbGUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcblxyXG4gIC8vQkxVUlxyXG4gIHZhciBibHVyRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1mb3JtX19ibHVyJyk7XHJcblxyXG4gIGlmIChibHVyRm9ybSAhPT0gbnVsbCkge1xyXG4gICAgQmx1ci5zZXQoKTtcclxuICAgIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgQmx1ci5zZXQoKTtcclxuICAgIH07XHJcblxyXG5cclxuICB9XHJcblxyXG5cclxuICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdmb3JtJyk7XHJcblxyXG4gIGlmIChmb3JtcyAhPT0gbnVsbCkge1xyXG5cclxuICAgIFtdLnNsaWNlLmNhbGwoZm9ybXMpLmZvckVhY2goZnVuY3Rpb24gKGZvcm0pIHtcclxuXHJcbiAgICAgIC8v0L7Rh9C40YHRgtC60LAg0L7RiNC40LHQutC4XHJcbiAgICAgIHZhciBpbnB1dHMgPSBmb3JtLmVsZW1lbnRzO1xyXG4gICAgICB2YXIgY2xvc2VFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1lcnJvci1jYXB0Y2hhX19jbG9zZScpO1xyXG5cclxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbnB1dHNbaV0ub25mb2N1cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGlmICh0aGlzLnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdpbnB1dC1ncm91cF9lcnJvcicpKSB7XHJcbiAgICAgICAgICAgIFZhbGlkYXRpb24uY2xlYXIodGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2xvc2VFcnJvciAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNsb3NlRXJyb3Iub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGNsb3NlRXJyb3IucGFyZW50Tm9kZS5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdmFyIG1haWxGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haWxlcicpO1xyXG4gICAgICB2YXIgbmV3UG9zdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcG9zdCcpO1xyXG4gICAgICB2YXIgbmV3V29yayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctd29yaycpO1xyXG4gICAgICB2YXIgc2tpbGxGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NraWxscycpO1xyXG5cclxuICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIHZhbGlkID0gVmFsaWRhdGlvbi5pbml0KGZvcm0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh2YWxpZCk7XHJcblxyXG4gICAgICAgIGlmICh2YWxpZCkge1xyXG4gICAgICAgICAgaWYgKGUudGFyZ2V0ID09IG1haWxGb3JtKSBTZW5kRGF0YS5tYWlsKGUpO1xyXG5cclxuICAgICAgICAgIGlmIChlLnRhcmdldCA9PSBuZXdQb3N0KSBTZW5kRGF0YS5wb3N0KGUpO1xyXG5cclxuICAgICAgICAgIGlmIChlLnRhcmdldCA9PSBza2lsbEZvcm0pIFNlbmREYXRhLnNraWxsKGUpO1xyXG5cclxuICAgICAgICAgIGlmIChlLnRhcmdldCA9PSBuZXdXb3JrKSBBZGREYXRhLmluaXQoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgIH0pXHJcbiAgfVxyXG5cclxuXHJcbiAgLy9TQ1JPTEwgUEFHRVxyXG4gIHZhciBzY3JvbGxMaW5rRG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtbGlua19kb3duJyk7XHJcbiAgdmFyIHNjcm9sbExpbmtVcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY3JvbGwtbGlua191cCcpO1xyXG5cclxuICBpZiAoc2Nyb2xsTGlua0Rvd24gIT09IG51bGwpIHtcclxuICAgIHNjcm9sbExpbmtEb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgU2Nyb2xsUGFnZS5kb3duKHRoaXMpO1xyXG4gICAgfSlcclxuICB9XHJcbiAgaWYgKHNjcm9sbExpbmtVcCAhPT0gbnVsbCkge1xyXG4gICAgc2Nyb2xsTGlua1VwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgU2Nyb2xsUGFnZS51cCh0aGlzKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICAvL1NMSURFUlxyXG4gIHZhciBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29ya19fc2xpZGVyJyk7XHJcblxyXG4gIGlmIChzbGlkZXIgIT09IG51bGwpIHtcclxuICAgIChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vIFNsaWRlci5pbml0KCk7XHJcbiAgICAgIFNsaWRlci5pbml0KCk7XHJcbiAgICAgIFNsaWRlci5tb3ZlKCk7XHJcbiAgICB9KSgpO1xyXG4gIH1cclxuXHJcbiAgLy9IRUFERVIgUEFSQUxBWCAmIFNLSUxMU1xyXG4gIHZhciBiZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfX2JnJyksXHJcbiAgICBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2tpbGwnKSxcclxuICAgIGJsb2dXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctY29udGFpbmVyJyk7XHJcblxyXG4gIC8vINCS0KvQl9Ce0JIg0KTQo9Cd0JrQptCY0K8g0J/QniDQodCa0KDQntCb0JvQoyDQodCi0KDQkNCd0JjQptCrXHJcbiAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG5cclxuICAgIGlmIChiZyAhPT0gbnVsbCkge1xyXG4gICAgICBIZWFkZXJQYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChza2lsbHMgIT09IG51bGwpIHtcclxuICAgICAgU2tpbGxzLmdyb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYmxvZ1dyYXBwZXIgIT09IG51bGwpIHtcclxuICAgICAgaWYgKHdTY3JvbGwgPj0gd2luZG93LmlubmVySGVpZ2h0KSBCbG9nTWVudS5pbml0KCk7XHJcbiAgICAgIEJsb2dNZW51LmluaXRBY3RpdmUoKTtcclxuICAgIH1cclxuXHJcbiAgfTtcclxuXHJcbiAgdmFyIHNpZGVNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGVtZW51LWJ0bicpO1xyXG5cclxuICBpZiAoc2lkZU1lbnUgIT09IG51bGwpIHtcclxuICAgIHNpZGVNZW51Lm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEJsb2dNZW51LnRvZ2dsZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEJsb2dNZW51LmluaXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBhZG1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZG1pbi10YWJzX19pdGVtJyk7XHJcblxyXG4gIGlmIChhZG1pbikge1xyXG4gICAgVGFicy5zd2l0Y2goKTtcclxuICB9XHJcblxyXG5cclxufTsiXX0=
