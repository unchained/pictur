const express = require('express'),
  router = express.Router();

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Pictur - free picture sharing',
    pageName: 'index',
  });
});

router.get('/success', (req, res, next) => {
  res.render('success', {
    title: 'Pictur - free picture sharing',
    pageName: 'success',
  });
});
