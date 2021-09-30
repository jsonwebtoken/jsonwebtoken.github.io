import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';
import deepFreeze from 'deep-freeze';
import formats from 'tv4-formats';

import getLanguages from 
  '../../views/website/libraries/support/get-languages.js';
import languageSchema from 
  '../../views/website/libraries/support/language-schema.js';

chai.use(chaiJsonSchema);
chai.should();
chai.tv4.addFormat(formats);

describe('Libraries', function() {
  const languages = deepFreeze(getLanguages());

  it('Each language has a unique name', function() {
    const names = new Set();
    languages
      .map(({ name }) => name)
      .forEach(Set.prototype.add.bind(names))
    names.size.should.equal(languages.length);
  });

  it('uniqueClass is unique for each language', function() {
    const classes = new Set();
    languages
      .map(({ uniqueClass }) => uniqueClass)
      .forEach(Set.prototype.add.bind(classes))
    classes.size.should.equal(languages.length);
  });

  it('Have a correct schema', function() {
    for(const lang of languages) {
      lang.should.be.jsonSchema(languageSchema);
    }
  });
});
