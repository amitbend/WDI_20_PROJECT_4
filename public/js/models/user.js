angular
  .module('choir')
  .factory('User', User);

User.$inject = ['$resource'];
function User($resource){

  return $resource(
    'http://localhost:3000/users/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'register': {
        url: 'http://localhost:3000/register',
        method: "POST"
      },
      'login':      {
        url:'http://localhost:3000/login',
        method: "POST"
      }
    }
  );
}
