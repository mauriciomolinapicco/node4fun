const { format } = require('date-fns');
const { v4:uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, filename) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
   try {
    //chequeo si existe la carpeta "logs" 
    if (!fs.existsSync(path.join(__dirname,'..','logs'))){
        //si no exite la creo
        await fsPromises.mkdir(path.join(__dirname,'..','logs'))
    }
    await fsPromises.appendFile(path.join(__dirname, '..','logs',filename),logItem)
   } catch (err) {
    console.log(err);
   }
}

const logger = (req,res,next) => {
    //logEvents takes 2 argumments: message, file to load/create
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method} ${req.path}`)
    next();
}

module.exports = {logger, logEvents};