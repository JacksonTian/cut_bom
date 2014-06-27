var fs = require('fs');

module.exports = function (input, callback) {
  fs.open(input, "r", function (err, fd) {
    if (err) {
      return callback(err);
    }
    var buffer = new Buffer(3);
    fs.read(fd, buffer, 0, 3, 0, function (err, bytesRead, buffer) {
      if (err) {
        return callback(err);
      }
      // 读取buffer的前三位，读到BOM则返回true，其他情况都会返回false
      var hasBOM = (buffer[0] === 0xef && buffer[1] === 0xbb && buffer[2] === 0xbf);
      if (hasBOM) {
        var output = input + '.cutted';
        var writter = fs.createWriteStream(output);
        fs.createReadStream(input, {start: 3}).pipe(writter);
        writter.on('finish', function() {
          fs.rename(output, input, callback);
        });
      }
      // 记得关闭
      fs.close(fd, function (err) {});
    });
  });
};
