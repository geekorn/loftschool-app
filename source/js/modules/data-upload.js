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
    let resultContainer = document.querySelector('.error');
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

})();