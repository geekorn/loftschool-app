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

    console.log(data);
    resultContainer.innerHTML = 'sending...';
    sendAjaxJson('/works', data, function (data) {
      resultContainer.innerHTML = data;
    });
  }

  //подготовка данных новой статьи
  function prepareSendPost(e) {
    e.preventDefault();
    let form = e.target;
    let resultContainer = document.querySelector('.status');

    let data = {
      title: form.title.value,
      date: form.email.value,
      text: form.text.value
    };

    resultContainer.innerHTML = 'sending...';
    sendAjaxJson('/admin', data, function (data) {
      resultContainer.innerHTML = data;
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
    post: prepareSendPost
  }

})();