$(function() {
  console.log('dom loaded');
  var $asteroid = $('.asteroid');
  // setInterval(moveAsteroid, 300);

// Functions ------------------->>>>
  function moveAsteroid() {

    $asteroid.css({
      "position": "absolute",
      "left": "+=30px",
    })

    isCorner();
    // console.log('just moved!');
  }

  function isCorner() {
    if ($asteroid.css('left') >= window.innerWidth) {
      $asteroid.css('left', '0');
      console.log('STOPPPED');
    }

    console.log('isCorner called!  left:', $asteroid.css('left'));
      // else if ()
  }
});





















//
