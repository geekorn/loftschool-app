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