var express     = require('express');
var router      = express.Router();
var mongoose    = require('mongoose');
var mongoConfig = require('../conf/mongo');
var db          = mongoose.createConnection(mongoConfig.host, mongoConfig.database);
var voteSchema  = require('../models/poll').voteSchema;
var vote        = db.model('votes', voteSchema);

// List
router.get('/polls', function(req, res, next) {
  vote.find({}, function(err, results) {
    res.json(results);
  });
});

router.get('/polls/vote/:pollid/:choiceid', function(req, res, next) {
  vote.findById(req.params.id, function (err, result) {
    res.json(result);
  });
});

// Show
router.get('/polls/:id', function(req, res, next) {
  vote.findById(req.params.id, function (err, result) {
    res.json(result);
  });
});

// Create
router.get('/polls/create', function(req, res, next) {
  res.render('polls/create', { title: 'Create a new poll' });
});

router.post('/polls', function(req, res, next) {
  // Validate the request
  var formErrors = validateRequest(req)

  if (formErrors) {
    res.render('/polls/create', { title: 'Create a new poll', errors: formErrors });
  } else {
    record = {
      question: req.body.question,
      choices: [
        {
          answer: req.body.choice1,
          votes: [{ip: '192.168.1.1'}, {ip: '192.168.1.5'}]
        },
        {
          answer: req.body.choice2,
          votes: [{ip: '192.168.1.14'}, {ip: '192.168.1.52'}, {ip: '192.168.1.43'}, {ip: '192.168.1.41'}]
        },
        {
          answer: req.body.choice3,
          votes: [{ip: '192.168.1.11'}, {ip: '192.168.1.8'}, {ip: '192.168.1.67'}, {ip: '192.168.1.41'}]
        },
      ]
    };

    var voteModel = new vote(record);
    voteModel.save(function(err, results) {
      if (err) throw err;

      res.redirect('/polls');
    });
  }
});

// Edit
router.get('/:polls/edit', function(req, res, next) {
  res.render('polls/edit', { poll: req.params.polls, title: 'Poll ' });
});

function validateRequest(req) {
  req.checkBody('question')
    .notEmpty().withMessage('Question required');
  req.checkBody('choice1')
    .notEmpty().withMessage('Question required');

  return req.validationErrors(true);
}

module.exports = router;
