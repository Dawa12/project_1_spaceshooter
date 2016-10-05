$(function() {
  console.log('dom loaded');

  if ($('body').is('.gamePage')) {
    var $spaceShip = $('#spaceShip');
    var $asteroid = $('.asteroid');

    // Asteroid coordination
    var direction = true;
    var $leftBorder = 0;
    var $rightBorder = window.innerWidth - 50;
    // find position of asteroid in number (not pixels) to compare with window.innerWidth
    var $asteroidPosition = $asteroid.css('left').match(/[0-9]+/);

    // setInterval(moveAsteroid, 1);
  };

// <<<<------------------- Functions ------------------->>>>

function isCorner() {
// debugger
 // || $asteroidPosition <= $leftBorder

  // if ($asteroidPosition > $rightBorder) {
    if (parseInt($asteroidPosition[0]) > $rightBorder) {
// debugger
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
// debugger
    if (direction) {
      $asteroid.css("left", "+=1px");
    } else {
      $asteroid.css("left", "-=1px");
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
