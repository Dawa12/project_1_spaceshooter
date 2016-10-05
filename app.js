$(function() {
  console.log('dom loaded');

  var $spaceShip = $('#spaceShip');
  var $asteroid = $('.asteroid');
  var direction = true;
  var $leftBorder = $asteroid.position().left;
  // debugger
  var $rightBorder = window.innerWidth - 50;

  // if ($('body').is('.gamePage')) setInterval(moveAsteroid, 1);

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

// use switch case to register up / down left right key movements
// edge detection to prevent movement when spaceship hits edges

  $('body').on('keydown', function(e) {
    switch (e.which) {
      case 37:
        return leftMove();
      case 39:
        return rightMove();
      case 38:
        return upMove();
      case 40:
        return downMove();
    }
  });

  function leftMove() {
    $spaceShip.animate({left: '-=25px'}, 50, 'linear');
    console.log('moved left');
  }

  function rightMove() {
    $spaceShip.animate({left: '+=25px'}, 50, 'linear');
    console.log('moved right');
  }

  function upMove() {
    $spaceShip.animate({top: '-=25px'}, 50, 'linear');
    console.log('moved up');
  }

  function downMove() {
    $spaceShip.animate({top: '+=25px'}, 50, 'linear');
    console.log('moved down');
  }
});






















//
