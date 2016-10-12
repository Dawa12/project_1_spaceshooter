
class Asteroid {
  constructor(element, i) {
    this.element = element;
    this.isMovingRight = true;
    this.leftPosition = 50 + i * 150;
  }

  reverseDirection() {
    this.isMovingRight = !this.isMovingRight;
  }

  step() {
    console.log(this);

    if (this.isMovingRight) {
      this.leftPosition += 10;
      this.element.css('left', this.leftPosition + 'px');
      console.log(this.leftPosition + 'px');
    } else {
      this.element.css("left", "-=10px");
      this.leftPosition -= 10;
    }
  }
}

$(function() {
  console.log('dom loaded');

  if ($('body').is('.gamePage')) {
    insertPlayerName();
    var $spaceShip = $('#spaceShip');

    // preparing gun / bullet elements for spaceship
    var $gun = $('#gun');
    $gun.offset({top: 650});
    var $bullet = $('.bullet');

    // Asteroid coordination
    var $asteroid = $('.asteroid');
    spaceTheAsteroids();
    var isMovingRight = true;
    var $leftBorder = 0;
    var $rightBorder = window.innerWidth - 50;
    var $asteroidsArray = createAsteroidObjects();


    setInterval(moveAsteroid, 50);
    // setInterval(shootBullet, 50);
    // setInterval(destroyBullet, 10);
    // setInterval(isCollision, 10);

  };

// <<<<------------------- Functions ------------------->>>>

  function getPlayerName() {
    var first = window.location.search.split('=')[1].split('+')[0];
    var last = window.location.search.split('=')[1].split('+')[1];
    var full = last ? first + " " + last : first;
    return full;
  }

  function insertPlayerName() {
    $('#insertName').text(getPlayerName());
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
      $arrayOfAsteroids.push(new Asteroid($('.asteroid').eq(i), i));
    }
    return $arrayOfAsteroids;
  }

  function calculateAsteroidPosition() {
    // cannot create a new $asteroid but need to get existing positions therefore must not operate offset on $asteroid but directly on $('.asteroid')
    for (var i = 0; i < $asteroidsArray.length; i++) {
      // $asteroidsArray[i].leftPosition = $('.asteroid').eq(i).offset().left;
    }
    return $asteroidsArray;
  }

  function isCorner() {
    // using parseFloat to remove 'px' from $asteroidPosition for comparison with borders
    calculateAsteroidPosition();
    for (var i = 0; i < $asteroidsArray.length; i++) {
      if (parseFloat($asteroidsArray[i].leftPosition) > $rightBorder || parseFloat($asteroidsArray[i].leftPosition) < $leftBorder) {
        console.log('hi')
          $asteroidsArray[i].reverseDirection();
      }
    }

    return $asteroidsArray;
  }

  function moveAsteroid() {
    var $firedBullet = $('.fired');

    // calculate new isCorner() to update asteroidsArray position value
    isCorner();

    for (var i = 0; i < $asteroidsArray.length; i++) {
      $asteroidsArray[i].step();
    }
  }

  function isCollision() {
    // sources for help + inspiration on collision detection logic: http://stackoverflow.com/questions/4230029/jquery-javascript-collision-detection

    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

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
          // debugger

          // incrementScore();
          $('.asteroid').eq(i).remove();
          $asteroidsArray.splice(i, 1);
          return true;
        }
      }
    }
  }

  function initialShot() {
    var $bulletInitialTop = $('.bullet').offset().top;
    var $bulletInitialLeft = $('.bullet').offset().left;

    $('.resting').toggleClass('resting fired');
    $('body').append($('.fired').first());
    $('.fired').last().css({'top': $bulletInitialTop, 'left': $bulletInitialLeft});
    if ($('.resting').length == 0) nextBullet();

    // prevent space bar key from initalizing page scroll
    return false
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
    } else if ($firedBullet.first().offset().top < 100 || isCollision()) {
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
    }
  });

  function leftMove() {
    if ($spaceShip.offset().left >= 15) {
      $spaceShip.animate({left: '-=25px'}, 50, 'linear');
      console.log('moved left');
    }

    return false
  }

  function rightMove() {
    if ($spaceShip.offset().left < window.innerWidth-150) {
      $spaceShip.animate({left: '+=25px'}, 50, 'linear');
      console.log('moved right');
    }

    return false
  }

  function upMove() {
    if ($spaceShip.offset().top >= 330) {
      $spaceShip.animate({top: '-=25px'}, 50, 'linear');
      console.log('moved up');
    }

    return false
  }

  function downMove() {
    if ($spaceShip.offset().top < 650) {
      $spaceShip.animate({top: '+=25px'}, 50, 'linear');
      console.log('moved down');
      console.log($spaceShip.offset().top);
    }

    return false
  }
});
