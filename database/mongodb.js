const mongoose = require("mongoose");


mongoose.connect('mongodb+srv://ronald:ronald123@cluster0.izek1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...','MongoDB',err.codeName));
