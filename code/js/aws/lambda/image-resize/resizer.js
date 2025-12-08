const jimp = require('jimp');
const http = require('http');
const fs = require('fs');
const DOWNLOAD_FILE = '/tmp/rawfile';
const RESIZE_FILE = '/tmp/resizedfile.png';
const DEFAULT_SIZE = 32;
module.exports.downloadAndResize = (event, context, lambdaCallback) => {
  if (!event.url) return lambdaCallback(new Error('missing event.url'));
  const start_orange = Date.now();
  console.log('Request (orange box) starts now');
  const size = event.size || DEFAULT_SIZE;
  downloadFile(event.url, DOWNLOAD_FILE, (error) => {
    if (error) return lambdaCallback(error);
    fileSize(DOWNLOAD_FILE, (error, dlFileSize) => {
      if (error) return lambdaCallback(error);
      resizeImage(DOWNLOAD_FILE, RESIZE_FILE, size, (error) => {
        if (error) return lambdaCallback(error);
        fileSize(RESIZE_FILE, (error, rsFileSize) => {
          lambdaCallback(null, {
            ok: true,
            dlFileSize,
            rsFileSize
          });
          console.log(`Request (orange box) ends now, operation`
            + ` took ${Date.now() - start_orange}ms`);
          const start_purple = Date.now();
          console.log('Etc Background Work (purple box) starts now');
          removeFile(DOWNLOAD_FILE, (error) => {
            // Cannot call lambdaCallback
            if (error) return console.error(error);
            removeFile(RESIZE_FILE, (error) => {
              // Cannot call lambdaCallback
              if (error) return console.error(error);
              console.log(`Etc Background Work (purple box) `
                + `ends now, operation took `
                + `${Date.now() - start_purple}ms`);
            });
          });
        });
      });
    });
  });
};
function downloadFile(url, destination, callback) {
  const file = fs.createWriteStream(destination);
  const request = http.get(url, (res) => {
    res.pipe(file);
  });
request.once('error', (error) => callback(error));
  file.once('finish', () => callback());
}
function resizeImage(filename, newFilename, size, callback) {
  jimp.read(filename, (error, image) => {
    if (error) return callback(error);
    image
      .resize(size, jimp.AUTO)
      .write(newFilename, callback);
  });
}
function removeFile(filename, callback) {
  fs.unlink(filename, callback);
}
function fileSize(filename, callback) {
  fs.stat(filename, (error, data) => {
    if (error) return callback(error);
    callback(null, data.size);
  });
}
