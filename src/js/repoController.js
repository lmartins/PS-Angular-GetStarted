
(function() {

  'use strict';

  var module = angular.module('githubViewer');

  var RepoController = function($scope, $routeParams, githubService) {

    var reponame = $routeParams.reponame;
    var username = $routeParams.username;

    var onRepo = function(data) {
      $scope.repo = data;
    };

    var onError = function(reason) {
      $scope.error = reason;
    };

    githubService.getRepoDetails(username, reponame)
      .then(onRepo, onError);

  };

  module.controller('RepoController', ['$scope', '$routeParams', 'githubService', RepoController] );

}());
