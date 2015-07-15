// For debugging purposes, make these variables global so they can be accessible outside of the Angular "app" variable
var JobsController;

(function(){

  var app = angular.module("Barterist", ['ng-rails-csrf']);

  app.service('jsonServices',['$http',function($http) {

    thisVarJsonServices = this;
    this.myVar = 1;

    this.increaseMyVar = function() {
      thisVarJsonServices.myVar ++;
      console.log("myVar = " +this.myVar);
    }

    this.data = [];
    this.dataLength = 0;
    this.counter = 1;

    this.getJson = function(successFunction,dataReceiver){
      // Select the job via index number from the array
      $http.get('/jobs.json').success(function(data){
        for (i = 0; i < data.length; i++){
          thisVarJsonServices.data.push(data[i]);
          if (i == (data.length - 1) ) {
            thisVarJsonServices.dataLength = i + 1;
          }
        }
        console.log("I am from jsonServices " +thisVarJsonServices.data.length);
        console.log("thisVarJsonServices.jsonRefreshCount " +thisVarJsonServices.jsonRefreshCount);
      }). // Success function
      error(function(data){
      });
    } // getJson function
    // this.getJson();


    console.log("hello from a service");
  }]); // app.service

  PagesController = app.controller("PagesController", ['jsonServices','$scope', function(jsonServices, $scope){
    thisVarPages = this;
    // Variables for pagination.
    // ///////////////
    $scope.jobsPages = [];
    $scope.jobsLength = 0;
    // Variables needed for selecting a page:
    this.pageSelected = 1;
    this.jobsDbIndexHead = 0;
    this.jobsDbIndexTail = 9;
    // Variables needed for loading the pagination links:
    this.pageNumbers = [];
    this.pageNumberPrev = null;
    this.pageNumberNext = 2;
    this.jobsPerPage = 10;

    $scope.$watch( function(){return jsonServices.data}, function () {
      $scope.jobsPages = thisVarJsonServices.data;
      console.log("I am from Pages controller's $watch function. Here is the data in the controller:" +JSON.stringify($scope.jobsPages));
    });


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
      for (i = 0; i < Math.ceil(($scope.jobsPages).length / this.jobsPerPage); i++) {
        this.pageNumbers.push(i+1);
        console.log("checkpoint");
      }
      console.log("function fired: makePageNumbers " +$scope.jobsPages);
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

  }]); // End the Pages Controller

  JobsController = app.controller("JobsController", ['$http','jsonServices','$scope', function($http,jsonServices,$scope) {

    // Store the value of "this" into a variable so it can be used in the $http.get function, AND in the $http.post function
    thisVarJobs = this;
    $scope.jsonRefreshCount = jsonServices.jsonRefreshCount;
    $scope.jobs = [];
    // This variable will contain the job selected via $scope.selectJob function
    $scope.selectedJobObject = false;
    // This variable keeps the selected job's index persisting when the user submits a comment
    $scope.selectedJobIndex = null;
    $scope.counter = 1;

    // Tell jsonServices to run the function for fetching the JSON data.
    jsonServices.getJson();

    // Select the job
    // Set the content for the RIGHT side of the webpage
    $scope.selectJob = function(jobIndexInput) {
      console.log("The selected job's index is: " +jobIndexInput);
      $scope.selectedJobIndex = jobIndexInput;
      // thisVar$scope.selectedJobObject affects the RIGHT SIDE of the webpage
      $scope.selectedJobObject = $scope.jobs[jobIndexInput];
      $('#comment_user_id').attr('value', jobIndexInput);
    };

    // Update the controller's JSON data whenever the service's updates
    $scope.$watch( function(){return jsonServices.data}, function(){
      $scope.jobs = thisVarJsonServices.data;
      console.log("I am from Jobs controller's $watch function. Here is the data in the controller:" +JSON.stringify($scope.jobs));
      if ($scope.selectedJobObject == false) {
        $scope.selectJob(0);
      }
    });

    $scope.$watch( function(){return $scope.jobs}, function(){
      if ($scope.jobs.length > 0 && $scope.selectedJobIndex == null) {
        $scope.selectJob(0);
      }
      console.log("hello from watch function" +$scope.jobs);
    });

    // AJAX POST comment
    this.postComment = function() {
      var postDataObject = {
        title: $('#comment_title').val(),
        body: $('#comment_body').val(),
        job_id: $scope.selectedJobObject.id
      }

      $http.post('/comments', postDataObject).success(function(){
        // Refresh the JSON data
        thisVarJobs.changeJsonContent(this.jobsDbIndexHead, this.jobsDbIndexTail);
      });
    } // AJAX POST comment

    this.isSelected = function(jobIndexInput) {
      return $scope.selectJob === jobIndexInput;
    }

    // THESE ARE TEST COMMUNICATIONS WITH THE ANGULAR SERVICE
    // //////////////////////////////////////////////////////

    this.increaseMyVar = function(){
      jsonServices.increaseMyVar();
      // console.log("I got a variable from the service! " +jsonServices.myVar);
    }

    $scope.myVar;

    $scope.$watch(function () { return thisVarJsonServices.myVar }, function () {
      $scope.myVar = thisVarJsonServices.myVar;
    });

  }]); // Controller
})();