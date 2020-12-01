const router = require('express').Router();
const multer = require('multer');
const csv = require('fast-csv');
const upload = multer();

router.post('/', upload.single('file'), function (req, res) {
  const fileRows = [];

  // open uploaded file
  csv
    .parseString(req.file.buffer.toString())
    .on('data', function (data) {
      fileRows.push(data); // push each row
    })
    .on('end', function () {
      console.log(fileRows);
      //process "fileRows" and respond
      res.json({});
      res.status(200);
    });
});

module.exports = router;
