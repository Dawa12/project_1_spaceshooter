$(function() {
  console.log('dom loaded');

  if ($('body').is('.gamePage')) {
    var $spaceShip = $('#spaceShip');

// set all global variables to local
    var $gun = $('#gun');
    $gun.offset({top: 600});
    var $bullet = $('.bullet');

    // Asteroid coordination
    var $asteroid = $('.asteroid');
    var isMovingRight = true;
    var $leftBorder = 0;
    var $rightBorder = window.innerWidth - 50;

    var interval = setInterval(moveAsteroid, 50);
    // var intervalRunning = true;
    // setInterval(shootBullet, 50);
    // setInterval(destroyBullet, 1);
    // setInterval(isCollision, 10);
  };

// <<<<------------------- Functions ------------------->>>>

  function createAsteroidObjects() {
    $arrayOfAsteroids = [];

    for (var i = 0; i < $asteroid.length; i++) {
      $arrayOfAsteroids.push({'element': $asteroid[i]})
      // $arrayOfAsteroids[1].position = 333;
      // $arrayOfAsteroids[i].isMovingRight = true;
    }

    return $arrayOfAsteroids;
  }

  function calculateAsteroidPosition() {
    var $asteroidsArray = createAsteroidObjects();
    var $asteroid = $('.asteroid');

    for (var i = 0; i < $asteroidsArray.length; i++) {
      $asteroidsArray[i].leftPosition = $asteroid.eq(i).offset().left;
    }
    return $asteroidsArray;
  }

    function isCorner() {
      // using parseFloat to remove 'px' from $asteroidPosition for comparison with borders
      var $asteroidPosition = calculateAsteroidPosition();

  // view asteroid positions
      // console.log($asteroidPosition);

      for (var i = 0; i < $asteroidPosition.length; i++) {
        if (parseFloat($asteroidPosition[i]) > $rightBorder || parseFloat($asteroidPosition[i]) <= $leftBorder) {
          // return debugger if true - see which asteorid hits corner
          // debugger
          return true;
        }
      }

     return false;
    }

    function changeDirections() {
      // update boolean value to signal change in direction of asteroid()
      isMovingRight = !isMovingRight;
    }

    function moveAsteroid() {
      var $firedBullet = $('.fired');

      if (isCorner()) changeDirections();
      $asteroid = $('.asteroid');
      for (var i = 0; i < $asteroid.length; i++) {
        if (isMovingRight) {
          $asteroid.eq(i).css("left", "+=10px");
          console.log('moving right');
        } else {
          $asteroid.eq(i).css("left", "-=10px");
          console.log('moving left');
        }
      }
    }






  function removeAsteroid() {
    $asteroid = $('.asteroid');
    $asteroid.remove();
    console.log('collision destroyed asteroid');
  }

  function isCollision() {
    var $fired = $('.fired');

    // asteroid height + width properties
    var asteroidHeightBeginning = $asteroid.offset().top;
    var asteroidHeightEnd = $asteroid.offset().top + $asteroid.outerHeight(true);
    var asteroidWidthBeginning = $asteroid.offset().left;
    var asteroidWidthEnd = asteroidWidthBeginning + $asteroid.outerWidth(true);

    // nested if condition to prevent error of calling .first on empty $fired array, if all fired bullets were distroyed
    if ($fired.length != 0) {
      var bulletHeightBoundary = $fired.first().offset().top + $fired.first().outerHeight();
      var bulletHeightBeginning = $fired.first().offset().top;
      var bulletWidthBoundary = $fired.first().offset().left + $fired.first().outerWidth();

      // asteroid + bullet collision logic
      if (asteroidWidthBeginning < bulletWidthBoundary && bulletWidthBoundary < asteroidWidthEnd && asteroidHeightEnd >= bulletHeightBoundary && bulletHeightBoundary > asteroidHeightBeginning) {
        console.log('collision OCCURRED');
        removeAsteroid();
        return true;
      }
    }
  }



// asteroid and bullet disapper upon getting hit by bullet
  // if hit, remove both asteroid and bullet
  function initialShot() {
    console.log('shooting resting bullet');
    var $bulletInitialTop = $('.bullet').offset().top;
    var $bulletInitialLeft = $('.bullet').offset().left;

    $('.resting').toggleClass('resting fired');

    // detach bullet from gun and move to the body so bullet won't move with spaceship when it goes sideways
    $('body').append($('.fired').first());

    $('.fired').last().css({'top': $bulletInitialTop, 'left': $bulletInitialLeft});

    if ($('.resting').length == 0) nextBullet();
  }

  function shootBullet() {
    console.log('Shoot bullet animation');
    var $firedBullet = $('.fired');

    $firedBullet.animate({top: '-=25px'}, 50, 'linear');
  }

  function nextBullet() {
    console.log('next bullet begin created in DOM');
    $('#gun').append($('<div class=\'bullet resting\'>'));
  }

  function destroyBullet() {
    var $firedBullet = $('.fired');
    if ($firedBullet.length == 0) {
      return;
    } else if ($firedBullet.first().offset().top < 150 || isCollision()) {
        $firedBullet.first().remove();
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
