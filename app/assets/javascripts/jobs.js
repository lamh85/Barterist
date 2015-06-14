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
    // ///////////////
    this.jobsDbLength;
    // Variables needed for selecting a page:
    this.pageSelected = 1;
    this.jobsDbIndexHead = 0;
    this.jobsDbIndexTail = 9;
    // Variables needed for loading the pagination links:
    this.pageNumbers = [];
    this.pageNumberPrev = null;
    this.pageNumberNext = 2;
    this.jobsPerPage = 10;

    this.makePagePrevNext = function(){
      if ( this.pageSelected > 1 ) {
        this.pageNumberPrev = this.pageSelected - 1;
      }
      if ( this.pageSelected <= this.pageNumbers.length ) { 
        this.pageNumberNext = this.pageSelected + 1;
      }
    }

    // Populate the array of page numbers
    this.makePageNumbers = function(){
      for (i = 0; i < Math.ceil(this.jobsDbLength / this.jobsPerPage); i++) {
        this.pageNumbers.push(i+1);
      }
      this.makePagePrevNext();
    };

    // Set the content for the RIGHT side of the webpage
    this.selectJob = function(jobIndexInput) {
      console.log("The selected job's index is: " +jobIndexInput);
      this.selectedJobIndex = jobIndexInput;
      // thisVar.selectedJobObject affects the RIGHT SIDE of the webpage
      thisVar.selectedJobObject = thisVar.jobs[jobIndexInput];
      $('#comment_user_id').attr('value', jobIndexInput);
    };

    // Store the JSON data into the array of jobs.
    this.getJson = function(firstTime){
      // Select the job via index number from the array
      $http.get('/jobs.json').success(function(data){
        thisVar.jobs = data;
        thisVar.jobsDbLength = thisVar.jobs[0].jobs_length;
        thisVar.makePageNumbers();
        // If this function is executed because the user landed on the index.html page, then set the selected job to 0;
        if (firstTime == true) {
          thisVar.selectJob(0);
        }
      }). // Success function
      error(function(data){
        console.log("Could not retreive JSON data!");
      });
    }
    this.getJson(true);

    // Change the JSON file
    this.changeJsonContent = function(indexHead, indexTail){
      $http.get(
        '/change_page?index_head=' +indexHead+
        '&index_tail=' +indexTail
      ).success(function(data){
        thisVar.getJson(false);
      }).error(function(data){
        console.log("Could not GET JSON");
      });
    }

    this.selectPage = function(pageSelection){
      this.pageSelected = pageSelection;
      this.jobsDbIndexTail = pageSelection * this.jobsPerPage;
      this.jobsDbIndexHead = this.jobsDbIndexTail - this.jobsPerPage - 1;
      // Run the function for GET
      this.changeJsonContent(this.jobsDbIndexHead, this.jobsDbIndexTail);
    }

    // AJAX POST comment
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
        thisVar.changeJsonContent(this.jobsDbIndexHead, this.jobsDbIndexTail);
      });
    } // AJAX POST comment

    // A tester that checks if the inputted number is the currently selected job
    this.isSelected = function(jobIndexInput) {
      return this.selectJob === jobIndexInput;
    };

    // This doesn't do anything. I'm learning how to use custom Angular services
    CommonFunctions.hello();

  }]); // Controller

})();