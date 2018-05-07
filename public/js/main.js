$(function () {
  $('.del').click(
    function (e) {
      var target = $(e.target)
      var id = target.data('id')
      var tr = $('item-id-' + id)
      // var table = $('.table')

      $.ajax({
        type: 'delete',
        url: '/admin/movie?id=' + id
      })
        .done(function (results) {
          if (results.success === 1) {
            tr.remove()
            // table.load(location.href + " table") // 局部刷新，不过刷新完后页面排版会错误

            location.reload()
          }
        })
    })
})