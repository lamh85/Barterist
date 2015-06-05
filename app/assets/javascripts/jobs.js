var data;

var getJobsJson = function(innerFunction, dataVar){
  $.ajax({
    url: "/jobs.json",
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    dataType: "json",
    method: "get",
    error: function() { console.log("Cannot GET AJAX file") },
    success: function(data){
      console.log("Get-JSON successful!");
      dataVar = data;
      innerFunction;
    } 
  });
};

// getJobsJson();

var jobsCtrlGetJson;

// (function(){

  var app = angular.module("Barterist", []);

  app.factory("CommonFunctions", function() {
    return {
      hello: function() {
        console.log("hello!!!");
      },
      goodbye: function() {
        console.log("goodbye");
      }
    };
  });

  app.controller("JobsController", ['$http','CommonFunctions', function($http,CommonFunctions) {

    CommonFunctions.hello();

    // Store the value of "this" into a variable so it can be used in the $http.get function
    var thisVar = this;

    thisVar.jobs = [];
    // This variable will contain the job selected via this.selectJob function
    thisVar.selectedJobObject = {};

    this.selectJob = function(jobIndex) {
      console.log("The jobIndex is " +jobIndex);
      console.log("The thisVar.jobs is " +thisVar.jobs);
      thisVar.selectedJobObject = thisVar.jobs[jobIndex];
      console.log("The selectedJobObject is " +thisVar.selectedJobObject);
      $('.hidden-field').attr('value', thisVar.selectedJobObject.id);
    };

    getJobsJson(thisVar.selectJob(0),thisVar.jobs);

    // Select the job via index number from the array
    // $http.get('/jobs.json').success(function(data){
    //   thisVar.jobs = data;
    //   // Set the default job object
    //   thisVar.selectJob(0);
    // }). // Success function
    // error(function(data){
    //   console.log("Could not retreive JSON data!");
    // });

    // A tester that checks if the inputted number is the currently selected job
    this.isSelected = function(jobIndex) {
      return this.selectJob === jobIndex;
    };

  }]); // Controller

// })();

// Form modifications - Under construction
// $('.new_comment .button-submit') // Button for submitting new comment
// $('.new_comment').attr('action',''); // Stripping the action attribute