var data;
var jobIndex;
// Make this variable global so it can be accessible outside of the Angular "app" variable
var JobsCtrlGetJson;

(function(){

  var app = angular.module("Barterist", []);

  app.factory("CommonFunctions", function() {
    return {
      hello: function() { console.log("hello there111");
      }
    };
  });

  app.controller("JobsController", ['$http','CommonFunctions', function($http,CommonFunctions) {

    // Store the value of "this" into a variable so it can be used in the $http.get function
    var thisVar = this;

    thisVar.jobs = [];
    // This variable will contain the job selected via this.selectJob function
    thisVar.selectedJobObject = {};

    this.selectJob = function(jobIndexInput) {
      jobIndex = jobIndexInput;
      thisVar.selectedJobObject = thisVar.jobs[jobIndexInput];
      $('.hidden-field').attr('value', thisVar.selectedJobObject.id);
    };

    JobsCtrlGetJson = function(jobIndexInput){
      // Select the job via index number from the array
      $http.get('/jobs.json').success(function(data){
        thisVar.jobs = data;
        // Set the default job object
        thisVar.selectJob(jobIndexInput);
      }). // Success function
      error(function(data){
        console.log("Could not retreive JSON data!");
      });
    }

    JobsCtrlGetJson(0);

    // A tester that checks if the inputted number is the currently selected job
    this.isSelected = function(jobIndexInput) {
      return this.selectJob === jobIndexInput;
    };

    // This doesn't do anything. I'm learning how to use Angular services
    CommonFunctions.hello();

  }]); // Controller

})();

// Form modifications - Under construction
// $('.new_comment .button-submit') // Button for submitting new comment
// $('.new_comment').attr('action',''); // Stripping the action attribute