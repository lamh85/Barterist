// For debugging purposes, make these variables global so they can be accessible outside of the Angular "app" variable
var JobsController;

(function(){

  var app = angular.module("Barterist", ['ng-rails-csrf']);

  // JobsController = app.controller("JobsController", ['$http','jsonServices','$scope', function($http,jsonServices,$scope) {

  app.service('jsonServices',['$http',function($http) {

    this.getJson = function(successFunction,dataReceiver){
      // Select the job via index number from the array
      $http.get('/jobs.json').success(function(data){
        for (i = 0; i < data.length; i++){
          dataReceiver.push(data[i]);
        }
        successFunction;
      }). // Success function
      error(function(data){
      });
    } // getJson function

    this.myVar = 1;

    console.log("hello from a service");
  }]); // app.service

  PagesController = app.controller("PagesController", function(){
    thisVarPages = this;
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

    this.pageSelectedIsFirst = function() {
      return this.pageSelected == 1;
    }

    this.pageSelectedIsLast = function() {
      return this.pageSelected == this.pageNumbers.length;
    }

    this.makePagePrevNext = function(){
      (this.pageSelected > 1) && (this.pageNumberPrev = this.pageSelected - 1);
      (this.pageSelected <= this.pageNumbers.length) &&
        (this.pageNumberNext = this.pageSelected + 1);
      console.log("the previous page is now " +this.pageNumberPrev);
      console.log("the next page is now " +this.pageNumberNext);
    }

    // Populate the array of page numbers
    this.makePageNumbers = function(){
      for (i = 0; i < Math.ceil(this.jobsDbLength / this.jobsPerPage); i++) {
        this.pageNumbers.push(i+1);
      }
      this.makePagePrevNext();
    }

    // If the page number is selected, then apply the CSS class
    this.pageIsSelected = function(pageNumber){
      return pageNumber === this.pageSelected;
    }

    this.selectPage = function(newPage){
      if (newPage >= 1 && newPage <= this.pageNumbers.length) {
        this.pageSelected = newPage;
        this.makePagePrevNext();
      }
    }

  });

  JobsController = app.controller("JobsController", ['$http','jsonServices','$scope', function($http,jsonServices,$scope) {

    // Store the value of "this" into a variable so it can be used in the $http.get function, AND in the $http.post function
    thisVarJobs = this;
    this.jobs = [];
    // This variable will contain the job selected via this.selectJob function
    this.selectedJobObject = {};
    // This variable keeps the selected job's index persisting when the user submits a comment
    this.selectedJobIndex;

    // Set the content for the RIGHT side of the webpage
    this.selectJob = function(jobIndexInput) {
      console.log("The selected job's index is: " +jobIndexInput);
      this.selectedJobIndex = jobIndexInput;
      // thisVarJobs.selectedJobObject affects the RIGHT SIDE of the webpage
      this.selectedJobObject = this.jobs[jobIndexInput];
      $('#comment_user_id').attr('value', jobIndexInput);
    };

    // Store the JSON data into the array of jobs.
    this.getJson = function(firstTime){
      // Select the job via index number from the array
      $http.get('/jobs.json').success(function(data){
        thisVarJobs.jobs = data;
        thisVarPages.jobsDbLength = thisVarJobs.jobs[0].jobs_length;
        thisVarPages.makePageNumbers();
        // If this function is executed because the user landed on the index.html page, then set the selected job to 0;
        (firstTime == true) && (thisVarJobs.selectJob(0));
      }). // Success function
      error(function(data){
        console.log("Could not retreive JSON data!");
      });
    }
    // this.getJson(true);

    // Change the JSON file
    this.changeJsonContent = function(indexHead, indexTail){
      $http.get(
        '/change_page?index_head=' +indexHead+
        '&index_tail=' +indexTail
      ).success(function(data){
        thisVarJobs.getJson(false);
      }).error(function(data){
        console.log("Could not GET JSON");
      });
    }

    // AJAX POST comment
    this.postComment = function() {
      var postDataObject = {
        title: $('#comment_title').val(),
        body: $('#comment_body').val(),
        job_id: this.selectedJobObject.id
      }

      $http.post('/comments', postDataObject).success(function(){
        // Refresh the JSON data
        thisVarJobs.changeJsonContent(this.jobsDbIndexHead, this.jobsDbIndexTail);
      });
    } // AJAX POST comment

    // A tester that checks if the inputted number is the currently selected job
    this.isSelected = function(jobIndexInput) {
      return this.selectJob === jobIndexInput;
    }

    this.testFn = function(){
      console.log("I am a success function from Jobs Controller");
      // If this function is executed because the user landed on the index.html page, then set the selected job to 0;
      thisVarJobs.selectJob(0);
    }

    this.testVar = [];
    jsonServices.getJson(thisVarJobs.testFn(),thisVarJobs.jobs);

    this.returnMyVar = function(){
      return jsonServices.myVar;
    }

    this.increaseMyVar = function(){
      jsonServices.myVar++;
      console.log("I got a variable from the service! " +jsonServices.myVar);
    }

    console.log("I got a variable from the service! " +jsonServices.myVar);

  }]); // Controller

})();