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

  // The default job selected
  this.selectedJob = 0;

  this.testObject = this.jobs[this.selectedJob];

  // Find the job of above index
  this.selectedJobObject = this.jobs[this.selectedJob];

  // Select the job via index number from the array
  this.selectJob = function(jobNumber) {
    this.selectedJob = jobNumber;
  };

  // A tester that checks if the inputted number is the currently selected job
  this.isSelected = function(jobNumber) {
    return this.selectJob === jobNumber;
  };

}]); // Controller


// $(document).ready(function() {
//   $('#container').html(app.JobsController);
// });

var bar = "hello world";