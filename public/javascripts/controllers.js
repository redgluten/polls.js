var pollModule = angular.module('pollModule', ['pollServices']);

pollModule.controller('PollListController', function($scope, Poll) {
  $scope.polls = Poll.query();
});

pollModule.controller('PollShowController', function($scope, $routeParams, Poll, Choice) {
  $scope.poll = Poll.get({ id: $routeParams.id});
  $scope.vote = function() {
    var pollId   = $scope.poll._id;
    var choiceId = $scope.poll.userVote;
    Choice.get({ pollid: pollId, choiceid: choiceId });
  };
});

pollModule.controller('PollCreateController', function($scope) {
  $scope.poll = {
    question: '',
    choices: [{answer: ''}, {answer: ''}]
  }

  $scope.addChoice = function() {
    $scope.poll.choices.push({answer: ''});
  }

  $scope.savePoll = function() {};
});
