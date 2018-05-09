$(function () {
  $('.del').click(
    function (e) {
      var target = $(e.target)
      var id = target.data('id')
      var tr = $('item-id-' + id)
      $.ajax({
        type: 'delete',
        url: '/admin/movie?id=' + id
      })
        .done(function (results) {
          if (results.success === 1) {
            tr.remove()
            location.reload()
          }
        })
    })
})