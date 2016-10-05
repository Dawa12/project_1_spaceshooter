$(function() {
  console.log('dom loaded');

  var $asteroid = $('.asteroid');
  var direction = true;
  var $leftBorder = $asteroid.position().left;
  // debugger
  var $rightBorder = window.innerWidth - 50;

  if ($('body').is('.gamePage')) setInterval(moveAsteroid, 1);

// <<<<------------------- Functions ------------------->>>>
  function moveAsteroid() {
// debugger

    if (direction) {
      $asteroid.css("left", "+=1px");
    } else {
      $asteroid.css("left", "-=1px");
    }

    isCorner();
  }

  function isCorner() {
    // find position of asteroid in number (not pixels) to compare with window.innerWidth
    var $asteroidPosition = $asteroid.css('left').match(/[0-9]+/);
    if ($asteroidPosition >= $rightBorder || $asteroidPosition <= $leftBorder) {
      // update boolean value to signal change in direction in moveAsteroid()
      direction = !direction;
      console.log('CHANGING DIRECTIONS!');
    }
  }
});





















//
