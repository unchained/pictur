const config = require('../../config/config'),
  glob = require('glob'),
  Image = require('./image'),
  path = require('path');

class ImageHelper {
  constructor() {
    this.uploadsPath = config.uploadsPath;
  }

  // Get image by imageId
  // TODO return Image object
  getImageById(imageId) {
    const images = glob.sync(path.join(this.uploadsPath, `${imageId}.*`));

    if (images.length === 1) {
      const imageExtension = path.extname(images[0]);
      return new Image(imageId, imageId + imageExtension);
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
      file.path = path.join(this.uploadsPath, imageName);
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
