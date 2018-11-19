'use strict';

const { dbGetOneAccount } = require('../models/Account');

module.exports.getSingleAccount = (req, res, next) => {
  let id = req.params.id;
  dbGetOneAccount(res, id)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => {
      next(err);
    });
};