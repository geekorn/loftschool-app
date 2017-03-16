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

  let resultContainer = document.querySelector('.status');
  //подготовка данных к отправке
  function prepareSendMail(e) {
    e.preventDefault();
    let form = e.target;
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
    let inputs = form.elements;
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


  //авторизация
  function preparePersonal (e) {
    e.preventDefault();
    let form = e.target;

    let data = {
      login: form.username.value,
      password: form.password.value
    };

    sendAjaxJson('/login', data, function (data) {
      $('.input-error-msg').text(data);
    })
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
    skill: prepareSkillData,
    auth: preparePersonal
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
      var authForm = document.querySelector('#authForm');

      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var valid = Validation.init(form);

        console.log(valid);

        if (valid) {
          if (e.target == mailForm) SendData.mail(e);

          if (e.target == newPost) SendData.post(e);

          if (e.target == skillForm) SendData.skill(e);

          if (e.target == newWork) AddData.init(e);

          if (e.target == authForm) SendData.auth(e);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkbWluLXBhbmVsLmpzIiwiYmxvZy1tZW51LmpzIiwiYmx1ci5qcyIsImRhdGEtdXBsb2FkLmpzIiwiZmxpcC5qcyIsImZvcm1zLmpzIiwiZ29vZ2xlLW1hcC5qcyIsIm1haWxlci5qcyIsIm1haW4tbWVudS5qcyIsIm1haW4tcGFyYWxheC5qcyIsInByZWxvYWRlci5qcyIsInNjcm9sbC1wYWdlLmpzIiwic2Nyb2xsLXBhcmFsYXguanMiLCJza2lsbHMuanMiLCJzbGlkZXIuanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBUYWJzID0gKGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRhYnMgPSAkKCcuYWRtaW4tdGFic19faXRlbScpLFxuICAgIGNvbnRlbnRzID0gJCgnLnRhYi1jb250ZW50X19pdGVtJyksXG4gICAgaW5kZXggPSAwO1xuXG4gIGZ1bmN0aW9uIF9pbml0KCkge1xuICAgIHRhYnNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2FkbWluLXRhYnNfX2l0ZW1fYWN0aXZlJyk7XG4gICAgY29udGVudHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3RhYi1jb250ZW50X19pdGVtX2FjdGl2ZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gX3RvZ2dsZSgpIHtcbiAgICB0YWJzLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciB0aGF0ID0gJCh0aGlzKTtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FkbWluLXRhYnNfX2l0ZW1fYWN0aXZlJylcbiAgICAgICAgLnNpYmxpbmdzKClcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdhZG1pbi10YWJzX19pdGVtX2FjdGl2ZScpXG5cbiAgICAgIHZhciBuZHggPSAkKHRoaXMpLmluZGV4KCk7XG4gICAgICBjb250ZW50cy5lcShuZHgpLmFkZENsYXNzKCd0YWItY29udGVudF9faXRlbV9hY3RpdmUnKVxuICAgICAgICAuc2libGluZ3MoKVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ3RhYi1jb250ZW50X19pdGVtX2FjdGl2ZScpXG5cbiAgICB9KVxuXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQ6IF9pbml0LFxuICAgIHN3aXRjaDogX3RvZ2dsZVxuICB9XG59KSgpOyIsInZhciBCbG9nTWVudSA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKTtcblxuICBmdW5jdGlvbiBfZml4TWVudSgpIHtcbiAgICB2YXIgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJsb2ctbWVudScpLFxuICAgICAgbmF2Q29vcmRzID0gc2lkZWJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzgwKSB7XG4gICAgICBpZiAobmF2Q29vcmRzIDw9IC01MCkge1xuICAgICAgICBuYXYuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xuICAgICAgICBuYXYuc3R5bGUudG9wID0gJzIwcHgnO1xuICAgICAgICBuYXYuc3R5bGUud2lkdGggPSAnMjAlJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnO1xuICAgICAgICBuYXYuc3R5bGUud2lkdGggPSAnYXV0byc7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hdi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBuYXYuc3R5bGUudG9wID0gJyc7XG4gICAgICBuYXYuc3R5bGUud2lkdGggPSAnYXV0byc7XG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiBfaW5pdEFjdGl2ZSAoKSB7XG4gICAgdmFyIHBvc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBvc3RfX3RpdGxlJyksXG4gICAgICBwb3N0TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmxvZy1tZW51X19saW5rJyksXG4gICAgICBhY3RpdmVMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYmxvZy1tZW51X19saW5rX2FjdGl2ZScpO1xuXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvc3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcG9zdCA9IHBvc3RzW2ldLFxuICAgICAgICBwb3N0VG9wID0gcG9zdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG5cbiAgICAgIGlmIChwb3N0VG9wIDw9IDEwMCkge1xuICAgICAgICBhY3RpdmVMaW5rWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcbiAgICAgICAgcG9zdExpbmtzW2ldLmNsYXNzTGlzdC5hZGQoJ2Jsb2ctbWVudV9fbGlua19hY3RpdmUnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgX29wZW5NZW51ID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXIuY2xhc3NMaXN0LmFkZCgnc2lkZWJhcl9vcGVuJyk7XG4gIH07XG4gIHZhciBfY2xvc2VNZW51ID0gZnVuY3Rpb24gKCkge1xuICAgIHNpZGViYXIuY2xhc3NMaXN0LnJlbW92ZSgnc2lkZWJhcl9vcGVuJyk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBfZml4TWVudSxcbiAgICBpbml0QWN0aXZlOiBfaW5pdEFjdGl2ZSxcbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghc2lkZWJhci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpZGViYXJfb3BlbicpKSB7XG4gICAgICAgIF9vcGVuTWVudSgpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIF9jbG9zZU1lbnUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pKCk7IiwiLy8gQkxVUiBFRkZFQ1RcclxudmFyIEJsdXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrJyksXHJcbiAgICBibHVyV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mZWVkYmFjay1mb3JtJyksXHJcbiAgICBibHVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm1fX2JsdXInKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaW1nV2lkdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmVlZGJhY2tfX2JnJykub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrX19iZycpLFxyXG4gICAgICAgIGltZ0Nvb3JkcyA9IGltZy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBzZWN0aW9uQ29vcmRzID0gc2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICBibHVyQ29vcmRzID0gYmx1cldyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgcG9zTGVmdCA9IC1ibHVyV3JhcHBlci5vZmZzZXRMZWZ0LFxyXG4gICAgICAgIHBvc1RvcCA9IGltZy5vZmZzZXRUb3AgLSBibHVyV3JhcHBlci5vZmZzZXRUb3AsXHJcbiAgICAgICAgYmx1ckNTUyA9IGJsdXIuc3R5bGU7XHJcblxyXG4gICAgICBibHVyQ1NTLmJhY2tncm91bmRTaXplID0gaW1nV2lkdGggKyAncHgnICsgJyAnICsgJ2F1dG8nO1xyXG4gICAgICBibHVyQ1NTLmJhY2tncm91bmRQb3NpdGlvbiA9IHBvc0xlZnQgKyAncHggJyArIHBvc1RvcCArICdweCc7XHJcbiAgICB9XHJcbiAgfVxyXG59KSgpOyIsInZhciBBZGREYXRhID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgZnVuY3Rpb24gZmlsZVVwbG9hZCh1cmwsIGRhdGEsIGNiKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgbGV0IHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgIGNiKHJlc3VsdC5zdGF0dXMpO1xyXG4gICAgfTtcclxuICAgIHhoci5zZW5kKGRhdGEpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX3ByZXBhcmVEYXRhKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XHJcbiAgICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgIGxldCBmaWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbGUtc2VsZWN0JykuZmlsZXNbMF07XHJcbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3b3JrLXRpdGxlJykudmFsdWU7XHJcbiAgICBsZXQgdGVjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3b3JrLXRlY2gnKS52YWx1ZTtcclxuXHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ3Bob3RvJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuICAgIGZvcm1EYXRhLmFwcGVuZCgnbmFtZScsIG5hbWUpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKCd0ZWNoJywgdGVjaCk7XHJcblxyXG4gICAgLy8gcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9ICdVcGxvYWRpbmcuLic7XHJcbiAgICBmaWxlVXBsb2FkKCcvYWRtaW4nLCBmb3JtRGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBfcHJlcGFyZURhdGFcclxuICB9XHJcblxyXG59KSgpOyIsIi8vIGluZGV4IGZsaXBcclxudmFyIEZsaXAgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXV0aC1idXR0b24nKSxcclxuICAgIGZsaXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxpcHBlcicpO1xyXG5cclxuICB2YXIgX2F1dGggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmbGlwcGVyLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGVZKDE4MGRlZyknO1xyXG4gICAgYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgfTtcclxuXHJcbiAgdmFyIF93ZWxjb21lID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZmxpcHBlci5zdHlsZS50cmFuc2Zvcm0gPSAncm90YXRlWSgwZGVnKSc7XHJcbiAgICBidG4uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGF1dGg6IF9hdXRoLFxyXG4gICAgd2VsY29tZTogX3dlbGNvbWVcclxuICB9XHJcblxyXG59KSgpOyIsInZhciBWYWxpZGF0aW9uID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgZXJyb3JGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5pbnB1dC1lcnJvci1tc2cnKSxcclxuICAgIGNhcHRjaGFFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWxjb21lX19lcnJvcicpLFxyXG4gICAgZm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19jb250YWluZXInKTtcclxuXHJcbiAgdmFyIF9pbml0ID0gZnVuY3Rpb24gKGZvcm0pIHtcclxuICAgIHZhciBlbGVtcyA9IGZvcm0uZWxlbWVudHM7XHJcbiAgICByZXR1cm4gX3ZhbGlkYXRlKGVsZW1zKSA/IHRydWUgOiBmYWxzZTtcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBfdmFsaWRhdGUoaW5wdXRzKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbnB1dHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGlucHV0c1tpXS50YWdOYW1lID09PSAnQlVUVE9OJykgY29udGludWU7XHJcblxyXG4gICAgICB2YXIgZWxlbSA9IGlucHV0c1tpXTtcclxuXHJcbiAgICAgIGlmIChlbGVtLnZhbHVlID09ICcnKSB7XHJcbiAgICAgICAgcmV0dXJuIF9zaG93RXJyb3IoZWxlbSlcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGVsZW0udHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBlbGVtLnR5cGUgPT09ICdyYWRpbycpIHtcclxuXHJcbiAgICAgICAgaWYgKGVsZW0uY2hlY2tlZCAmJiBlbGVtLnZhbHVlID09PSAneWVzJykge1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghZWxlbS5jaGVja2VkKSB7XHJcbiAgICAgICAgICBjYXB0Y2hhRXJyb3Iuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9O1xyXG5cclxuICBmdW5jdGlvbiBfc2hvd0Vycm9yKGVsZW0pIHtcclxuICAgIHZhciB0ZXh0ID0gZWxlbS5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJykudG9Mb3dlckNhc2UoKTtcclxuICAgIHZhciBwb3NpdGlvbiA9IGVsZW0ucGFyZW50Tm9kZS5vZmZzZXRUb3AgKyBlbGVtLnBhcmVudE5vZGUub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgIGVsZW0ucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdpbnB1dC1ncm91cF9lcnJvcicpO1xyXG4gICAgZXJyb3JGaWVsZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIGVycm9yRmllbGQuaW5uZXJUZXh0ID0gJ9CS0Ysg0L3QtSDQstCy0LXQu9C4ICcgKyB0ZXh0O1xyXG5cclxuICAgIC8vIGlmIChwb3NpdGlvbiA+IGZvcm1Db250YWluZXIub2Zmc2V0SGVpZ2h0KVxyXG4gICAgZXJyb3JGaWVsZC5zdHlsZS50b3AgPSBwb3NpdGlvbiArICdweCc7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBfY2xlYXJFcnJvcihlbGVtKSB7XHJcbiAgICBlbGVtLnBhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnaW5wdXQtZ3JvdXBfZXJyb3InKTtcclxuICAgIGVycm9yRmllbGQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICB9XHJcblxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogX2luaXQsXHJcbiAgICBjbGVhcjogX2NsZWFyRXJyb3JcclxuICB9XHJcbn0pKCk7IiwiZnVuY3Rpb24gaW5pdE1hcCAoKSB7XHJcbiAgdmFyIHBvaW50ZXIgPSBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKDU1Ljc4NzA2OSwgMzcuNDc4MjIwKSxcclxuICAgIGNlbnRlciA9IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTUuNzg2MjczLCAzNy40MTg2MjMpO1xyXG5cclxuICB2YXIgc3R5bGVzID0gW3tcImZlYXR1cmVUeXBlXCI6XCJhZG1pbmlzdHJhdGl2ZVwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy50ZXh0LmZpbGxcIixcInN0eWxlcnNcIjpbe1wiY29sb3JcIjpcIiM0NDQ0NDRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwibGFuZHNjYXBlXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcImNvbG9yXCI6XCIjZjJmMmYyXCJ9XX0se1wiZmVhdHVyZVR5cGVcIjpcInBvaVwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJyb2FkXCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInNhdHVyYXRpb25cIjotMTAwfSx7XCJsaWdodG5lc3NcIjo0NX1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5oaWdod2F5XCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcInNpbXBsaWZpZWRcIn1dfSx7XCJmZWF0dXJlVHlwZVwiOlwicm9hZC5hcnRlcmlhbFwiLFwiZWxlbWVudFR5cGVcIjpcImxhYmVscy5pY29uXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ0cmFuc2l0XCIsXCJlbGVtZW50VHlwZVwiOlwiYWxsXCIsXCJzdHlsZXJzXCI6W3tcInZpc2liaWxpdHlcIjpcIm9mZlwifV19LHtcImZlYXR1cmVUeXBlXCI6XCJ3YXRlclwiLFwiZWxlbWVudFR5cGVcIjpcImFsbFwiLFwic3R5bGVyc1wiOlt7XCJjb2xvclwiOlwiIzk2ZDdjOFwifSx7XCJ2aXNpYmlsaXR5XCI6XCJvblwifV19XTtcclxuXHJcbiAgdmFyIHN0eWxlZE1hcCA9IG5ldyBnb29nbGUubWFwcy5TdHlsZWRNYXBUeXBlKHN0eWxlcyxcclxuICAgIHtuYW1lOiBcIlN0eWxlZCBNYXBcIn0pO1xyXG5cclxuICB2YXIgbWFwU2V0dGluZ3MgPSB7XHJcbiAgICBjZW50ZXI6IGNlbnRlcixcclxuICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgIHpvb206IDEzLFxyXG4gICAgbWFwVHlwZUNvbnRyb2xPcHRpb25zOiB7XHJcbiAgICAgIG1hcFR5cGVJZHM6IFtnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCwgJ21hcF9zdHlsZSddXHJcbiAgICB9LFxyXG4gICAgem9vbUNvbnRyb2w6IHRydWUsXHJcbiAgICB6b29tQ29udHJvbE9wdGlvbnM6IHtcclxuICAgICAgcG9zaXRpb246IGdvb2dsZS5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVF9UT1BcclxuICAgIH0sXHJcbiAgICBzdHJlZXRWaWV3Q29udHJvbDogZmFsc2VcclxuICB9O1xyXG5cclxuICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyksIG1hcFNldHRpbmdzKTtcclxuXHJcbiAgdmFyIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgaWNvbjogJ2Fzc2V0cy9pbWcvZGVjb3IvbWFwX21hcmtlci5wbmcnLFxyXG4gICAgcG9zaXRpb246IHBvaW50ZXIsXHJcbiAgICBtYXA6IG1hcCxcclxuICAgIHRpdGxlOiBcIkknbSBoZXJlIVwiLFxyXG4gICAgYW5pbWF0aW9uOiBnb29nbGUubWFwcy5BbmltYXRpb24uQk9VTkNFXHJcbiAgfSk7XHJcblxyXG4gIG1hcC5tYXBUeXBlcy5zZXQoJ21hcF9zdHlsZScsIHN0eWxlZE1hcCk7XHJcbiAgbWFwLnNldE1hcFR5cGVJZCgnbWFwX3N0eWxlJyk7XHJcbn07XHJcbiIsInZhciBTZW5kRGF0YSA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gIGxldCByZXN1bHRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzJyk7XHJcbiAgLy/Qv9C+0LTQs9C+0YLQvtCy0LrQsCDQtNCw0L3QvdGL0YUg0Log0L7RgtC/0YDQsNCy0LrQtVxyXG4gIGZ1bmN0aW9uIHByZXBhcmVTZW5kTWFpbChlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgZm9ybSA9IGUudGFyZ2V0O1xyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIG5hbWU6IGZvcm0ubmFtZS52YWx1ZSxcclxuICAgICAgZW1haWw6IGZvcm0uZW1haWwudmFsdWUsXHJcbiAgICAgIHRleHQ6IGZvcm0udGV4dC52YWx1ZVxyXG4gICAgfTtcclxuXHJcbiAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gJ3NlbmRpbmcuLi4nO1xyXG4gICAgc2VuZEFqYXhKc29uKCcvd29ya3MnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuICAgICAgcmVzdWx0Q29udGFpbmVyLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8v0L/QvtC00LPQvtGC0L7QstC60LAg0LTQsNC90L3Ri9GFINC90L7QstC+0Lkg0YHRgtCw0YLRjNC4XHJcbiAgZnVuY3Rpb24gcHJlcGFyZVNlbmRQb3N0KGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCBmb3JtID0gZS50YXJnZXQ7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgdGl0bGU6IGZvcm0udGl0bGUudmFsdWUsXHJcbiAgICAgIGRhdGU6IGZvcm0uZGF0ZS52YWx1ZSxcclxuICAgICAgdGV4dDogZm9ybS50ZXh0LnZhbHVlXHJcbiAgICB9O1xyXG5cclxuICAgIHJlc3VsdENvbnRhaW5lci5pbm5lckhUTUwgPSAnc2VuZGluZy4uLic7XHJcbiAgICBzZW5kQWpheEpzb24oJy9ibG9nJywgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgcmVzdWx0Q29udGFpbmVyLmlubmVySFRNTCA9IGRhdGE7XHJcbiAgICAgIHJlc3VsdENvbnRhaW5lci5wYXJlbnROb2RlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvL9C/0L7QtNCz0L7RgtC+0LLQutCwINGB0LrQuNC70LvQvtCyXHJcbiAgZnVuY3Rpb24gcHJlcGFyZVNraWxsRGF0YShlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBsZXQgZm9ybSA9IGUudGFyZ2V0O1xyXG4gICAgbGV0IGlucHV0cyA9IGZvcm0uZWxlbWVudHM7XHJcbiAgICBsZXQgZGF0YSA9IFtdO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBlbGVtID0gaW5wdXRzW2ldO1xyXG4gICAgICBpZiAoaW5wdXRzW2ldLnRhZ05hbWUgPT09ICdCVVRUT04nKSBjb250aW51ZTtcclxuICAgICAgLy8gY29uc29sZS5sb2coZWxlbS5kYXRhc2V0LmNhdGVnb3J5KTtcclxuICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICBjYXRlZ29yeTogZWxlbS5kYXRhc2V0LmNhdGVnb3J5LFxyXG4gICAgICAgIHRlY2g6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGl0bGU6IGVsZW0ubmFtZSxcclxuICAgICAgICAgICAgcGVyY2VudDogZWxlbS52YWx1ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmICghZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICBkYXRhLnB1c2gob2JqKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgbmR4ID0gZGF0YS5maW5kSW5kZXgoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgIHJldHVybiBpdGVtLmNhdGVnb3J5ID09IG9iai5jYXRlZ29yeVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChuZHggPj0gMCkge1xyXG4gICAgICAgICAgZGF0YVtuZHhdLnRlY2ggPSBkYXRhW25keF0udGVjaC5jb25jYXQob2JqLnRlY2gpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGRhdGEucHVzaChvYmopO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgc2VuZEFqYXhKc29uKCcvYWJvdXQnLCBkYXRhLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICByZXN1bHRDb250YWluZXIuaW5uZXJIVE1MID0gZGF0YTtcclxuICAgICAgcmVzdWx0Q29udGFpbmVyLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG5cclxuICAvL9Cw0LLRgtC+0YDQuNC30LDRhtC40Y9cclxuICBmdW5jdGlvbiBwcmVwYXJlUGVyc29uYWwgKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGxldCBmb3JtID0gZS50YXJnZXQ7XHJcblxyXG4gICAgbGV0IGRhdGEgPSB7XHJcbiAgICAgIGxvZ2luOiBmb3JtLnVzZXJuYW1lLnZhbHVlLFxyXG4gICAgICBwYXNzd29yZDogZm9ybS5wYXNzd29yZC52YWx1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBzZW5kQWpheEpzb24oJy9sb2dpbicsIGRhdGEsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICQoJy5pbnB1dC1lcnJvci1tc2cnKS50ZXh0KGRhdGEpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG5cclxuLy/QvtGC0L/RgNCw0LLQutCwINC00LDQvdC90YvRhSDQvdCwINGB0LXRgNCy0LXRgFxyXG4gIGZ1bmN0aW9uIHNlbmRBamF4SnNvbih1cmwsIGRhdGEsIGNiKSB7XHJcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XHJcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgY2IocmVzdWx0LnN0YXR1cyk7XHJcbiAgICB9O1xyXG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpXHJcbiAgfVxyXG5cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG1haWw6IHByZXBhcmVTZW5kTWFpbCxcclxuICAgIHBvc3Q6IHByZXBhcmVTZW5kUG9zdCxcclxuICAgIHNraWxsOiBwcmVwYXJlU2tpbGxEYXRhLFxyXG4gICAgYXV0aDogcHJlcGFyZVBlcnNvbmFsXHJcbiAgfVxyXG5cclxufSlcclxuKCk7IiwidmFyIE1lbnUgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tbmF2aWdhdGlvbicpLFxyXG4gICAgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXItYnRuJyk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0b2dnbGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgYnVyZ2VyTWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoYW1idXJnZXItYnRuX2Nsb3NlZCcpO1xyXG4gICAgICBtZW51LmNsYXNzTGlzdC50b2dnbGUoJ21haW4tbmF2aWdhdGlvbl9kaXNhYmxlZCcpO1xyXG5cclxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICghbWVudS5jbGFzc0xpc3QuY29udGFpbnMoJ21haW4tbmF2aWdhdGlvbl9kaXNhYmxlZCcpKSA/ICdoaWRkZW4nIDogJ2F1dG8nO1xyXG4gICAgfVxyXG4gIH1cclxufSkoKTsiLCIvL2luZGV4IHBhcmFsYXhcclxudmFyIE1haW5QYXJhbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgdmFyIF9zaG93ID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBwYXJhbGF4Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BhcmFsYXgnKSxcclxuICAgICAgbGF5ZXJzID0gcGFyYWxheENvbnRhaW5lci5jaGlsZHJlbjtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAgIHZhciBwYWdlWCA9IGUucGFnZVgsXHJcbiAgICAgICAgcGFnZVkgPSBlLnBhZ2VZLFxyXG4gICAgICAgIGluaXRpYWxYID0gKHdpbmRvdy5pbm5lcldpZHRoIC8gMikgLSBwYWdlWCxcclxuICAgICAgICBpbml0aWFsWSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIHBhZ2VZO1xyXG5cclxuICAgICAgW10uc2xpY2UuY2FsbChsYXllcnMpLmZvckVhY2goZnVuY3Rpb24gKGxheWVyLCBpKSB7XHJcbiAgICAgICAgdmFyIGxheWVyU3R5bGUgPSBsYXllci5zdHlsZSxcclxuICAgICAgICAgIGRpdmlkZXIgPSBpIC8gNDAsXHJcbiAgICAgICAgICBib3R0b21Qb3NpdGlvbiA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICBob3Jpem9udGFsUG9zaXRpb24gPSAod2luZG93LmlubmVyV2lkdGggLyAyKSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICBwb3NpdGlvblggPSBpbml0aWFsWCAqIGRpdmlkZXIsXHJcbiAgICAgICAgICBwb3NpdGlvblkgPSBpbml0aWFsWSAqIGRpdmlkZXIsXHJcbiAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoJyArIHBvc2l0aW9uWCArICdweCwnICsgcG9zaXRpb25ZICsgJ3B4LCAwKSc7XHJcblxyXG4gICAgICAgIGxheWVyU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIGxheWVyU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIGxheWVyU3R5bGUuYm90dG9tID0gJy0nICsgYm90dG9tUG9zaXRpb24gKyAncHgnO1xyXG4gICAgICAgIGxheWVyU3R5bGUubGVmdCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgICAgbGF5ZXJTdHlsZS5yaWdodCA9ICctJyArIGhvcml6b250YWxQb3NpdGlvbiArICdweCc7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgdmFyIF9kaXNhYmxlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIC8v0LTQu9GPINC/0LvQsNC90YjQtdGC0L7QsiDQuCDRgtC10LvQtdGE0L7QvdC+0LIg0L/QvtC00YHRgtCw0LLQuNGC0Ywg0L/RgNC+0YHRgtC+INC60LDRgNGC0LjQvdC60YMsINCwINC90LUg0LPRgNGD0LfQuNGC0Ywg0LLQtdGB0Ywg0L/QsNGA0LDQu9Cw0LrRgVxyXG4gIH07XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBfc2hvd1xyXG4gIH07XHJcblxyXG59KSgpOyIsInZhciBQcmVsb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZWxvYWRlcicpLFxuICAgIHdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaW5kZXgtd3JhcHBlcicpLFxuICAgIGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpLFxuICAgIGZsaXBDYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZsaXBwZXInKSxcbiAgICBwcm9jZW50RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyX19wZXJjZW50JyksXG4gICAgcGVyY2VudCA9IDAsXG4gICAgcGVyY2VudFN0ZXAgPSAxMDAgLyAoaW1hZ2VzLmxlbmd0aCArIDAuNCk7XG5cbiAgZnVuY3Rpb24gX2xvYWRJbWFnZShpbWcpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcGVyY2VudCA9IE1hdGguY2VpbChwZXJjZW50ICsgcGVyY2VudFN0ZXApO1xuICAgICAgICBwcm9jZW50RmllbGQuaW5uZXJIVE1MID0gcGVyY2VudCArICclJztcbiAgICAgICAgcmVzb2x2ZShpbWcpO1xuICAgICAgfTtcbiAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZWplY3QoaW1nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zaG93TG9hZGVyKGltZ0xpc3QpIHtcbiAgICB2YXIgcHJvbWlzZUltZyA9IGltZ0xpc3QubWFwKF9sb2FkSW1hZ2UpO1xuXG4gICAgUHJvbWlzZS5hbGwocHJvbWlzZUltZylcbiAgICAgIC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB3cmFwcGVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIHBlcmNlbnQgPSAxMDA7XG4gICAgICAgIHByb2NlbnRGaWVsZC5pbm5lckhUTUwgPSBwZXJjZW50ICsgJyUnO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBsb2FkZXIuc3R5bGUub3BhY2l0eSA9ICcwJztcbiAgICAgICAgICAvLyBsb2FkZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsb2FkZXIpO1xuICAgICAgICAgIGxvYWRlci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9LCAxNTAwKVxuICAgICAgfSlcbiAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZmxpcENhcmQuc3R5bGUudHJhbnNmb3JtID0gJ3JvdGF0ZTNkKDEsMCwwLCAwZGVnKSc7XG4gICAgICAgIH0sIDE1MDApXG4gICAgICB9KVxuICB9O1xuXG5mdW5jdGlvbiBfY2xvc2VMb2FkZXIoKSB7XG4gIHZhciBpbWdBcnIgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChpbWFnZXMpO1xuXG4gIF9zaG93TG9hZGVyKGltZ0Fycik7XG59O1xuXG5cbnJldHVybiB7XG4gIGluaXQ6IF9jbG9zZUxvYWRlclxufVxuXG59KVxuKCk7XG5cblxuLypcbiAxIC0g0LfQsNCz0YDRg9C30LjRgtGMINGB0LDQvCDQv9GA0LXQu9C+0LDQtNC10YBcbiAyIC0g0LLQt9GP0YLRjCDQstGB0LUg0LrQsNGA0YLQuNC90LrQuCDQvdCwINGB0YLRgNCw0L3QuNGG0LVcbiAzIC0g0L/QviDQvNC10YDQtSDQt9Cw0LPRgNGD0LfQutC4INC60LDRgNGC0LjQvdC+0Log0LzQtdC90Y/RgtGMINC/0YDQvtGG0LXQvdGC0YtcbiA0IC0g0L/QvtGB0LvQtSDQt9Cw0LPRgNGD0LfQutC4INCy0YHQtdGFINC60LDRgNGC0LjQvdC+0Log0YPQsdGA0LDRgtGMINC/0YDQtdC70L7QsNC00LXRgFxuICovIiwidmFyIFNjcm9sbFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZG93bjogZnVuY3Rpb24gKGVsZW0pIHtcclxuICAgICAgdmFyIHNlY3Rpb24gPSBlbGVtLnBhcmVudE5vZGUubmV4dFNpYmxpbmcsXHJcbiAgICAgICAgcG9zVG9wID0gc2VjdGlvbi5vZmZzZXRUb3A7XHJcblxyXG4gICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IHBvc1RvcH0sIDE1MDApO1xyXG4gICAgfSxcclxuXHJcbiAgICB1cDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKCdib2R5LGh0bWwnKS5hbmltYXRlKHtzY3JvbGxUb3A6IDB9LCAxMjAwKTtcclxuICAgIH1cclxuICB9XHJcbn0pKCk7IiwiLy8g0J/QkNCg0JDQm9CQ0JrQoSDQrdCk0KTQpNCV0JrQoiDQkiDQqNCQ0J/QmtCVINCh0JDQmdCi0JBcclxudmFyIEhlYWRlclBhcmFsbGF4ID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19iZycpLFxyXG4gICAgcG9ydGZvbGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fcG9ydGZvbGlvJyksXHJcbiAgICB1c2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9fdXNlcicpO1xyXG5cclxuICB2YXIgX21vdmUgPSBmdW5jdGlvbiAoYmxvY2ssIHdpbmRvd1Njcm9sbCwgc3RyYWZlQW1vdW50KSB7XHJcbiAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJyxcclxuICAgICAgdHJhbnNmb3JtU3RyaW5nID0gJ3RyYW5zbGF0ZTNkKDAsICcgKyBzdHJhZmUgKyAnLCAwKScsXHJcbiAgICAgIHN0eWxlID0gYmxvY2suc3R5bGU7XHJcblxyXG4gICAgaWYgKHdpbmRvd1Njcm9sbCA8IHdpbmRvdy5pbm5lckhlaWdodCkge1xyXG4gICAgICBzdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgIHN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgIH1cclxuICB9O1xyXG5cclxuICByZXR1cm4ge1xyXG5cclxuICAgIGluaXQ6IGZ1bmN0aW9uICh3U2Nyb2xsKSB7XHJcbiAgICAgIF9tb3ZlKGJnLCB3U2Nyb2xsLCA0NSk7XHJcbiAgICAgIGlmIChwb3J0Zm9saW8gIT09IG51bGwpIHtcclxuICAgICAgICBfbW92ZShwb3J0Zm9saW8sIHdTY3JvbGwsIDIwKTtcclxuICAgICAgfTtcclxuICAgICAgX21vdmUodXNlciwgd1Njcm9sbCwgMyk7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbn0pKCk7IiwiLy8g0JDQndCY0JzQkNCm0JjQryDQmNCa0J7QndCe0Jog0KHQmtCY0JvQntCSXHJcbnZhciBTa2lsbHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBza2lsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2tpbGwnKSxcclxuICAgIGNpcmNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2lyY2xlLXNlY29uZCcpLFxyXG4gICAgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAvLyDQstGL0YfQuNGB0LvRj9C10Lwg0LTQu9C40L3RgyDQvtC60YDRg9C20L3QvtGB0YLQuFxyXG4gIHZhciBjaXJjbGVMZW5ndGggPSBmdW5jdGlvbiAoY2lyY2xlKSB7XHJcbiAgICB2YXIgY2lyY2xlUmFkaXVzID0gY2lyY2xlLmdldEF0dHJpYnV0ZSgncicpLFxyXG4gICAgICBjaXJjbGVMZW5ndGggPSAyICogTWF0aC5QSSAqIGNpcmNsZVJhZGl1cztcclxuXHJcbiAgICByZXR1cm4gY2lyY2xlTGVuZ3RoO1xyXG4gIH07XHJcblxyXG4gIC8vINC/0YDQuNC80LXQvdGP0LXQvCDQuiDQvtC60YDRg9C20L3QvtGB0YLQuCDRgdCy0L7QudGB0YLQstCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXHJcbiAgW10uc2xpY2UuY2FsbChjaXJjbGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChjaXJjbGUpIHtcclxuXHJcbiAgICBjaXJjbGUuc3R5bGUuc3Ryb2tlRGFzaG9mZnNldCA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xyXG4gICAgY2lyY2xlLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGNpcmNsZUxlbmd0aChjaXJjbGUpO1xyXG5cclxuICB9KTtcclxuXHJcbiAgLy8g0YTRg9C90LrRhtC40Y8g0LDQvdC40LzQuNGA0L7QstCw0L3QuNGPINC+0LrRgNGD0LbQvdC+0YHRgtC4INCyINC30LDQstC40YHQuNC80L7RgdGC0Lgg0L7RgiDQv9GA0L7RhtC10L3RgtC+0LJcclxuICB2YXIgY2lyY2xlQW5pbWF0aW9uID0gZnVuY3Rpb24gKHNraWxsKSB7XHJcblxyXG4gICAgdmFyIGNpcmNsZUZpbGwgPSBza2lsbC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlLXNlY29uZCcpLFxyXG4gICAgICBza2lsbFBlcmNlbnQgPSBza2lsbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGVyY2VudCcpLFxyXG4gICAgICBsZW5ndGggPSBjaXJjbGVMZW5ndGgoY2lyY2xlRmlsbCksXHJcbiAgICAgIHBlcmNlbnQgPSBsZW5ndGggKiAoMTAwIC0gc2tpbGxQZXJjZW50KSAvIDEwMDtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgY2lyY2xlRmlsbC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gcGVyY2VudDtcclxuICAgICAgY2lyY2xlRmlsbC5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyc7XHJcblxyXG4gICAgICBpZiAoc2tpbGxQZXJjZW50IDwgNTApIHtcclxuICAgICAgICBza2lsbC5zdHlsZS5vcGFjaXR5ID0gMC40O1xyXG4gICAgICAgIHNraWxsLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDFzJztcclxuICAgICAgfVxyXG4gICAgfSwgNTAwKTtcclxuXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGdyb3c6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgIFtdLnNsaWNlLmNhbGwoc2tpbGxzKS5mb3JFYWNoKGZ1bmN0aW9uIChza2lsbCkge1xyXG5cclxuICAgICAgICB2YXIgY2lyY2xlUmVjdCA9IHNraWxsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgY2lyY2xlUG9zID0gY2lyY2xlUmVjdC5ib3R0b20sXHJcbiAgICAgICAgICBzdGFydEFuaW1hdGlvbiA9IGNpcmNsZVBvcyAtIHdpbmRvd0hlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKHN0YXJ0QW5pbWF0aW9uIDw9IDApIHtcclxuICAgICAgICAgIGNpcmNsZUFuaW1hdGlvbihza2lsbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufSkoKTsiLCJ2YXIgU2xpZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgaXRlbXMgPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X25leHQnKSxcclxuICAgIGluZGV4ID0gMSxcclxuICAgIG5keCxcclxuICAgIGR1cmF0aW9uID0gNTAwLFxyXG4gICAgdGl0bGUgPSAkKCcud29ya19fdGl0bGUnKSxcclxuICAgIHNraWxscyA9ICQoJy53b3JrX190ZWNobm9sb2d5JyksXHJcbiAgICBpbWdDb250YWluZXIgPSAkKCcud29ya19fcGljJyk7XHJcblxyXG4gIGZ1bmN0aW9uIF9pbml0KCkge1xyXG4gICAgdmFyIGFjdGl2ZUl0ZW0gPSBpdGVtcy5lcShpbmRleCksXHJcbiAgICAgIGltZ1NyYyA9IGFjdGl2ZUl0ZW0uZmluZCgnaW1nJykuYXR0cignc3JjJyksXHJcbiAgICAgIGFjdGl2ZVRpdGxlID0gYWN0aXZlSXRlbS5kYXRhKCd0aXRsZScpLFxyXG4gICAgICBhY3RpdmVTbGlsbCA9IGFjdGl2ZUl0ZW0uZGF0YSgndGVjaG5vbG9neScpO1xyXG5cclxuICAgIGltZ0NvbnRhaW5lci5hdHRyKCdzcmMnLCBpbWdTcmMpO1xyXG4gICAgdGl0bGUudGV4dChhY3RpdmVUaXRsZSk7XHJcbiAgICBza2lsbHMudGV4dChhY3RpdmVTbGlsbCk7XHJcblxyXG4gICAgdmFyIG5leHRJdGVtID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgJy53b3JrLXNsaWRlcl9fbGlzdF9uZXh0JykuZXEoaW5kZXggKyAxKTtcclxuICAgIG5leHRJdGVtLmFkZENsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50Jyk7XHJcbiAgICB2YXIgcHJldkl0ZW0gPSAkKCcud29yay1zbGlkZXJfX2l0ZW0nLCAnLndvcmstc2xpZGVyX19saXN0X3ByZXYnKS5lcShpbmRleCAtIDEpO1xyXG4gICAgcHJldkl0ZW0uYWRkQ2xhc3MoJ3dvcmstc2xpZGVyX19pdGVtX2N1cnJlbnQnKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKSB7XHJcbiAgICB2YXIgbmV4dEl0ZW1zID0gJCgnLndvcmstc2xpZGVyX19pdGVtJywgY29udGFpbmVyKSxcclxuICAgICAgY3VycmVudEl0ZW0gPSBuZXh0SXRlbXMuZmlsdGVyKCcud29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpLFxyXG4gICAgICByZXFJdGVtID0gbmV4dEl0ZW1zLmVxKG5keCk7XHJcbiAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09ICd1cCcgPyAtMTAwIDogMTAwO1xyXG5cclxuICAgIGN1cnJlbnRJdGVtLmFuaW1hdGUoe1xyXG4gICAgICAndG9wJzogZGlyZWN0aW9uICsgJyUnXHJcbiAgICB9LCBkdXJhdGlvbik7XHJcblxyXG4gICAgcmVxSXRlbS5hbmltYXRlKHtcclxuICAgICAgJ3RvcCc6IDBcclxuICAgIH0sIGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGN1cnJlbnRJdGVtLnJlbW92ZUNsYXNzKCd3b3JrLXNsaWRlcl9faXRlbV9jdXJyZW50JykuY3NzKCd0b3AnLCAtZGlyZWN0aW9uICsgJyUnKTtcclxuICAgICAgcmVxSXRlbS5hZGRDbGFzcygnd29yay1zbGlkZXJfX2l0ZW1fY3VycmVudCcpO1xyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9tb3ZlTmV4dCgpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfbmV4dCcpLFxyXG4gICAgICBkaXJlY3Rpb24gPSAndXAnO1xyXG5cclxuICAgIGlmIChpbmRleCA9PSBpdGVtcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgIG5keCA9IDA7XHJcbiAgICB9IGVsc2UgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICBuZHggPSBpdGVtcy5sZW5ndGggLSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbmR4ID0gaW5kZXggKyAxO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTbGlkZShuZHgsIGNvbnRhaW5lciwgZGlyZWN0aW9uKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIF9tb3ZlUHJldigpIHtcclxuICAgIHZhciBjb250YWluZXIgPSAkKCcud29yay1zbGlkZXJfX2xpc3RfcHJldicpLFxyXG4gICAgICBkaXJlY3Rpb24gPSAnZG93bic7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICBuZHggPSAwO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA8PSAwKSB7XHJcbiAgICAgIG5keCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBuZHggPSBpbmRleCAtIDE7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVNsaWRlKG5keCwgY29udGFpbmVyLCBkaXJlY3Rpb24pO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gX3NsaWRlU2hvdygpIHtcclxuICAgIHZhciBmYWRlZE91dCA9ICQuRGVmZXJyZWQoKSxcclxuICAgICAgbG9hZGVkID0gJC5EZWZlcnJlZCgpLFxyXG4gICAgICBuZXh0U3JjID0gaXRlbXMuZXEoaW5kZXgpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpLFxyXG4gICAgICBuZXh0VGl0bGUgPSBpdGVtcy5lcShpbmRleCkuZGF0YSgndGl0bGUnKSxcclxuICAgICAgbmV4dFNraWxscyA9IGl0ZW1zLmVxKGluZGV4KS5kYXRhKCd0ZWNobm9sb2d5Jyk7XHJcblxyXG4gICAgX21vdmVOZXh0KCk7XHJcbiAgICBfbW92ZVByZXYoKTtcclxuXHJcbiAgICBpbWdDb250YWluZXIuZmFkZU91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRpdGxlLnNsaWRlVXAoKTtcclxuICAgICAgc2tpbGxzLmZhZGVPdXQoKTtcclxuICAgICAgZmFkZWRPdXQucmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZmFkZWRPdXQuZG9uZShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRpdGxlLnRleHQobmV4dFRpdGxlKTtcclxuICAgICAgc2tpbGxzLnRleHQobmV4dFNraWxscyk7XHJcbiAgICAgIGltZ0NvbnRhaW5lci5hdHRyKCdzcmMnLCBuZXh0U3JjKS5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsb2FkZWQucmVzb2x2ZSgpO1xyXG4gICAgICB9KVxyXG4gICAgfSk7XHJcblxyXG4gICAgbG9hZGVkLmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aXRsZS5zbGlkZURvd24oKTtcclxuICAgICAgc2tpbGxzLmZhZGVJbigpO1xyXG4gICAgICBpbWdDb250YWluZXIuZmFkZUluKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbml0OiBfaW5pdCxcclxuICAgIG1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICQoJy50b2dnbGVfX2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgaWYgKCQodGhpcykuaGFzQ2xhc3MoJ3RvZ2dsZV9fbGlua19uZXh0JykpIHtcclxuICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgfSBlbHNlIGlmICgkKHRoaXMpLmhhc0NsYXNzKCd0b2dnbGVfX2xpbmtfcHJldicpKSB7XHJcbiAgICAgICAgICBpbmRleC0tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGluZGV4ID4gaXRlbXMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICBpbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfc2xpZGVTaG93KCk7XHJcblxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxufSlcclxuKCk7IiwidmFyIHByZWxvYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlbG9hZGVyJyk7XHJcblxyXG5pZiAocHJlbG9hZCAhPT0gbnVsbCkgUHJlbG9hZGVyLmluaXQoKTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gIC8vTUFJTiBQQVJBTEFYXHJcbiAgdmFyIHBhcmFsYXggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcGFyYWxheCcpO1xyXG5cclxuICBpZiAocGFyYWxheCAhPT0gbnVsbCkge1xyXG4gICAgTWFpblBhcmFsYXguaW5pdCgpO1xyXG4gIH1cclxuICAvL1xyXG4gIC8vIGNvbnNvbGUubG9nKHBhcmFsYXgpO1xyXG5cclxuXHJcbiAgLy9GTElQIENBUkRcclxuICB2YXIgYXV0aEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdXRoLWJ1dHRvbicpLFxyXG4gICAgd2VsY29tZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tcmV0dXJuJyk7XHJcblxyXG4gIGlmIChhdXRoQnRuICE9PSBudWxsKSB7XHJcbiAgICBhdXRoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBGbGlwLmF1dGgoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWYgKHdlbGNvbWVCdG4gIT09IG51bGwpIHtcclxuICAgIHdlbGNvbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIEZsaXAud2VsY29tZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvL0JVUkdFUk1FTlVcclxuICB2YXIgYnVyZ2VyTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oYW1idXJnZXItYnRuJyk7XHJcblxyXG4gIGlmIChidXJnZXJNZW51ICE9PSBudWxsKSB7XHJcbiAgICBidXJnZXJNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBNZW51LnRvZ2dsZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLy9CTFVSXHJcbiAgdmFyIGJsdXJGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZlZWRiYWNrLWZvcm1fX2JsdXInKTtcclxuXHJcbiAgaWYgKGJsdXJGb3JtICE9PSBudWxsKSB7XHJcbiAgICBCbHVyLnNldCgpO1xyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBCbHVyLnNldCgpO1xyXG4gICAgfTtcclxuXHJcblxyXG4gIH1cclxuXHJcblxyXG4gIHZhciBmb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2Zvcm0nKTtcclxuXHJcbiAgaWYgKGZvcm1zICE9PSBudWxsKSB7XHJcblxyXG4gICAgW10uc2xpY2UuY2FsbChmb3JtcykuZm9yRWFjaChmdW5jdGlvbiAoZm9ybSkge1xyXG5cclxuICAgICAgLy/QvtGH0LjRgdGC0LrQsCDQvtGI0LjQsdC60LhcclxuICAgICAgdmFyIGlucHV0cyA9IGZvcm0uZWxlbWVudHM7XHJcbiAgICAgIHZhciBjbG9zZUVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmlucHV0LWVycm9yLWNhcHRjaGFfX2Nsb3NlJyk7XHJcblxyXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlucHV0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlucHV0c1tpXS5vbmZvY3VzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgaWYgKHRoaXMucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2lucHV0LWdyb3VwX2Vycm9yJykpIHtcclxuICAgICAgICAgICAgVmFsaWRhdGlvbi5jbGVhcih0aGlzKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjbG9zZUVycm9yICE9PSBudWxsKSB7XHJcbiAgICAgICAgY2xvc2VFcnJvci5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgY2xvc2VFcnJvci5wYXJlbnROb2RlLnBhcmVudE5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcblxyXG4gICAgICB2YXIgbWFpbEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWFpbGVyJyk7XHJcbiAgICAgIHZhciBuZXdQb3N0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy1wb3N0Jyk7XHJcbiAgICAgIHZhciBuZXdXb3JrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy13b3JrJyk7XHJcbiAgICAgIHZhciBza2lsbEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2tpbGxzJyk7XHJcbiAgICAgIHZhciBhdXRoRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhdXRoRm9ybScpO1xyXG5cclxuICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgdmFyIHZhbGlkID0gVmFsaWRhdGlvbi5pbml0KGZvcm0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyh2YWxpZCk7XHJcblxyXG4gICAgICAgIGlmICh2YWxpZCkge1xyXG4gICAgICAgICAgaWYgKGUudGFyZ2V0ID09IG1haWxGb3JtKSBTZW5kRGF0YS5tYWlsKGUpO1xyXG5cclxuICAgICAgICAgIGlmIChlLnRhcmdldCA9PSBuZXdQb3N0KSBTZW5kRGF0YS5wb3N0KGUpO1xyXG5cclxuICAgICAgICAgIGlmIChlLnRhcmdldCA9PSBza2lsbEZvcm0pIFNlbmREYXRhLnNraWxsKGUpO1xyXG5cclxuICAgICAgICAgIGlmIChlLnRhcmdldCA9PSBuZXdXb3JrKSBBZGREYXRhLmluaXQoZSk7XHJcblxyXG4gICAgICAgICAgaWYgKGUudGFyZ2V0ID09IGF1dGhGb3JtKSBTZW5kRGF0YS5hdXRoKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcblxyXG4gIC8vU0NST0xMIFBBR0VcclxuICB2YXIgc2Nyb2xsTGlua0Rvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWxpbmtfZG93bicpO1xyXG4gIHZhciBzY3JvbGxMaW5rVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2Nyb2xsLWxpbmtfdXAnKTtcclxuXHJcbiAgaWYgKHNjcm9sbExpbmtEb3duICE9PSBudWxsKSB7XHJcbiAgICBzY3JvbGxMaW5rRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIFNjcm9sbFBhZ2UuZG93bih0aGlzKTtcclxuICAgIH0pXHJcbiAgfVxyXG4gIGlmIChzY3JvbGxMaW5rVXAgIT09IG51bGwpIHtcclxuICAgIHNjcm9sbExpbmtVcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIFNjcm9sbFBhZ2UudXAodGhpcyk7XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy9TTElERVJcclxuICB2YXIgc2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvcmtfX3NsaWRlcicpO1xyXG5cclxuICBpZiAoc2xpZGVyICE9PSBudWxsKSB7XHJcbiAgICAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyBTbGlkZXIuaW5pdCgpO1xyXG4gICAgICBTbGlkZXIuaW5pdCgpO1xyXG4gICAgICBTbGlkZXIubW92ZSgpO1xyXG4gICAgfSkoKTtcclxuICB9XHJcblxyXG4gIC8vSEVBREVSIFBBUkFMQVggJiBTS0lMTFNcclxuICB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX19iZycpLFxyXG4gICAgc2tpbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNraWxsJyksXHJcbiAgICBibG9nV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ibG9nLWNvbnRhaW5lcicpO1xyXG5cclxuICAvLyDQktCr0JfQntCSINCk0KPQndCa0KbQmNCvINCf0J4g0KHQmtCg0J7Qm9Cb0KMg0KHQotCg0JDQndCY0KbQq1xyXG4gIHdpbmRvdy5vbnNjcm9sbCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgd1Njcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuXHJcbiAgICBpZiAoYmcgIT09IG51bGwpIHtcclxuICAgICAgSGVhZGVyUGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc2tpbGxzICE9PSBudWxsKSB7XHJcbiAgICAgIFNraWxscy5ncm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJsb2dXcmFwcGVyICE9PSBudWxsKSB7XHJcbiAgICAgIGlmICh3U2Nyb2xsID49IHdpbmRvdy5pbm5lckhlaWdodCkgQmxvZ01lbnUuaW5pdCgpO1xyXG4gICAgICBCbG9nTWVudS5pbml0QWN0aXZlKCk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIHZhciBzaWRlTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlbWVudS1idG4nKTtcclxuXHJcbiAgaWYgKHNpZGVNZW51ICE9PSBudWxsKSB7XHJcbiAgICBzaWRlTWVudS5vbmNsaWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBCbG9nTWVudS50b2dnbGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBCbG9nTWVudS5pbml0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgYWRtaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRtaW4tdGFic19faXRlbScpO1xyXG5cclxuICBpZiAoYWRtaW4pIHtcclxuICAgIFRhYnMuc3dpdGNoKCk7XHJcbiAgfVxyXG5cclxuXHJcbn07Il19
