$(function() {
  console.log('dom loaded');

  if ($('body').is('.gamePage')) {
    // Asteroid coordination
    var $asteroid = $('.asteroid');

    var $spaceShip = $('#spaceShip');
    // $gun.offset({top: 600});
    var $gun = $('#gun');

    var $leftBorder = 0;
    var $rightBorder = window.innerWidth - 50;
    var isMovingRight = true;

    // var interval = setInterval(moveAsteroid, 50);
  };


  class Asteroid {
    constructor() {
      this.isMovingRight = true;
      this.position;
    }
  }

// debugger

    function calculateAsteroidPosition() {
      for (var i = 0; i < $asteroid.length; i++) {
        $asteroid[i] = new Asteroid;
        $asteroid[i].position = $asteroid.eq(i).offset().left;
      }
      // return $asteroid.filter(function(key){return key == 'position'});
    }



debugger





//
//
//   function moveAsteroid() {
//     var $firedBullet = $('.fired');
//     if (isCorner()) changeDirections();
//
//     $asteroid = $('.asteroid');
//
//     for (var i = 0; i < $asteroid.length; i++) {
//       if (isMovingRight) {
//         $asteroid.eq(i).css("left", "+=10px");
//         console.log('moving right');
//       } else {
//         $asteroid.eq(i).css("left", "-=10px");
//         console.log('moving left');
//       }
//     }
//
// // asteroid should have moved by now
//   }
//
//
//
//
//   function isCorner() {
//     // using parseFloat to remove 'px' from $asteroidPosition for comparison with borders
//
//     var $asteroidPosition = calculateAsteroidPosition();
//
// // view asteroid positions
//     // debugger
//     // console.log($asteroidPosition);
//
//     for (var i = 0; i < $asteroidPosition.length; i++) {
// // debugger
//       if (parseFloat($asteroidPosition[i]) > $rightBorder || parseFloat($asteroidPosition[i]) <= $leftBorder) {
//         // return debugger if true - see which asteorid hits corner
//         return true;
//       } else {
//         return false;
//       }
//     }
//   }
//
//   function changeDirections() {
//     // update boolean value to signal change in direction of asteroid()
//     isMovingRight = !isMovingRight;
//   }



});



























//
