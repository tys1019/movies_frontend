/*global $:false*/
'use strict';
var trace = function(){
  for(var i = 0; i < arguments.length; i++){
    console.log(arguments[i]);
  }
};

var App = App || {
  url: 'http://localhost:3000'
};


App.getReviews = function(movie){
  $.ajax({
    url: App.url + '/movies/' + movie.id + '/reviews',
    type: 'GET'
  })
  .done(function(data) {

    data.forEach(App.renderReview, movie);

    App.renderForms(movie, data);

    $('.new-review-form').hide();
    $('ul.reviews').hide();


    $('.review-button').on('click', function() {
        var id = parseInt(this.id.replace(/\D/g, ''));
        $(this).hide();
        $('#movie-review-form-' + id).show();
    });


    $('.toggle-reviews').on('click', function() {
      var id = parseInt(this.id.replace(/\D/g, ''));
      $('ul#movie-reviews-'+ id).toggle();
    });


  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

App.renderReview = function(review, index, array) {
  // // trace(review, index);
  // $('#'+ this.title.replace(/(\s)+/g, '') +' .reviews').append('<li class="review">' + '<p class="review-body">' + review.body + '</p>' + '<p class="review-rating">' + review.rating + '</p>' + '<p class="review-author">' + review.author + '</p>' +'</li>');

  $('#'+ this.title.replace(/(\s)+/g, '') +' .reviews').append('<div class="review">' + '<p class="rblock" id="review-author">' + review.author + '</p>' + '<p class="rblock-right" id="review-rating">' + review.rating + '</p><br>' + '<p class="rblock-right" id="review-body">' + review.body + '</p>' +'</div>');
};

App.renderForms = function(movie, data){
    var template = Handlebars.compile($('#review-form-template').html());
    var $form = $('<form class=new-review-form id=movie-review-form-' + movie.id + '>');

    $form.append(template(data));
    $('div#form-reviews-' + movie.id).append($form);



    $('form#movie-review-form-' + movie.id).on('submit', function(e){
      App.submitReview(e);
    });
};

App.submitReview = function(event){

  event.preventDefault();
  var id = parseInt(event.target.id.replace(/\D/g, ''));
  var $author = $('#movie-review-form-'+ id +' #review-author');
  var $body = $('#movie-review-form-'+ id +' #review-body');
  var $rating = $('#movie-review-form-'+ id + ' [type="radio"]:checked');


  $.ajax({
    url: App.url + '/movies/' + id + '/reviews',
    type: 'POST',
    data: { review: {
      author: $author.val(),
      body: $body.val(),
      rating: $rating.val()
      }
    },
  })
  .done(function(data) {
    trace(data);
    $('.review-button').show();
    var template = Handlebars.compile($('#review-template').html());
    $('ul#movie-reviews-' + id).append(template(data));
    $author.val('');
    $body.val('');
    $rating.prop('checked', false);
    $('#movie-review-form-' + id).hide();

  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    trace(jqXHR, textStatus, errorThrown);
  });
};

