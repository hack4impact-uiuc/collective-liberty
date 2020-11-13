const router = require('express').Router();
const multer = require('multer');
const csv = require('fast-csv');
const upload = multer({ dest: '../tmp/csv/' });
const fs = require('fs');

router.post('/', upload.single('file'), function (req, res) {
  const fileRows = [];

  // open uploaded file
  csv
    .fromPath(req.file.path)
    .on('data', function (data) {
      fileRows.push(data); // push each row
    })
    .on('end', function () {
      console.log(fileRows);
      fs.unlinkSync(req.file.path); // remove temp file
      //process "fileRows" and respond
    });
});

module.exports = router;
