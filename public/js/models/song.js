angular
  .module('choir')
  .factory('Song', Song);

Song.$inject = ['$resource'];

function Song($resource){

  return $resource(
    'http://localhost:3000/songs/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}
