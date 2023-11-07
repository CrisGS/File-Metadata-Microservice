let express = require('express');
let cors = require('cors');
require('dotenv').config()

let app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

app.post("/api/fileanalyse", upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ eroare: "Niciun fișier încărcat." });
  }

  const { originalname, mimetype, size, buffer } = req.file;
  res.status(200).json({
    'name': originalname,
    'type': mimetype,
    'size': size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Serverul rulează pe portul ${port}`)
});
