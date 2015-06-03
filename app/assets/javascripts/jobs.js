(function(){
  var app = angular.module("Barterist", []);

  app.controller("JobsController", ['$http', function($http) {

    // Store the value of "this" into a variable so it can be used in the $http.get function
    var thisVar = this;

    thisVar.jobs = [];
    // This variable will contain the job selected via this.selectJob function
    thisVar.selectedJobObject = {};

    $http.get('/jobs.json').success(function(data){
      thisVar.jobs = data;
      // Set the default job object
      thisVar.selectedJobObject = thisVar.jobs[0];
    }). // Success function
    error(function(data){
      console.log("Could not retreive JSON data!");
    });

    // Select the job via index number from the array
    this.selectJob = function(jobNumber) {
      thisVar.selectedJobObject = thisVar.jobs[jobNumber];
    };

    // A tester that checks if the inputted number is the currently selected job
    this.isSelected = function(jobNumber) {
      return this.selectJob === jobNumber;
    };

  }]); // Controller

  app.controller("ReceiverController", function() {

    this.checkpoint = "hello world";

  });

})();