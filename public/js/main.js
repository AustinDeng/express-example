$(function () {
  $('.del').click(
    function (e) {
      var target = $(e.target)
      var id = target.data('id')
      var tr = $('item-id-' + id)
      $.ajax({
        type: 'delete',
        url: '/admin/movie/delete?id=' + id
      })
        .done(function (results) {
          if (results.success === 1) {
            tr.remove()
            location.reload()
          }
        })
    })

  $('#douban').blur(function () {
    var douban = $(this)
    var id = douban.val()

    if (id) {
      $.ajax({
        url: 'https://api.douban.com/v2/movie/' + id,
        cache: true,
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'callback',
        success: function (data) {
          $('#inputTitle').val(data.title)
          $('#inputDirector').val(data.attrs.director[0])
          $('#inputCountry').val(data.attrs.country[0])
          $('#inputPoster').val(data.image)
          $('#inputYear').val(data.attrs.year)
          $('#inputSummary').val(data.summary)
          $('#inputLanguage').val(data.attrs.language[0])

        }
      })
    }
  })
})