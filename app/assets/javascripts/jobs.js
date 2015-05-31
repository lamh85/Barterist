var app = angular.module("JobsIndex", []);

app.controller("JobsController", ['$http', function($http) 
  $http.get('/jobs.json').success(function(data){

  }) // Success function

}]); // Controller

// $(document).ready(function() {
//   $('#container').html(app.JobsController);
// });

var foo = "hello world";