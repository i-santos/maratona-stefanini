(function () {
  "use strict";

  angular
    .module("app", [])
    .controller("TodoListController", todoListController);

  function todoListController() {
    var vm = this;

    vm.todos = [{ text: "Teste", done: false }];
    vm.newTodo = "";

    vm.add = add;
    vm.toggle = toggle;

    function add(text) {
      if (text) {
        vm.todos.push({
          text,
          done: false,
        });
      }
    }

    function toggle(todo) {
      todo.done = !todo.done;
    }
  }
})();
