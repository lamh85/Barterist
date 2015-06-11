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

    // Store the value of "this" into a variable so it can be used in the $http.get function, AND in the $http.post function
    var thisVar = this;

    thisVar.jobs = [];
    // This variable will contain the job selected via this.selectJob function
    thisVar.selectedJobObject = {};
    this.selectedJobIndex;

    // Set the content for the RIGHT side of the webpage
    this.selectJob = function(jobIndexInput) {
      console.log("The selected job's index is: " +jobIndexInput);
      this.selectedJobIndex = jobIndexInput;
      thisVar.selectedJobObject = thisVar.jobs[jobIndexInput];
      $('#comment_user_id').attr('value', jobIndexInput);
    };

    // GET the JSON data
    this.getJson = function(jobIndexInput){
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
    this.getJson(0);

    // AJAX POST call
    this.postComment = function() {
      console.log("function fired!");
      // this.jobs = [];
      // this.selectedJobObject = {};

      var postDataObject = {
        title: $('#comment_title').val(),
        body: $('#comment_body').val(),
        job_id: this.selectedJobObject.id
      }

      $http.post('/comments', postDataObject).success(function(){
        console.log("Successfully posted");
        // Refresh the JSON data
        thisVar.getJson(thisVar.selectedJobIndex);
      });
    } // AJAX POST call

    // A tester that checks if the inputted number is the currently selected job
    this.isSelected = function(jobIndexInput) {
      return this.selectJob === jobIndexInput;
    };

    // This doesn't do anything. I'm learning how to use Angular services
    CommonFunctions.hello();

  }]); // Controller

})();