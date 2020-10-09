(function (angular) {
  "use strict";

  const FPS = 60;
  const TICK_PERIOD = Math.round(1000 / FPS);
  const KEYBOARD = {
    1: [""],
    2: ["a", "b", "c", "2"],
    3: ["d", "e", "f", "3"],
    4: ["g", "h", "i", "4"],
    5: ["j", "k", "l", "5"],
    6: ["m", "n", "o", "6"],
    7: ["p", "q", "r", "s", "7"],
    8: ["t", "u", "v", "8"],
    9: ["w", "x", "y", "z", "9"],
    0: [" ", "0"],
    "*": ["+", "*"],
    "#": ["SHIFT", "#"],
    PROMPT: [""],
  };
  const MODIFIERS = {
    "SHIFT": {

    }
  }

  const PhoneState = {
    INIT_DISPLAY: "INIT_DISPLAY",
    CURRENT_CHAR: "CURRENT_CHAR",
    NEXT_CHAR: "NEXT_CHAR",
  };

  angular.module("app", []);

  angular.module("app").controller("PhoneController", PhoneController);

  PhoneController.$inject = ["$scope"];

  function PhoneController($scope) {
    /**
     * State (variables)
     */
    $scope.display = "";
    $scope.currentChar = "";
    $scope.currentBtn = -1;
    $scope.nClicks = 0;
    $scope.nextCharTimeout = null;
    $scope.nextCharTimeoutMs = 1000;
    $scope.nextCharTimeoutAnimation = null;
    $scope.nextCharTimeoutAnimationPercentage = 0;
    $scope.nav = {
      up: false,
      upRight: false,
      right: false,
      downRight: false,
      down: false,
      downLeft: false,
      left: false,
    };
    $scope.navClass = {};

    /**
     * Functions Declarations
     */
    $scope.release = release;
    $scope.keyboardClick = onKeyboardClick;
    $scope.$watch("nav", watchNav, true);

    /**
     * Functions Implementations
     */

    // clean nav state when button is released
    function release() {
      $scope.nav = {
        up: false,
        upRight: false,
        right: false,
        downRight: false,
        down: false,
        downLeft: false,
        left: false,
      };
    }

    function watchNav(newValue) {
      var navClass = {
        "up-active": newValue.up,
        "up-right-active": newValue.upRight,
        "right-active": newValue.right,
        "down-right-active": newValue.downRight,
        "down-active": newValue.down,
        "down-left-active": newValue.downLeft,
        "left-active": newValue.left,
        "up-left-active": newValue.upLeft,
      };

      $scope.navClass = navClass;
    }

    function onKeyboardClick(btn) {
      if ($scope.currentBtn !== btn) {
        startNextChar(btn);
      } else {
        updateCurrentChar(btn);
      }

      waitUntilNextChar();
      $scope.nClicks++;
      $scope.currentBtn = btn;
    }

    function waitUntilNextChar() {
      restartTimeout();
      restartAnimation();
    }

    function restartTimeout() {
      const wait = $scope.nextCharTimeoutMs;
      clearTimeout($scope.nextCharTimeout);
      $scope.nextCharTimeout = null;
      $scope.nextCharTimeout = setTimeout(goToNextChar, wait);
    }

    function goToNextChar() {
      startNextChar("PROMPT");
    }

    function startNextChar(btn) {
      $scope.display += $scope.currentChar;
      $scope.nClicks = 0;
      $scope.currentBtn = -1;
      updateCurrentChar(btn);
    }

    function updateCurrentChar(btn) {
      const chars = KEYBOARD[btn];
      const charPosition = $scope.nClicks % chars.length;
      const currentChar = chars[charPosition];
      $scope.currentChar = processChar(currentChar);
    }

    function processChar(char) {
      return char;
    }

    function restartAnimation() {
      $scope.nextCharTimeoutAnimationPercentage = 0;
      clearInterval($scope.nextCharTimeoutAnimation);
      $scope.nextCharTimeoutAnimation = null;
      $scope.nextCharTimeoutAnimation = setInterval(tickAnimation, TICK_PERIOD);
    }

    function tickAnimation() {
      const total = $scope.nextCharTimeoutMs;
      const step = total / TICK_PERIOD;
      let percentage = $scope.nextCharTimeoutAnimationPercentage + 1 / step;

      if (percentage >= 1) {
        percentage = 1;
        clearInterval($scope.nextCharTimeoutAnimation);
      }

      $scope.nextCharTimeoutAnimationPercentage = percentage;
    }
  }
})(angular);
