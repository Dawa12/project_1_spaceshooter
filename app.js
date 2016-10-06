$(function() {
  console.log('dom loaded');

  if ($('body').is('.gamePage')) {
    var $spaceShip = $('#spaceShip');
    var $asteroid = $('.asteroid');

    // Asteroid coordination
    var direction = true;
    var $leftBorder = 0;
    var $rightBorder = window.innerWidth - 50;
    var $asteroidPosition = $asteroid.css('left');
    setInterval(moveAsteroid, 50);
  };

// <<<<------------------- Functions ------------------->>>>

  function isCorner() {
    // using parseFloat to remove 'px' from $asteroidPosition for comparison with borders
      if (parseFloat($asteroidPosition) > $rightBorder || parseFloat($asteroidPosition) <= $leftBorder) {
        console.log('TRUE! corner');
        return true;
      } else {
        console.log('FALSE! corner');
        return false;
      }
  }

  function changeDirections() {
    // update boolean value to signal change in direction in moveAsteroid()
    direction = !direction;
    console.log('CHANGING DIRECTIONS!');
  }

  function moveAsteroid() {
    if (direction) {
      $asteroid.css("left", "+=10px");
      $asteroidPosition = $asteroid.css("left");
    } else {
      $asteroid.css("left", "-=10px");
      $asteroidPosition = $asteroid.css("left");
  console.log($asteroidPosition);
    }

    if (isCorner()) {
      console.log('is corner!');
      changeDirections();
    }
  }

// edge detection to prevent movement when spaceship hits edges











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
