var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var songsController = require('../controllers/songsController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/songs')
  .get(songsController.songsIndex)
  .post(songsController.songsCreate);

router.route('/songs/:id')
  .get(songsController.songsShow)
  .put(songsController.songsUpdate)
  .delete(songsController.songsDelete);


router.route

module.exports = router;
