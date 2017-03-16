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