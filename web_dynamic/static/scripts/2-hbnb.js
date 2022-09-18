$(document).ready(function() {
  const amenityDict = {};
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(':checked')) {
      amenityDict[$(this).data('id')] = $(this).data('name');
      $('div.amenities h4').text(Object.values(amenityDict).join(', '));
    } else if ($(this).is(':not(:checked)')) {
      delete amenityDict[$(this).data('id')];
      $('div.amenities h4').text(Object.values(amenityDict).join(', '));
    }
    console.log(amenityDict);
  });
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    alert(data.status)
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
