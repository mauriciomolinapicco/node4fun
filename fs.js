const fsPromises = require('fs').promises;
const path = require('path');

const fileOps = async () => {
    try {
        //read archivo.txt
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'archivo.txt'), 'utf8');
        console.log(data);

        //con laa info del archivo leido escribo otro archivo
        await fsPromises.writeFile(path.join(__dirname, 'files', 'nuevoArchivo.txt'), data);
        //hago un append en el archivo
        await fsPromises.appendFile(path.join(__dirname, 'files', 'nuevoArchivo.txt'), '\n\nNice to meet you');


    } catch (err) {
        console.log(err)
    }
}
fileOps();
/*
fs.readFile(path.join(__dirname, 'files', 'archivo.txt'), (err, data) => {
    if (err) throw err;
    console.log(data.toString());
})


fs.writeFile(path.join(__dirname, 'files', 'archivo.txt'), 'Nice to meet you', (err) => {
    if (err) throw err;
    console.log('Write complete');

    fs.appendFile(path.join(__dirname, 'files', 'archivo.txt'), '  Yes it is', (err) => {
        if (err) throw err;
        console.log('Append complete');

        fs.rename(path.join(__dirname, 'files', 'archivo.txt'), 'Renombrado.txt', (err) => {
            if (err) throw err;
            console.log('Rename complete');
        })
    })
})


process.on('uncaghtException', err =>{
    console.error(`There was an uncaught error ${err}`)
    process.exit(1)
})

console.log("hi im" + __dirname);*/