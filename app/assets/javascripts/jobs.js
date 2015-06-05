// Should we make a JSON-get accessible outside of the Angular closure?
// var getJson = function(){
//   $.ajax({
//     url: "/jobs.json",
//     beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
//     dataType: "json",
//     method: "get",
//     error: function() { console.log("Cannot GET AJAX file") },
//     success: function(data){
//       console.log("Get-JSON successful!");
//       jsonData = data;
//     } 
//   });
// } // Get JSON data

(function(){

  var app = angular.module("Barterist", []);

  app.controller("JobsController", ['$http', function($http) {

    // Store the value of "this" into a variable so it can be used in the $http.get function
    var thisVar = this;

    thisVar.jobs = [];
    // This variable will contain the job selected via this.selectJob function
    thisVar.selectedJobObject = {};

    this.selectJob = function(jobIndex) {
      thisVar.selectedJobObject = thisVar.jobs[jobIndex];
      $('.hidden-field').attr('value', thisVar.selectedJobObject.id);
    };

    // Select the job via index number from the array
    $http.get('/jobs.json').success(function(data){
      thisVar.jobs = data;
      // Set the default job object
      thisVar.selectJob(0);
    }). // Success function
    error(function(data){
      console.log("Could not retreive JSON data!");
    });

    // A tester that checks if the inputted number is the currently selected job
    this.isSelected = function(jobIndex) {
      return this.selectJob === jobIndex;
    };

  }]); // Controller

})();

// Form modifications - Under construction
// $('.new_comment .button-submit') // Button for submitting new comment
// $('.new_comment').attr('action',''); // Stripping the action attribute