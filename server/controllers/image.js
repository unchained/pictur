const express = require('express'),
    formidable = require('formidable'),
    ImageHelper = require('../models/imageHelper'),
    router = express.Router();

module.exports = (app) => {
  app.use('/api/image', router);
};

router.post('/upload', (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req);

  let imageId = ImageHelper.getRandomName(10);

  form.on('fileBegin', (name, file) => {
    ImageHelper.saveImage(file, imageId);
  });

  form.on('error', () => {
    res.render('error');
  });

  form.on('end', () => {
    res.redirect('/api/image/' + imageId);
  });
});

// TODO: pass data to Vue.js template and you are done
router.get('/:imageId', (req, res, next) => {
  let image = ImageHelper.getImageById(req.params.imageId);

  console.log(image);

  res.redirect('/index');
});
