const config = require('../../config/config'),
  glob = require('glob'),
  Image = require('./image'),
  path = require('path');

class ImageHelper {
  // Get image by imageId
  // TODO return Image object
  getImageById(imageId) {
    const images = glob.sync(path.join(config.root, `/uploads/images/${imageId}.*`));

    if (images.length === 1) {
      const imageExtension = images[0].split('.').pop();
      return new Image(imageId, `${imageId}.${imageExtension}`);
    } else {
      throw new Error('Requested image was not found.');
    }
  }

  // TODO: check if path exists
  // TODO: create path if doesn't exist
  // Save image
  saveImage(file, imageId) {
    const imageName = imageId + path.extname(file.name);

    try {
      file.path = path.join(config.root, '/uploads/images/', imageName);
    } catch (e) {
      throw new Error('Something went wrong during image upload.');
    }
  }

  // Generate random string
  getRandomName(length) {
    let name = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      name += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return name;
  }
}

module.exports = new ImageHelper();
