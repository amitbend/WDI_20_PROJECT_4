angular
  .module('choir')
  .factory('Song', Song);

Song.$inject = ['$resource'];

function Song($resource){

  return $resource(
    'http://localhost:3000/songs/:id', {id: '@id'},
    { 'get':       { method: 'GET', isArray: true},
      'save':      { method: 'POST' },
      'update':    { method:'PUT' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
