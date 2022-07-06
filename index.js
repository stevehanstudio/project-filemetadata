var express = require('express');
const multer = require('multer')
var cors = require('cors');
require('dotenv').config()

const upload = multer({ dest: 'uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// {
//   name: "Selfie_20170531_204132.jpg",
//   type: "image/jpeg",
//   size: 108349
// }
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname: name, mimetype: type, size } = req.file
  res.json({ name, type, size })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
