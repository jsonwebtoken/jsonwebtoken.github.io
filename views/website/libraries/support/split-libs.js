const data = require('../data.json');
const fs = require('fs');

Object.keys(data).forEach((lang, idx) => {
  fs.writeFileSync(`../${idx}-${lang.replace('/', '_')}.json`, 
    JSON.stringify(Object.assign({
      name: lang
    }, data[lang]),
  null, '  '));
});
