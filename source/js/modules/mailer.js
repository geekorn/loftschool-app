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
    let data = {};

    console.log(form);
    var inputs = form.elements;

    for (var i = 0; i < inputs.length; i++) {
      var elem = inputs[i],
        obj = {};
      if (inputs[i].tagName === 'BUTTON') continue;
      data[elem.name] = elem.value;
      // obj['percent'] = elem.value;

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

})();