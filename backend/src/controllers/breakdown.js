const fs = require('fs');

export const yearBreakdown = async (req, res, next) => {
  const lotCode = req.params.lotCode;
  fs.readFile(`./data/${lotCode}.json`, 'utf8', (err, data) => {
    if(err) console.log (err)
    res.status(200).json({ breakDownType: "year", breakdown: percentBreakdown(data, 'year')});
  });
}

export const varietyBreakdown = async (req, res, next) => {
  const lotCode = req.params.lotCode;
  fs.readFile(`./data/${lotCode}.json`, 'utf8', (err, data) => {
    if(err) console.log (err)
    res.status(200).json({ breakDownType: "variety", breakdown: percentBreakdown(data, 'variety')});
  });
}

export const regionBreakdown = async (req, res, next) => {
  const lotCode = req.params.lotCode;
  fs.readFile(`./data/${lotCode}.json`, 'utf8', (err, data) => {
    if(err) console.log (err)
    res.status(200).json({ breakDownType: "region", breakdown: percentBreakdown(data, 'region')});
  });
}

export const yearVarietyBreakdown = async (req, res, next) => {
  const lotCode = req.params.lotCode;
  fs.readFile(`./data/${lotCode}.json`, 'utf8', (err, data) => {
    if(err) console.log (err)
    const breakdown = JSON.parse(data).components.reduce( (acc, curr) => {
      if(!acc[`${curr.year}-${curr.variety}`] ) acc[`${curr.year}-${curr.variety}`] = 0;
      acc[`${curr.year}-${curr.variety}`] += curr.percentage
      return acc;
    }, {});
    
    var sortedBreakdown = Object.keys(breakdown)
      .map( item => ({"percentage": breakdown[item], key: item}))
      .sort( (a, b) => a.percentage-b.percentage).reverse();
    res.status(200).json({ breakDownType: "year-variety", breakdown: sortedBreakdown });
  });
}

/**
 * Converts lotCodeData to percent breakdowns totals based on the
 * breakdownBy input in the lotCodeData components and sorts from greatest percent to smallest
 * @param {Array} lotCodeData
 * @param {String} breakdownBy
 */
function percentBreakdown( lotCodeData, breakdownBy){
  const breakdown = JSON.parse(lotCodeData).components.reduce( (acc, curr) => {
    if(!acc[curr[breakdownBy]]) acc[curr[breakdownBy]] = 0;
    acc[curr[breakdownBy]] += curr.percentage
    return acc;
  }, {});
  return Object.keys(breakdown)
    .map( item => ({"percentage": breakdown[item], key: item}))
    .sort( (a, b) => a.percentage-b.percentage).reverse();
}