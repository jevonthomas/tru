'use strict';

const { dbGetOneAccount, dbPostOneAccount, dbSignIn, dbCheckAccount } = require('../models/Account');
const { dbSaveUserCauses } = require('../models/Causes');

module.exports.getSingleAccount = (req, res, next) => {
  let id = req.params.id;
  dbGetOneAccount(req, res, id, next)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      next(err);
    });
};

module.exports.postAccount = (req, res, next) => {
  dbPostOneAccount(req, res, next)
    .then(data => {
      console.log(data.id);
      dbSaveUserCauses(req, res, next, data.id).then(done => {
        console.log('Causes saved:', done);
        res.send(data.token);
      });
    })
    .catch(err => {
      next(err);
    });
};

module.exports.checkAccount = (req, res, next) => {
  dbCheckAccount(req, res, next)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
};
