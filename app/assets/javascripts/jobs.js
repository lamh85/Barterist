var dataGlobal;
var jobIndex;
// Make this variable global so it can be accessible outside of the Angular "app" variable
var JobsCtrlGetJson;
var JobsController;

(function(){

  var app = angular.module("Barterist", ['ng-rails-csrf']);

  app.factory("CommonFunctions", function() {
    return {
      hello: function() { console.log("hello there111");
      }
    };
  });

  JobsController = app.controller("JobsController", ['$http','CommonFunctions','$scope', function($http,CommonFunctions,$scope) {

    // Store the value of "this" into a variable so it can be used in the $http.get function
    var thisVar = this;

    thisVar.jobs = [];
    // This variable will contain the job selected via this.selectJob function
    thisVar.selectedJobObject = {};

    this.selectJob = function(jobIndexInput) {
      jobIndex = jobIndexInput;
      thisVar.selectedJobObject = thisVar.jobs[jobIndexInput];
      $('#comment_user_id').attr('value', thisVar.selectedJobObject.id);
    };

    this.postData = function() {
      console.log("function fired!");
      // this.jobs = [];
      // this.selectedJobObject = {};

      var postDataObject = {
        title: $('#comment_title').val(),
        body: $('#comment_body').val(),
        user_id: $('#comment_user_id').val()
      }

      $http.post('/comments', postDataObject).success(function(){
        console.log("Successfully posted");
      });
    }

    JobsCtrlGetJson = function(jobIndexInput){
      // Select the job via index number from the array
      $http.get('/jobs.json').success(function(data){
        dataGlobal = thisVar.jobs = data;
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

$('#new_comment');
$('#comment_title').val();
$('#comment_body').val();
$('#new_comment .button-submit');

// Form modifications - Under construction
// $('.new_comment .button-submit') // Button for submitting new comment
// $('.new_comment').attr('action',''); // Stripping the action attribute

// Example of jQuery post
// $("#timer-button").on("click", function() {
//  $.ajax({
//    method: "POST",
//    url: "/clock_timers",
//    data: {clock_timer: {time: timeSoFar}},
//    error: function() {alert("error!")},
//    success: function(response) {
//      console.log(response);
//    }
// })