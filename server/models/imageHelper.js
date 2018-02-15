function ImageHelper() {

}

const config = require('../../config/config'),
    glob = require('glob-fs')({gitignore: false}),
    Image = require('./image'),
    fs = require('fs');

// Get image by imageId
// TODO return Image object
ImageHelper.prototype.getImageById = (imageId) => {
  let images = glob.readdirSync(`/uploads/images/${imageId}.*`);

  if (images.length === 1) {
    let imageExtension = images[0].split('.').pop();
    return new Image(imageId, imageId + '.' + imageExtension);
  } else {
    throw "Requested image was not found.";
  }
};

// TODO: check if path exists
// TODO: create path if doesn't exist
// Save image
ImageHelper.prototype.saveImage = (file, imageId) => {
  let imageName = imageId + '.' + file.name.split('.').pop();

  try {
    file.path = config.root + '/uploads/images/' + imageName;
  } catch (e) {
    throw 'Something went wrong during image upload.';
  }
};

// Generate random string
ImageHelper.prototype.getRandomName = (length) => {
  let name = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    name += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return name;
};

module.exports = new ImageHelper();
