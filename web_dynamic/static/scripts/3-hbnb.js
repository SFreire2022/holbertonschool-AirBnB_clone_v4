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
$.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
  if (data.status === 'OK') {
    $('#api_status').addClass('available');
  } else {
    $('#api_status').removeClass('available');
  }
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search',
  data: '{}',
  contentType: 'application/json; charset=utf-8',
  dataType: 'json',
  success: function (data) {
    placeArticle(data);
  }
});

function placeArticle (data) {
  for (const place of data) {
    $('section.places').append('<article><div class="title_box"><h2></h2><div class="price_by_night"></div></div><div class="information"><div class="max_guest"></div><div class="number_rooms"></div><div class="number_bathrooms"></div></div><div class="user"></div><div class="description"></div></article>');
    $('div.title_box h2').last().text(place.name);
    console.log(place.name);
    $('.price_by_night').last().text('$' + place.price_by_night);
    if (place.max_guest !== 1) {
      $('.max_guest').last().text(`${place.max_guest} Guests`);
    } else {
      $('.max_guest').last().text(`${place.max_guest} Guest`);
    }
    // number of Rooms
    if (place.number_rooms !== 1) {
      $('.number_rooms').last().text(`${place.number_rooms} Bedrooms`);
    } else {
      $('.number_rooms').last().text(`${place.number_rooms} Bedroom`);
    }
    // number of Bathrooms
    if (place.number_bathrooms !== 1) {
      $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathrooms`);
    } else {
      $('.number_bathrooms').last().text(`${place.number_bathrooms} Bathrooms`);
    }
    $('.user').last().text(`Owner: ${place.Owner}`);
    // place Description
    $('.description').last().html(place.description);
  }
}
