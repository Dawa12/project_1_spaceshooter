$(function() {
  console.log('dom loaded');

  if ($('body').is('.gamePage')) {

    var $spaceShip = $('#spaceShip');
    $gun = $('#gun');
    $gun.offset({top: 600});
    $bullet = $('.bullet');

    // Asteroid coordination
    var $asteroid = $('.asteroid');
    var isMovingRight = true;
    var $leftBorder = 0;
    var $rightBorder = window.innerWidth - 50;
    var $asteroidPosition = $asteroid.css('left');

    var interval = setInterval(moveAsteroid, 50);
    var intervalRunning = true;

// debugger
  };

// <<<<------------------- Functions ------------------->>>>

  // offset().top + outerHeight

  function isCollision(asteroid, bullet) {
    asteroidHeightBoundary = asteroid.offset().top + asteroid.outerHeight();
    bulletHeightBoundary = bullet.offset().top + bullet.outerHeight();

    asteroidWidthBoundary = asteroid.offset().left + asteroid.outerWidth();
    bulletWidthBoundary = bullet.offset().left + bullet.outerWidth();
// collision()

  if (asteroidHeightBoundary >= bulletHeightBoundary) {
    debugger
  }

    asteroidHeightBoundary >= bulletHeightBoundary ? console.log('COLLISSIOINONONO') : console.log('no collision');

  }

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
    isCollision($asteroid, $bullet);
    if (isCorner()) changeDirections();

    if (isMovingRight) {
      $asteroid.css("left", "+=10px");
      $asteroidPosition = $asteroid.css("left");
    } else {
      $asteroid.css("left", "-=10px");
      $asteroidPosition = $asteroid.css("left");
    }
  }


// asteroid and bullet disapper upon getting hit by bullet
  /* asteroid offset to find position always
    - find offset at top specifically
  - before each asteroid move - detect if it's been hit by bullet
  - if hit, remove both asteroid and bullet
  -


  */


  function changeInterval() {
    // fails after 2 changes even though interval Running does change accurately. Set Interval should be inside a function?

    console.log('before execution intervalRunning is: ' + intervalRunning);
    intervalRunning ? clearInterval(interval) : setInterval(moveAsteroid, 50);
    intervalRunning = !intervalRunning;
  }

  function shoot() {
    $bullet = $('.bullet');
    setInterval(shootBullet, 100);

    function shootBullet() {
      $bullet.animate({top: '-=25px'}, 50, 'linear');
    }
    console.log('shooting!');


    console.log('loading next bullet');
    nextBullet();

    console.log('starting destroy bullet interval');
    setInterval(destroyBullet, 10);

// debugger
    console.log('bullet count:' + $bullet.length);
  }

  function nextBullet() {
    $bullet = $bullet.add($('<div>').addClass('bullet'));
// debugger
    $('#gun').append($bullet);
  }

  function destroyBullet() {
    if ($bullet.eq(0).offset().top < 200) {
      var first = $bullet.eq(0);
      $bullet.remove(first);

// how to remove an element from arry in jquery?

// debugger
    }
  }















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
      case 32:
        return shoot();

      // logic to start / stop interval upon hitting 'k'
      case 75:
        return changeInterval();
    }
  });

  function leftMove() {
    if ($spaceShip.offset().left >= 15) {
      $spaceShip.animate({left: '-=25px'}, 50, 'linear');
      console.log('moved left');
    }
// debuggers
  }

  function rightMove() {
    if ($spaceShip.offset().left <= 645) {
      $spaceShip.animate({left: '+=25px'}, 50, 'linear');
      console.log('moved right');
    }
  }

  function upMove() {
    if ($spaceShip.offset().top >= 330) {
      $spaceShip.animate({top: '-=25px'}, 50, 'linear');
      console.log('moved up');
    }
  }

  function downMove() {
    if ($spaceShip.offset().top <= 560) {
      $spaceShip.animate({top: '+=25px'}, 50, 'linear');
      console.log('moved down');
      console.log($spaceShip.offset().top);
    }
  }
});






//
