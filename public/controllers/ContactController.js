var app = angular.module('contactApp', []);

function ContactController($scope, $http) {
  var refresh = function () {
    $http.get('/contactlist')
      .success(function (response) {
        console.log('got data I requested');
        $scope.contactlist = response;
      });
  };

  var clear = function () {
    $scope.contact = null;
  };

  refresh();

  $scope.addContact = function () {
    console.log($scope.contact);
    $http.post('/contactlist', $scope.contact)
      .success(function (response) {
        console.log(response);
        refresh();
        clear();
      });
  };

  $scope.removeContact = function (id) {
    console.log(id);
    $http.delete('/contactlist/' + id)
      .success(function (response) {
        console.log('delete response' + response);
        refresh();
      });
  };

  $scope.editContact = function (id) {
    $http.get('/contactlist/' + id)
      .success(function (response) {
        $scope.contact = response;
      });
  };

  $scope.updateContact = function () {
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact)
      .success(function (response) {
        refresh();
        clear();
      });
  };
}

app.controller('ContactController', ContactController);
