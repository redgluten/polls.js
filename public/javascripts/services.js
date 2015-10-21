angular
  .module('pollServices', ['ngResource'])
  .factory('Poll', function($resource) {
    return $resource('polls/:id', {}, { query: {
      method: 'GET',
      params: {},
      isArray: true
    }})
    .factory('Choice', function($resource) {
      return $resource('polls/vote/:pollid/:choiceid')
    }
  });
