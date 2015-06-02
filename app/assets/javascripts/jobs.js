var jobsGlobal = [];

(function(){
  var app = angular.module("Barterist", []);

  app.controller("JobsController", ['$http', function($http) {

    var jobsList = this;
    jobsList.jobs = [];

    $http.get('/jobs.json').success(function(data){
      jobsList.jobs = data;
      jobsGlobal = data;
    }). // Success function
    error(function(data){
      console.log("Could not retreive JSON data!");
    });

    console.log("jobsGlobal = " + jobsGlobal);

    // The default job selected
    this.selectedJob = 0;

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

    var fromJobs = "hello from Jobs Controller";

  }]); // Controller

  app.controller("ReceiverController", function() {

    this.checkpoint = "hello world";
    // var receiverVar = JobsController.fromJobs;

  });

})();