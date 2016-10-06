$(function() {
  console.log('dom loaded');

  if ($('body').is('.gamePage')) {

    var $spaceShip = $('#spaceShip');
    $gun = $('#gun');

    // Asteroid coordination
    var $asteroid = $('.asteroid');
    var isMovingRight = true;
    var $leftBorder = 0;
    var $rightBorder = window.innerWidth - 50;
    var $asteroidPosition = $asteroid.css('left');

    setInterval(moveAsteroid, 50);
  };

// <<<<------------------- Functions ------------------->>>>




  $gun.offset({top: 600});

  debugger

  function isCorner() {
    // using parseFloat to remove 'px' from $asteroidPosition for comparison with borders
      if (parseFloat($asteroidPosition) > $rightBorder || parseFloat($asteroidPosition) <= $leftBorder) {
        return true;
      } else {
        return false;
      }
  }

  function changeDirections() {
    // update boolean value to signal change in direction in moveAsteroid()
    isMovingRight = !isMovingRight;
  }

  function moveAsteroid() {
    if (isCorner()) changeDirections();

    if (isMovingRight) {
      $asteroid.css("left", "+=10px");
      $asteroidPosition = $asteroid.css("left");
    } else {
      $asteroid.css("left", "-=10px");
      $asteroidPosition = $asteroid.css("left");
    }
  }


// shoot smaller divs from spaceship
  // find top position / location of spaceship
  // have bullet appear from spaceship towards asteroid. Bullet partially hidden under spaceship - use z index to have asteroid over bullet
// bullets should move towards top
// asteroid disappers upon getting hit by bullet
// prevent spaceship from moving outside edges


// move spaceship commands
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











// Goals
// recode using OOP






//
