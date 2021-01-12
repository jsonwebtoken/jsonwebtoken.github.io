function getLibs() {

  const libraries = document.querySelectorAll('.libraries-sv article');

  const result = {};
  Array.prototype.forEach.call(libraries, lib => {
    try {
      const uniqueClass = lib.classList.item(1);

      let image = lib.querySelector('img').src;
      image = image.substr(image.indexOf('/img'));

      const bgColor = window.getComputedStyle(lib.querySelector('h3'))
                            .getPropertyValue('background-color');
      const langName = lib.querySelector('h3').firstChild.textContent;

      if(!result[langName]) {
        result[langName] = {
          uniqueClass: uniqueClass,
          image: image,
          bgColor: bgColor,
          libs: []
        };
      }

      const r = {};

      const minimumVersionElement = lib.querySelector('.version p');
      r.minimumVersion = minimumVersionElement ?
        minimumVersionElement.firstChild.textContent : null;
      if(r.minimumVersion) {
        r.minimumVersion = r.minimumVersion.substr('Minimum Version '.length);
      }

      r.support = {};
      const panelBodyChildren = lib.querySelector('.panel-body').children;

      let orderedKeys = ['sign', 'verify', 'iss',
                        'sub', 'aud', 'exp',
                        'nbf', 'iat', 'jti', 'typ'];

      for(let i = 0; i < orderedKeys.length; ++i) {
        r.support[orderedKeys[i]] =
          panelBodyChildren[0].children[i]
                              .firstChild
                              .classList
                              .contains('icon-budicon-500');
      }

      orderedKeys = ['hs256', 'hs384', 'hs512',
                     'rs256', 'rs384', 'rs512',
                     'es256', 'es256k', 'es384', 'es512',
                     'ps256', 'ps384', 'ps512',
                     'eddsa'];

      for(let i = 0; i < orderedKeys.length; ++i) {
        r.support[orderedKeys[i]] =
          panelBodyChildren[1].children[i]
                              .firstChild
                              .classList
                              .contains('icon-budicon-500');
      }

      const maintainerA = lib.querySelector('.maintainer a');
      if(maintainerA) {
        r.authorUrl = lib.querySelector('.maintainer a').href;
        r.authorName = lib.querySelector('.maintainer a').textContent;
      } else {
        r.authorUrl = null;
        r.authorName = lib.querySelector('.maintainer').childNodes[1].textContent;
      }

      const spanStarsElement = lib.querySelector('.maintainer span');
      r.gitHubRepoPath = spanStarsElement ?
        lib.querySelector('.maintainer span').getAttribute('data-repo') :
        null;

      r.repoUrl = lib.querySelector('.repository a').href;
      r.installCommandHtml = lib.querySelector('.panel-footer code').innerHTML;

      result[langName].libs.push(r);
    } catch(e) {
      console.log(e);
      console.log(lib);
    }
  });

  return result;

}
