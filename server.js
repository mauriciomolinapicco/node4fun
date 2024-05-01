const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');

const PORT = process.env.PORT || 3500;

//Custom middleware
app.use(logger);

app.use(cors(corsOptions));

//Built in middleware
app.use(express.urlencoded({extended:false}))
//app.use is to apply middleware to all routes

//Built in middleware for json
app.use(express.json())

//Serve static files
app.use('/',express.static(path.join(__dirname, '/public')))
//Serve the static file to routes on subdir also(without this css wouldnt work on subdir routes)
app.use('subdir', express.static(path.join(__dirname,'/public')));

//routes
app.use('/', require('./routes/root'))
app.use('/register', require('./routes/register'))
app.use('/subdir', require('./routes/subdir'))
app.use('/employees', require('./routes/api/employees'))

//app.all() means: everything that made it to here (i send the 404)
app.all('/*', (req,res) => {
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')){
        res.json({error: "404 nt found"})
    } else {
        res.type('txt').send("404 Not Found");
    }
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.use(errorHandler);


app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))