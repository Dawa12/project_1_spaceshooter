$(function() {
  console.log('dom loaded');

  if ($('body').is('.gamePage')) {
    var $spaceShip = $('#spaceShip');
    insertPlayerName();

// set all global variables to local
    var $gun = $('#gun');
    $gun.offset({top: 600});
    var $bullet = $('.bullet');

    // Asteroid coordination
    var $asteroid = $('.asteroid');
    spaceTheAsteroids();
    var isMovingRight = true;
    var $leftBorder = 0;
    var $rightBorder = window.innerWidth - 50;


    // var interval = setInterval(moveAsteroid, 50);
    // var intervalRunning = true;
    // setInterval(shootBullet, 50);
    // setInterval(destroyBullet, 10);
    // setInterval(isCollision, 10);

    var $asteroidsArray = createAsteroidObjects();
  };

// <<<<------------------- Functions ------------------->>>>

  function getPlayerName() {
    var first = window.location.search.split('=')[1].split('+')[0];
    var last = window.location.search.split('=')[1].split('+')[1];
    var full = last ? first + " " + last : first;
    return full;
  }

  function insertPlayerName() {
    $('#insertName').text(getPlayerName())
  }


  function spaceTheAsteroids() {
    var increment = 0;
    for (var i = 0; i < $('.asteroid').length; i++) {
      $('.asteroid').eq(i).css('left', '+=' + increment  + 'px');
      increment += 150;
    }
  }


  function createAsteroidObjects() {
    $arrayOfAsteroids = [];
    for (var i = 0; i < $('.asteroid').length; i++) {
      $arrayOfAsteroids.push({'element': $asteroid[i], 'isMovingRight': true});
    }
    return $arrayOfAsteroids;
  }

  function calculateAsteroidPosition() {
    // var $asteroidsArray = createAsteroidObjects();
    // var $asteroid = $('.asteroid');

    // cannot create a new $asteroid but need to get existing positions therefore must not operate offset on $asteroid but directly on $('.asteroid')

    for (var i = 0; i < $('.asteroid').length; i++) {

      // if ($('.asteroid').length == 4) debugger

      $asteroidsArray[i].leftPosition = $('.asteroid').eq(i).offset().left;

// want to see if asteroidArray left position changes after element removal



      // check to see that .asteroid and asteroidsArray positions are same
      // if ($('.asteroid').length == 4) debugger;
    }
    return $asteroidsArray;
  }

    function isCorner() {
      // using parseFloat to remove 'px' from $asteroidPosition for comparison with borders

      calculateAsteroidPosition();
      // $asteroidsArray = calculateAsteroidPosition();

      for (var i = 0; i < $asteroidsArray.length; i++) {
        if (parseFloat($asteroidsArray[i].leftPosition) > $rightBorder || parseFloat($asteroidsArray[i].leftPosition) <= $leftBorder) {
            $asteroidsArray[i].isMovingRight = !$asteroidsArray[i].isMovingRight;

          // if ($asteroidsArray.length == 4) debugger
        }
      }

      return $asteroidsArray;
    }

    function moveAsteroid() {
      console.log('moving asteroid');

      var $firedBullet = $('.fired');

      // calculate new isCorner() to udpate asteroidsArray position value
      isCorner();

      for (var i = 0; i < $asteroidsArray.length; i++) {
        // if ($asteroidsArray.length == 4) debugger;
        // if ($('.asteroid').eq(i).offset().left)
        console.log(i + " " + $('.asteroid').eq(i).offset().left);
        console.log(i + " " + $asteroidsArray[i].isMovingRight);

        if ($asteroidsArray[i].isMovingRight) {
          $('.asteroid').eq(i).css("left", "+=10px");
          $asteroidsArray[i].leftPosition += 10;

          // console.log('moving right');
          // if ($asteroidsArray.length == 4) console.log($('.asteroid').eq(i).text() + ' moving right');

        } else {
          $('.asteroid').eq(i).css("left", "-=10px");
          $asteroidsArray[i].leftPosition -= 10;

          // if ($asteroidsArray.length == 4) console.log($('.asteroid').eq(i).text() + ' moving left');

        }
      }
      // if ($('.asteroid').length == 4) debugger
    }

  function isCollision() {
    // asteroid height + width properties


    for (var i = 0; i < $('.asteroid').length; i++) {
      var asteroidHeightBeginning = $('.asteroid').eq(i).offset().top;
      var asteroidHeightEnd = $('.asteroid').eq(i).offset().top + $('.asteroid').eq(i).outerHeight(true);
      var asteroidWidthBeginning = $('.asteroid').eq(i).offset().left;
      var asteroidWidthEnd = asteroidWidthBeginning + $('.asteroid').eq(i).outerWidth(true);
      // nested if condition to prevent error of calling .first on empty $fired array, if all fired bullets were distroyed
      var $fired = $('.fired');

      if ($fired.length != 0) {
        var bulletHeightBoundary = $fired.first().offset().top + $fired.first().outerHeight();
        var bulletHeightBeginning = $fired.first().offset().top;
        var bulletWidthBoundary = $fired.first().offset().left + $fired.first().outerWidth();

        // asteroid + bullet collision logic
        if (asteroidWidthBeginning < bulletWidthBoundary && bulletWidthBoundary < asteroidWidthEnd && asteroidHeightEnd >= bulletHeightBoundary && bulletHeightBoundary > asteroidHeightBeginning) {
          console.log('collision OCCURRED');
          // var hitAsteroid = findHitAsteroid();

// debugger
          console.log($('.asteroid').eq(i).text() + ' is removed');

          $('.asteroid').eq(i).remove();
// hit div of index 3 but index 4 is removed
// debugger

          $asteroidsArray.splice(i, 1);
// debugger
          return true;
        }
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
