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