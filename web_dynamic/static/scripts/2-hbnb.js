$(document).ready(function () {
  const amenityId = {};
  $('input[type=checkbox]').change(function () {
    if ($(this).prop('checked')) {
      amenityId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityId[$(this).attr('data-id')];
    }
    if (amenityId.length === 0) {
      $('div.amenities h4').html('&nbsp;');
    } else {
      $('div.amenities h4').text(Object.values(amenityId).join(', '));
    }
  });
});
$.get('http://localhost:5001/api/v1/status/', function (data) {
  alert(data.status)
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});
