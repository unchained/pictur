const express = require('express'),
  formidable = require('formidable'),
  path = require('path'),
  ImageHelper = require('../models/imageHelper'),
  config = require('../../config/config'),
  router = express.Router();

module.exports = (app) => {
  app.use('/api/image', router);
};

router.post('/upload', (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req);

  const imageId = ImageHelper.getRandomName(10);

  form.on('fileBegin', (name, file) => {
    ImageHelper.saveImage(file, imageId);
  });

  form.on('error', () => {
    res.render('error');
  });

  form.on('end', () => {
    res.json({ // TODO: send the whole image object
      url: `/api/image/${imageId}`,
    });
  });
});

router.get('/:imageId', (req, res, next) => {
  const options = {
    root: config.uploadsPath,
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
    },
  };
  try {
    const image = ImageHelper.getImageById(req.params.imageId);
    res.sendFile(image.filename, options);
  } catch (e) {
    options.root = path.resolve(options.root, '../');
    res.status(404).sendFile('404.jpg', options);
  }
});
