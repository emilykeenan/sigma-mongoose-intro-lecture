myApp.controller('PeopleController', ['$http', function($http) {
    var self = this;
    self.people = [];
    self.newPerson = {};

    // Start app
    getData();

    // Get all people
    function getData() {
      $http.get('/person')
      .then(function(response) {
        self.people = response.data;
        console.log(self.people);
      },
      function(response) {
        console.log('get error:', response);
      })
      ;
    }

    // add person
    self.addPerson = function() {
      console.log('add person', self.newPerson);
      $http.post('/person', self.newPerson)
        .then(function(response) {
          // getData();
          self.people.push(response.data);
          console.log(response);
        },
        function(response) {
          console.log('post error:', response);
        }
      );
    };

    // delete person
    self.deletePerson = function(id) {
      console.log('delete person');
      $http.delete('/person/' + id)
        .then(function(response) {
          getData();
        },
        function(response) {
          console.log('delete error:', response);
        }
      );
    }

    // update person
    self.updatePerson = function(person) {
      console.log('update person');
      var id = person._id;
      // var niceness = person.nicenessLevel
      // var data = {location: 'NOT Minneapolis'};
      $http.put('/person/' + id, person)
        .then(function(response) {
          getData();
        },
        function(response) {
          console.log('update error:', response);
        }
      );
    }

}]);
