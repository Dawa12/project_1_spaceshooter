$(function() {
  console.log('dom loaded');

  if ($('body').is('.gamePage')) {
    var $spaceShip = $('#spaceShip');

// set all global variables to local
    $gun = $('#gun');
    $gun.offset({top: 600});
    $bullet = $('.bullet');
    $bulletInitialPosition = $('.bullet').offset().top;

    // Asteroid coordination
    var $asteroid = $('.asteroid');
    var isMovingRight = true;
    var $leftBorder = 0;
    var $rightBorder = window.innerWidth - 50;
    var $asteroidPosition = $asteroid.css('left');

    var interval = setInterval(moveAsteroid, 50);
    var intervalRunning = true;

    // y-axis collision
// set all global variables to local
    asteroidHeightBeginning = $asteroid.offset().top;
    asteroidHeightEnd = $asteroid.offset().top + $asteroid.outerHeight();
    bulletHeightBoundary = $bullet.eq(0).offset().top + $bullet.eq(0).outerHeight();
    bulletHeightBeginning = $bullet.eq(0).offset().top;

    // x-axis collision
    asteroidWidthBeginning = $asteroid.offset().left;
    asteroidWidthEnd = asteroidWidthBeginning + $asteroid.outerWidth();
    bulletWidthBoundary = $bullet.eq(-1).offset().left + $bullet.eq(-1).outerWidth();
  };

// <<<<------------------- Functions ------------------->>>>

  function isCollision(asteroid, bullet) {
    if (asteroidWidthBeginning < bulletWidthBoundary && bulletWidthBoundary < asteroidWidthEnd && asteroidHeightEnd >= bulletHeightBoundary && bulletHeightBoundary > asteroidHeightBeginning) {
      return true;
    }
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
    isCollision($asteroid, $bullet.eq(0));
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
  // if hit, remove both asteroid and bullet


  function initialShot() {
    console.log('shooting resting bullet');

    $bullet = $('.bullet');
    $('.resting').toggleClass('resting fired');
    setInterval(shootBullet, 500);

    nextBullet();
    setInterval(destroyBullet, 100);
  }


  function shootBullet() {
    console.log('Shoot bullet animation');

    var $firedBullet = $('.fired');
    $firedBullet.animate({top: '-=25px'}, 50, 'linear');
  }

  function nextBullet() {
    console.log('next bullet begin loaded');
    $bullet = $('.bullet').add($('<div class=\'bullet resting\'>'));
    $('#gun').append($bullet);
  }

  function destroyBullet() {
    var $firedBullet = $('.fired');

    if ($firedBullet.length == 0) {
      return;
    } else if ($firedBullet.offset().top < 200 || isCollision($asteroid, $bullet)) {
        $firedBullet.remove();
        console.log('destroyed bullet!!');
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
        return initialShot();

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


    function changeInterval() {
      // fails after 2 changes even though interval Running does change accurately. Set Interval should be inside a function?

      console.log('before execution intervalRunning is: ' + intervalRunning);
      intervalRunning ? clearInterval(interval) : setInterval(moveAsteroid, 50);
      intervalRunning = !intervalRunning;
    }
});






//
