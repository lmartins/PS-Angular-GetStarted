(function(){

  var github = function($http) {

    var getUser = function(username){
      return $http.get('https://api.github.com/users/' + username + '?access_token=2d91d9dca303d3d56a50585d7f118721267f8d91')
        .then(function(response) {
          return response.data;
        });
    };

    var getRepos = function(user) {
      return $http.get(user.repos_url + '?access_token=2d91d9dca303d3d56a50585d7f118721267f8d91')
        .then(function(response) {
          return response.data;
        });
    };

    var getRepoDetails = function(username, reponame) {
      var repo;
      var repoUrl = 'https://api.github.com/repos/' + username + '/' + reponame + '?access_token=2d91d9dca303d3d56a50585d7f118721267f8d91';

      return $http.get(repoUrl)

        .then(function(response) {
          repo = response.data;
          return $http.get("https://api.github.com/repos/" + username + "/" + reponame + '/collaborators' + '?access_token=2d91d9dca303d3d56a50585d7f118721267f8d91');
        })

        .then(function(response) {
          repo.collaborators = response.data;
          return repo;
        });
    };

    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails
    };

  };

  var module = angular.module('githubViewer');
  module.factory('githubService', github);

}());
