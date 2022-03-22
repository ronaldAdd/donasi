const express =  require('express')
const app = express();
const port = process.env.PORT || 5000;
const multer = require('multer');
const bodyParser = require('body-parser');
const donationSchema = require('./models/donation');
const { validate } = require('./models/donation');
const cors = require("cors");

app.use(express.static("public"));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.disable('etag');
app.use(cors());
// app.use(express.json()); // Used to parse JSON bodies
// app.use(express.urlencoded({ extended: true })) // for form data


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename(req, file = {}, cb) {
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
      },
  })
  const upload = multer({storage: storage})


require('./startup/routes')(app);
require('./database/mongodb');

app.get('/',async (req,res,next) =>{
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Hello, World!...</h1>');
    res.write('</body>');
    res.write('</html>');
    res.end();    
})

app.post('/api/donation',upload.single('image'),async (req,res,next) =>{
    try {
        const { error } = donationSchema.validator(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
        const db = await donationSchema(
            {
                name:req.body.name,
                email : req.body.email,
                price :req.body.price,
                image:req.headers.host + '/images/' +  req.file.filename,
                phonenumber:req.body.phonenumber,
                approved: 'no'
            }
        )
        store = await db.save(); 
        return res.status(200).send('saved successfully');
    } catch (error) {
        return res.status(400).send('"image" is required')
        console.log(error.message)        
    }
})



app.listen(port,()=>{
    console.log(`Now listening on porty ${port}`)
})
