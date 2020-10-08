(function() {
    "use strict";

    angular
        .module('app', [])
        .controller('ContadorController', contadorController);

        function contadorController(){
            var vm = this;

            vm.count = 0;

            vm.add = add;
            vm.decrease = decrease;

            function add() {
                vm.count++;
            }

            function decrease() {
                vm.count--;
            }

        }
} ());