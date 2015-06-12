// For debugging purposes, make these variables global so they can be accessible outside of the Angular "app" variable
var JobsController;

(function(){

  var app = angular.module("Barterist", ['ng-rails-csrf']);

  // This doesn't do anything. I'm learning how to use custom Angular services
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
    // This variable keeps the selected job's index persisting when the user submits a comment
    this.selectedJobIndex;

    // Variables for pagination. Except for this.jobsDbLength, ALL of the following should be user-selected.
    this.jobsDbLength;
    this.pageSelected = 1; // Default is 1
    this.pageNumberPrev = null;
    this.pageNumberNext = null;
    this.pageNumbers = [];
    this.jobsPerPage = 10; // Default is 10
    this.jobsDbIndexHead;
    this.jobsDbIndexTail;

    // Populate the array of page numbers
    this.makePageNumbers = function(){
      for (i = 0; i < Math.ceil(this.jobsDbLength / this.jobsPerPage); i++) {
        this.pageNumbers.push(i+1);
      }

      if (this.pageSelected > 1) {
        this.pageNumberPrev = this.pageSelected - 1
      }

      if (this.pageSelected <= this.pageNumbers.length) {
        this.pageNumberNext = this.pageSelected + 1
      }
    };

    // Determines the index numbers to limit the ActiveRecord results
    // var setJobsDbHeadTail = function(this.pageSelected, this.jobsPerPage) {

    // }

    // page_number * jobs_per_page - 1 = index_tail
    // index_head = index_tail - jobs_per_page - 1


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
        thisVar.jobs = data;
        // Set the default job object
        thisVar.selectJob(jobIndexInput);
        thisVar.jobsDbLength = thisVar.jobs[0].jobs_length;
        thisVar.makePageNumbers();
      }). // Success function
      error(function(data){
        console.log("Could not retreive JSON data!");
      });
    }
    this.getJson(0);

    // AJAX POST call
    this.postComment = function() {
      console.log("function fired!");

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

    // This doesn't do anything. I'm learning how to use custom Angular services
    CommonFunctions.hello();

  }]); // Controller

})();