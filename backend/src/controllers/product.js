const fs = require('fs');
const fsPromises = fs.promises;

export const productSearch = async (req, res, next) => {
  const search = req.query.search ? req.query.search.toLowerCase() : "" ;
  const data = await readFiles( './data/' );

  // Filter query on lotCode & description
  const filtered = data.filter( product => {
    return (
      product.lotCode.toLowerCase().includes(search) ||
      (product.description && product.description.toLowerCase().includes(search))
    );
  })

  res.status(200).json({ search: search, items: filtered });
}

export const product = async (req, res, next) => {
  const lotCode = req.params.lotCode;
  fs.readFile(`./data/${lotCode}.json`, 'utf8', (err, data) => {
    if(err) console.log (err)
    res.status(200).json(JSON.parse(data));
  });
}

/**
 * Reads json files from data directory to retrieve searchable data
 * @param {string} dirname
 */
function readFiles(dirname){
  return new Promise( async (resolve, reject) => {
    const files = await fsPromises.readdir(dirname);
    const data = await Promise.all( files.map( filename => {
      return new Promise( (resolve, reject) => {
        fs.readFile(dirname + filename, 'utf-8', function(err, content) {
          if (err) {
            reject();
          }
          resolve(JSON.parse(content));
        });
      })
    }))
    resolve(data)
  })
}