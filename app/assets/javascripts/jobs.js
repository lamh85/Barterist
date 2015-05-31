var app = angular.module("Barterist", []);

app.controller("JobsController", ['$http', function($http) {

  var jobsList = this;
  jobsList.jobs = [];

  $http.get('/jobs.json').success(function(data){
    jobsList.jobs = data;
  }). // Success function
  error(function(data){
    console.log("Could not retreive JSON data!");
  });

}]); // Controller

// $(document).ready(function() {
//   $('#container').html(app.JobsController);
// });

var foo = "hello world";