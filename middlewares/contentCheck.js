const express = require('express');
module.exports = (req, res, next) => {
  if (req.is('json')) {
    express.json()(req, res, next); // If content-type is JSON, parse it using express.json()
  } else if (req.is('application/x-www-form-urlencoded')) {
    express.urlencoded({ extended: true })(req, res, next); // If content-type is form-urlencoded, parse it using express.urlencoded()
  } else {
    res.status(415).send('Unsupported Media Type'); // Send error for other content-types
  }
};
