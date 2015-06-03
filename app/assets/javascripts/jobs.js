var helloJobsJS = "hello";

(function(){

  var app = angular.module("Barterist", []);

  app.controller("JobsController", ['$http', function($http) {

    // Store the value of "this" into a variable so it can be used in the $http.get function
    var thisVar = this;

    thisVar.jobs = [];
    // This variable will contain the job selected via this.selectJob function
    thisVar.selectedJobObject = {};

    // Select the job via index number from the array
    $http.get('/jobs.json').success(function(data){
      thisVar.jobs = data;
      // Set the default job object
      thisVar.selectedJobObject = thisVar.jobs[0];
      $('.hidden-field').attr('value', thisVar.selectedJobObject.id);
    }). // Success function
    error(function(data){
      console.log("Could not retreive JSON data!");
    });

    this.selectJob = function(jobIndex) {
      thisVar.selectedJobObject = thisVar.jobs[jobIndex];
      $('.hidden-field').attr('value', thisVar.selectedJobObject.id);
    };

    // A tester that checks if the inputted number is the currently selected job
    this.isSelected = function(jobIndex) {
      return this.selectJob === jobIndex;
    };

  }]); // Controller

  app.controller("ReceiverController", function() {

    this.checkpoint = "hello world";

  });

})();