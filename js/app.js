
function parseQueryString(qs) {
  var d = {};
  qs = qs.split('&');
  qs.forEach(function (kv) { kv = kv.split('='); d[kv[0]] = kv[1]; });
  return d;
}

function parseSearch() {
  return parseQueryString(document.location.search.slice(1));
}

function parseHash() {
  return parseQueryString(document.location.hash.slice(1));
}

if (parseSearch().value || parseHash().id_token) {
  scrollTo($('#debugger-io'));
}

function safeLocalStorageSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Safari when in private browsing doesn't allow it
  }
}
safeLocalStorageSetItem("visited", "1");

/*
 * Go to url hash from intro section
 */
if (location.href.indexOf("#debugger") != -1) {
  scrollTo($('#debugger-io'));
}

if (location.href.indexOf("#libraries") != -1) {
  scrollTo($('#libraries-io'));
}

/*
 * hljs
 */
hljs.configure({
  classPrefix: ''
});

$('.plain-text pre code').each(function(i, block) {
  var $snippet = $(this);

  if(!$snippet.hasClass('hljs')) {
    hljs.highlightBlock(block);
    hljs.lineNumbersBlock(block);
    $snippet.addClass('hljs');
  }
});

/*
 * Show icon
 */
$(window).scroll(function() {
  if ($(window).scrollTop() >= 130) {
    $("nav.navbar").addClass("fixed");
  } else {
    $("nav.navbar").removeClass("fixed");
  }
});

/*
 * Show menu mobile
 */
function scrollTo($target) {
  var navheight = $(".navbar").height();

  if (window.matchMedia('(min-width: 768px)').matches) {
    $('html, body').animate({
      scrollTop: $target.offset().top - navheight
    }, 500);
  } else {
    $('html, body').animate({
      scrollTop: $target.offset().top
    }, 500);
  }
}

$('.menu-trigger').on('click', function() {
  $(this).toggleClass('active');
  $('.navbar').toggleClass('open');
  $('body').toggleClass('menu-mobile');
});

$('.navbar .menu a').on('click', function() {
  $('.menu-trigger').removeClass('active');
  $('.navbar').removeClass('open');
  $('body').removeClass('menu-mobile');
});

/*
 * Accordion
 */
$('.accordion').accordion({
  "transitionSpeed": 400
});

/*
 * Scroll to section
 */
$('a[href^="#"].scrollto').on('click', function(event) {
  var target = $( $(this).attr('href') );

  if( target.length ) {
    event.preventDefault();
    scrollTo(target);
  }
});

$(window).on('scroll', function () {
  var $submenu = $('.navbar');
  var navheight = $(".navbar").height();
  var sections = $('section');
  var cur_pos = $(window).scrollTop();

  sections.each(function() {
    var top = $(this).offset().top - navheight;
    var bottom = top + $(this).outerHeight();

    if (cur_pos >= top && cur_pos <= bottom) {
      $submenu.find('a.scrollto').removeClass('active').closest('nav.menu').removeClass('active');

      $submenu.find('a.scrollto[href="#' + $(this).attr('id') + '"]').addClass('active').closest('nav.menu').addClass('active');
    }
  });
});

function autoHeightInput() {
  var outputHeight = $('#decoded-jwt .output').outerHeight(),
    inputHeight = $('#encoded-jwt .input');

  inputHeight.css('height', outputHeight + 'px');
}

/*
 * token counter
 */
var numberOfLogins = 80482701;
var pollfreqWhenVisible = 5000;
var pollfreqWhenHidden = 1000*1000;
var pollfreq;

function isScrolledIntoView(elem) {
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function updatePollFreqIfVisible(elem) {
  pollfreq = isScrolledIntoView($('.counter')) ? pollfreqWhenVisible : pollfreqWhenHidden;
  return setTimeout(function () {
    updatePollFreqIfVisible(elem);
  }, 500);
}

function poll() {
  updateNumberOfLogins(function() {
    return setTimeout(function () {
      poll();
    }, pollfreq);
  });
}

function updateNumberOfLogins(callback) {
  $.ajax({
    url: "https://webtask.it.auth0.com/api/run/wt-matiasw-gmail_com-0/proxy?url=http://metrics.it.auth0.com/counters",
    cache: false
  }).done(function(response) {
    numberOfLogins = response.logins;
    if (callback) callback();
  });
}

updateNumberOfLogins();
updatePollFreqIfVisible();

var clock = $('.counter').FlipClock(numberOfLogins, {
  clockFace: 'Counter',
  minimumDigits: ('' + numberOfLogins).length
});

setInterval(function() {
  if (clock.time.time < numberOfLogins) {
    clock.setTime(numberOfLogins);
  }
}, 1000);

poll();


if (navigator.userAgent.indexOf('Mac OS X') != -1) {
  $("body").addClass("mac");
} else {
  $("body").addClass("pc");
}


$(".jwt-playground .tab-link a").click(function() {
  var container = $(this).parentsUntil(".jwt-playground").parent();
  if (!$(this).parent().hasClass("current")) {
    container.find(".tab-nav .current").removeClass("current");
    $(this).parent().addClass("current");
    container.find(".tab-content .box-content").removeClass('current');
    $($(this).attr("href")).addClass('current');
  }
  return false;
});

var $grid = $('.libraries-sv').isotope({
  layoutMode: 'fitRows',
  itemSelector: 'article',
  percentPosition: true,
  masonry: {
    columnWidth: 'article'
  }
});

$('.filter select').on( 'change', function() {
  $grid.isotope({ filter: $(this).val() });
});

$(".panel-default .panel-heading").click(function() {
  if ($(this).hasClass("active")) {
    $(".panel-default .panel-heading").removeClass("active");
    $(".panel-default .panel-wrap").slideUp(300);
  } else {
    $(".panel-default .panel-heading").removeClass("active");
    $(".panel-default .panel-wrap").slideUp(300);
    $(this).addClass("active");
    $(this).next(".panel-wrap").slideDown(300);
  }
  return false;
});

// Principal JWT JS **

(function () {
  // Taken from http://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
  function fireEvent(element) {
    var event; // The custom event that will be created

    if (document.createEvent) {
      event = document.createEvent('HTMLEvents');
      event.initEvent('change', true, true);
    } else {
      event = document.createEventObject();
      event.eventType = 'change';
    }

    event.eventName = 'change';

    if (document.createEvent) {
      element.dispatchEvent(event);
    } else {
      element.fireEvent('on' + event.eventType, event);
    }
  }

  var codeMirror = CodeMirror;

  function tabHack(instance) {
    instance.replaceSelection('   ' , 'end');
  }

  var tokenEditor = codeMirror(document.getElementsByClassName('js-input')[0], {
    mode:           'jwt',
    theme:          'night',
    lineWrapping:   true,
    // autofocus:      true,
    extraKeys: { 'Tab':  tabHack}
  });

  var headerEditor = codeMirror(document.getElementsByClassName('js-header')[0], {
    mode:           'application/json',
    lineWrapping:   true,
    extraKeys: { 'Tab':  tabHack},
    lint: true
  });

  var payloadEditorDom = document.getElementsByClassName('js-payload')[0];
  var payloadEditor = codeMirror(payloadEditorDom, {
    mode:           'application/json',
    lineWrapping:   true,
    extraKeys: { 'Tab':  tabHack},
    lint: true
  });

  $(payloadEditorDom).on('mousemove', tooltipHandler)

  var algorithmRadios = $('input[name="algorithm"]'),
    lastRestoredToken;
  var tokenRadios = $('input[name="token-type"]');

  var payloadTooltip = $('#js-payload-tooltip');
  
  function tooltipHandler(event) {
    var result = payloadEditor.coordsChar({
      left: event.pageX,
      top: event.pageY
    }, 'page');

    var line = payloadEditor.getLine(result.line);
    
    var timeClaims = ['exp', 'nbf', 'iat', 'auth_time', 'updated_at'];

    var matches = /"(.*)":\s*"?(\d*)"?/.exec(line);
    if(matches && timeClaims.indexOf(matches[1]) !== -1) {
      var dateStr = (new Date(parseInt(matches[2]) * 1000)).toString();
      payloadTooltip.text(dateStr);
      payloadTooltip.css({
        left: event.pageX + 'px',
        top: event.pageY + 'px',
      });
      payloadTooltip.show();
    } else {
      payloadTooltip.hide();
    }
  }

  function setJSONEditorContent(jsonEditor, decodedJSON, selector) {
    jsonEditor.off('change', refreshTokenEditor);

    if (decodedJSON.result !== null && decodedJSON.result !== undefined) {
      jsonEditor.setValue(decodedJSON.result);
    } else {
      jsonEditor.setValue('');
    }
    if (decodedJSON.error) {
      selector.addClass('error');
    } else {
      selector.removeClass('error');
    }

    jsonEditor.on('change', refreshTokenEditor);

  }

  function setKeyFromX5Claims(json, callback) {
    function setKeyFromX5c(x5c) {
      if(!x5c) {
        return;
      }

      if(!(x5c instanceof Array)) {
        x5c = [ x5c ];
      }

      var certChain = '';
      x5c.forEach(function(cert) {
        certChain += '-----BEGIN CERTIFICATE-----\n';
        certChain += cert + '\n';
        certChain += '-----END CERTIFICATE-----\n';
      });

      var publicKeyElement = $('textarea[name="public-key"]');
      publicKeyElement.val(certChain);

      var privateKeyElement = $('textarea[name="private-key"]');
      privateKeyElement.val('');      

      validateKey.apply($('textarea[name="public-key"]'));
    }

    if(json.x5c) {
      setKeyFromX5c(json.x5c);
      callback();
    } else if(json.x5u) {
      $.get(json.x5u, function(data) {
        setKeyFromX5c(data);
        callback();
      });
    } else {
      callback();
    }
  }

  function setKeyFromJwkKeySetUrl(kid, url, callback) {
    $.get(url, function(data) {
      if(!data || !data.keys || !(data.keys instanceof Array)) {
        callback();
        return;
      }

      for(var i = 0; i < data.keys.length; ++i) {
        var jwk = data.keys[i];
        if(jwk.kid === kid) {
          setKeyFromX5Claims(jwk, callback);
          return;
        }
      }

      callback();
    });
  }

  function downloadPublicKeyIfPossible(token, callback) {
    var decoded = window.decodeJWT(token);
    if(decoded.error) {
      console.error(decoded.error);
      callback();
      return;
    }

    var header = decoded.result.header;
    var payload = decoded.result.payload;

    if(header.alg.indexOf('RS') !== 0) {
      callback();
      return;
    }

    if(header.x5c || header.x5u) {
      setKeyFromX5Claims(header, callback);
    } else if(header.jku) {
      setKeyFromJwkKeySetUrl(header.kid, header.jku, callback);
    } else if(header.jwk) {
      setKeyFromX5Claims(header.jwk, callback);
    } else if(header.kid && payload.iss) {
      //Auth0-specific scheme
      var url = payload.iss + '.well-known/jwks.json';
      setKeyFromJwkKeySetUrl(header.kid, url, callback);
    } else {
      callback();
    }
  }

  function tokenEditorOnChangeListener(instance) {
    var value = getTrimmedValue(instance);

    if (!value) { return; }

    var parts = value.split('.');

    var secretElement = document.getElementsByName('secret')[0];
    var signatureElement = getFirstElementByClassName('js-signature');

    if (!signatureElement) {
      return;
    }

    if(!window.isValidBase64String(parts[0], true) ||
       !window.isValidBase64String(parts[1], true) ||
       !window.isValidBase64String(parts[2], true)) {
      $('.input').addClass('error');
      return;
    }

    var decodedHeader = window.decode(parts[0]);

    try {
      headerEditor.off('change', refreshTokenEditor);
      selectDetectedAlgorithm(JSON.parse(decodedHeader.result).alg);
      headerEditor.on('change', refreshTokenEditor);
    } catch (e){
      console.error('Invalid header decoded');
    }

    downloadPublicKeyIfPossible(value, function() {

      var selector = $('.jwt-header');
      setJSONEditorContent(headerEditor, decodedHeader, selector);
      var decodedPayload = window.decode(parts[1]);
      selector = $('.jwt-payload');
      setJSONEditorContent(payloadEditor, decodedPayload, selector);

      fireEvent(secretElement);

      if (window.matchMedia('(min-width: 768px)').matches) {
        autoHeightInput();
      }

    });
  }

  function selectDetectedAlgorithm(alg){
    var $algRadio = $('.algorithm input[value="'+alg+'"]');
    $algRadio.prop('checked', true);

    $('.algorithm option[value="'+alg+'"]').prop('selected', true);

    fireEvent($algRadio.get(0));
  }

  function saveToStorage(jwt) {
    // Save last valid jwt value for refresh
    safeLocalStorageSetItem("jwtValue", jwt);
  }

  function loadFromStorage(cb) {
    cb(localStorage.getItem("jwtValue"));
    localStorage.removeItem("jwtValue");
  }

  function refreshTokenEditor() {
    tokenEditor.off('change', tokenEditorOnChangeListener);

    var algorithm = getAlgorithm();
    var secretElement = document.getElementsByName('secret')[0];
    var isBase64EncodedElement = document.getElementsByName('is-base64-encoded')[0];

    var signResult = window.sign(
      algorithm,
      headerEditor.getValue(),
      payloadEditor.getValue(),
      getKey(algorithm, 'sign'),
      isBase64EncodedElement.checked
    );

    if (signResult.error) {
      tokenEditor.setValue('');
      var elements = {'payload': '.jwt-payload', 'header': '.jwt-header'};
      $('.jwt-payload').removeClass('error');
      $('.jwt-header').removeClass('error');
      if (signResult.error.who) {
        signResult.error.who
          .map(function (e) { return elements[e]; })
          .forEach(function (e) {
            $(e).addClass('error');
          });
      }
      $('.input').addClass('error');
      if (signResult.result) {
        tokenEditor.setValue(signResult.result);
      } else {
        tokenEditor.setValue('');
      }
    } else {
      tokenEditor.setValue(signResult.result);
      $('.input').removeClass('error');
      $('.jwt-payload').removeClass('error');
      $('.jwt-header').removeClass('error');

      saveToStorage(signResult.result);
    }
    tokenEditor.on('change', tokenEditorOnChangeListener);
    fireEvent(secretElement);
  }

  function getFirstElementByClassName(selector) {
    var headerElement = document.getElementsByClassName(selector);
    return headerElement.length ? headerElement[0] : null;
  }

  function getTrimmedValue(instance) {
    var value = instance.getValue();
    if (!value) {
      return null;
    }

    return value.replace(/\s/g, '');
  }

  tokenEditor.on('change', tokenEditorOnChangeListener);

  payloadEditor.on('change',  refreshTokenEditor);
  headerEditor.on('change',   refreshTokenEditor);

  var secretElement = document.getElementsByName('secret')[0];
  var isBase64EncodedElement = document.getElementsByName('is-base64-encoded')[0];

  function showInvalidSignature() {
    var signatureElement = getFirstElementByClassName('js-signature');
    $(signatureElement).removeClass('valid-token');
    $(signatureElement).addClass('invalid-token');
    signatureElement.innerHTML = '<i class="icon-budicon-501"></i> invalid signature';
  }

  function showValidSignature() {
    var signatureElement = getFirstElementByClassName('js-signature');
    $(signatureElement).removeClass('invalid-token');      
    $(signatureElement).addClass('valid-token');
    signatureElement.innerHTML = '<i class="icon-budicon-499"></i> signature verified';
    $('.input').removeClass('error');
  }

  function updateSignature () {
    var algorithm = getAlgorithm();
    var signatureElement = getFirstElementByClassName('js-signature');
    var signatureContainerElement = getFirstElementByClassName('jwt-signature');

    if (!signatureElement) {
      return;
    }
    var value = getTrimmedValue(tokenEditor);
    var isBase64 = isBase64EncodedElement.checked;
    if (isBase64 && !window.isValidBase64String(secretElement.value)) {
      $(signatureContainerElement).addClass('error');
      showInvalidSignature();
      return;
    } else {
      $(signatureContainerElement).removeClass('error');
    }

    var result = window.verify(
      algorithm,
      value,
      getKey(algorithm, 'verify'),
      isBase64
    );

    var error = result.error;
    result = result.result;
    if (!error && result) {
      showValidSignature()
    } else {
      showInvalidSignature();
    }
  }

  function getKey(algorithm, action) {
    var secretElement = $('input[name="secret"]');
    var privateKeyElement = $('textarea[name="private-key"]');
    var publicKeyElement = $('textarea[name="public-key"]');

    if(algorithm.indexOf('HS') === 0) {
      return secretElement.val();
    } else {
      return action === 'sign' ? privateKeyElement.val() : publicKeyElement.val();
    }
  }

  function getAlgorithm() {
    return algorithmRadios.filter(':checked').val();
  }

  function checkDefaults(requestedAlgorithm) {
    requestedAlgorithm = requestedAlgorithm.toLowerCase();
    var requestedDefaults = defaultTokens[requestedAlgorithm];

    var token = getTrimmedValue(tokenEditor);
    if(!token) {
      token = '';
    }
    for(var alg in defaultTokens) {
      if(token === defaultTokens[alg].token) {
        if(alg === requestedAlgorithm) {
          break;
        }

        tokenEditor.setValue(requestedDefaults.token);

        if(requestedAlgorithm.indexOf('hs') === 0) {
          var secretElement = $('input[name="secret"]');

          secretElement.val(requestedDefaults.secret);
        } else {
          var publicKey = $('.jwt-signature textarea[name=public-key]');
          var privateKey = $('.jwt-signature textarea[name=private-key]');

          publicKey.val(requestedDefaults.publicKey);
          privateKey.val(requestedDefaults.privateKey);          

          validateKey.apply(publicKey);
          validateKey.apply(privateKey);
        }

        break;
      }
    }    
  }

  function updateHeader(algorithm) {
    var headerStr = getTrimmedValue(headerEditor);
    try {
      var header = JSON.parse(headerStr);
      header.alg = algorithm;
      headerEditor.setValue(JSON.stringify(header, null, 2));
    } catch(e) {
      //Ignore this, we may have garbage in the editor.
    }
  }

  function updateAlgorithm () {
    var algorithm = algorithmRadios.filter(':checked').val();
    var algoType = algorithm.substr(0, 2);
    var algoSize = algorithm.substr(2, 3);

    $('.js-input').attr('data-alg', algorithm);

    if(algoType === 'HS') {
      $('#hmacsha-text').text('HMACSHA' + algoSize);

      $('.jwt-signature pre')
        .hide()
        .filter('.HS256')
        .show();
    } else {
      var texts = {
        RS: 'RSASHA',
        PS: 'RSAPSSSHA',
        ES: 'ECDSASHA'
      };
      $('#rsasha-text').text(texts[algoType] + algoSize);

      $('.jwt-signature pre')
        .hide()
        .filter('.RS256')
        .show();
    }

    checkDefaults(algorithm);
    updateHeader(algorithm);

    if (window.matchMedia('(min-width: 768px)').matches) {
      autoHeightInput();
    }
  }

  function updateToken() {
    var tokenType = getTokenType();
    if (document.location.hash) {
      var qs = document.location.hash.slice(1);
      var d = {};
      qs = qs.split('&');
      qs.forEach(function (kv) { kv = kv.split('='); d[kv[0]] = kv[1]; });

      if (d[tokenType]) {
        tokenEditor.setValue(decodeURIComponent(d[tokenType]));
        return;
      }
    }
  }

  function getTokenType() {
    return tokenRadios.filter(':checked').val();
  }

  function validateKey() {
    var $textarea = $(this);
    var valid = window.isValidKey($textarea.val());

    if (valid.valid) {
      $textarea.removeClass('error');
      $textarea.val(valid.key);
    } else {
      $textarea.addClass('error');
    }
  }

  updateAlgorithm();

  algorithmRadios.on('change', function(){
    updateAlgorithm();
    updateSignature();
  });

  tokenRadios.on('change', function(){
    updateToken();
    updateAlgorithm();
    updateSignature();
  });

  $('.jwt-signature textarea[name="public-key"]').on('input', function() {
    validateKey.apply(this);
    updateSignature();
  });
  $('.jwt-signature textarea[name="private-key"]').on('input', function () {
    validateKey.apply(this);
    refreshTokenEditor();
  });


  secretElement.addEventListener('change', updateSignature, false);
  secretElement.addEventListener('keyup', updateSignature, false);

  isBase64EncodedElement.addEventListener('change', updateSignature, false);

  var qs;
  var d;

  loadFromStorage(function (jwt) {
    lastRestoredToken = jwt || defaultTokens.hs256.token;

    tokenEditor.setValue(
      lastRestoredToken
    );
  });

  if (document.location.hash) {
    qs = document.location.hash.slice(1);
    d = {};
    qs = qs.split('&');
    qs.forEach(function (kv) { kv = kv.split('='); d[kv[0]] = kv[1]; });

    if (d.access_token && d.id_token) {
      // show token-type selector
      $('.jwt-playground .selections .token-type').show();
    }

    if (d.id_token) {
      tokenEditor.setValue(decodeURIComponent(d.id_token));
    }

    if (d.access_token) {
      tokenEditor.setValue(decodeURIComponent(d.access_token));
    }
  }

  if (document.location.search) {
    qs = document.location.search.slice(1);
    d = {};
    qs = qs.split('&');
    qs.forEach(function (kv) { 
      kv = kv.split('=');
      d[kv[0]] = kv[1];
    });    
    if(d.publicKey) {
      var publicKey = $('.jwt-signature textarea[name="public-key"]');
      publicKey.val(decodeURIComponent(d.publicKey));
      validateKey.apply(publicKey);
    }
    if (d.value) {
      tokenEditor.setValue(decodeURIComponent(d.value));
    }
    if(d.token) {
      tokenEditor.setValue(decodeURIComponent(d.token));
    }    


  }

  function copyTokenLink() {
    var algorithm = $('input[name="algorithm"]').filter(':checked').val();
    
    var url = 'https://jwt.io/#debugger-io?';
    url += 'token=' + encodeURIComponent(getTrimmedValue(tokenEditor));
    if(algorithm.indexOf('HS') === -1) {
      var publicKey = $('.jwt-signature textarea[name="public-key"]');
      url += '&publicKey=' + encodeURIComponent(publicKey.val());
    }

    copyTextToClipboard(url);
  }

  $('.validation-status.js-signature').on('click', copyTokenLink);

}());

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error(err);
  }

  document.body.removeChild(textArea);
}

//TIMESTAMP
(function() {
  setInterval(function() {
    var now, timestamp;
    timestamp = new Date(1987, 5, 30);
    now = new Date();
    return $('#time').text(((now - timestamp) / 1000).toFixed(0));
  }, 1000);
}).call(this);

//Inizialize bootstrap widgets
$('[data-toggle="tooltip"]').tooltip();

// 07012015
$(".debugger-jwt .algorithm select").change(function() {
  $('.debugger-jwt .algorithm input[value="'+$(this).val()+'"]').parent().trigger("click");
  $('.debugger-jwt .algorithm input[value="'+$(this).val()+'"]').change();
});


$(".debugger-jwt .algorithm select").change(function() {
  var a = $('.debugger-jwt .algorithm input[value="'+$(this).val()+'"]');
  a.prop("checked",!0);
});
// end 07012015

$(".debugger-jwt .token-type select").change(function() {
  $('.debugger-jwt .token-type input[value="'+$(this).val()+'"]').parent().trigger("click");
  $('.debugger-jwt .token-type input[value="'+$(this).val()+'"]').change();
});

$(".debugger-jwt .token-type select").change(function(){var a=$('.debugger-jwt .token-type input[value="'+$(this).val()+'"]');a.prop("checked",!0);});


// Fetch stargazers count for each repo from GitHub's API
$('.stars').each(function(idx, element){
  var $el = $(element);
  var repo = $el.attr('data-repo');

  function setCount(count) {
    var $count = $('<span>');

    $count.text(count);

    $el.find('i').after($count);

    $el.show();
  }

  if (repo){
    var repoKey = "stars_" + repo;
    if(!localStorage.getItem(repoKey)) {

      $.getJSON('https://api.github.com/repos/' + repo, function(repoData){
        var starCount = repoData.stargazers_count;
        safeLocalStorageSetItem(repoKey, starCount);
        setCount(starCount);
      });
    } else {
      setCount(localStorage.getItem(repoKey));
    }
  }
});

function setInstalledText() {
  var button = $('#extension-button');
  if(button && button.hasClass('is-installed')) {
    button.find('.button-text').text('Already installed');
    button.css('cursor', 'default');
  }
}

setInstalledText();
// The is-installed class is added by the extension. It is unspecified when
// this is done. So check again in a second or so.
setTimeout(setInstalledText, 1000);

// chrome.webstore.install can only be called from standard event handlers.
document.getElementById('extension-button').addEventListener('click', function() {
  var button = $('#extension-button');
  if(button.hasClass('is-installed')) {
    return;
  }

  function isChrome() {
        // please note,
        // that IE11 now returns undefined again for window.chrome
        // and new Opera 30 outputs true for window.chrome
        // and new IE Edge outputs to true now for window.chrome
        // and if not iOS Chrome check
        // so use the below updated condition
    var isChromium = window.chrome,
      winNav = window.navigator,
      vendorName = winNav.vendor,
      isOpera = winNav.userAgent.indexOf("OPR") > -1,
      isIEedge = winNav.userAgent.indexOf("Edge") > -1,
      isIOSChrome = winNav.userAgent.match("CriOS");

    if(isIOSChrome){
      return false;
    } else if(isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false) {
      return true;
    } else {
      return false;
    }
  }

  function openInWindow() {
    window.open('https://chrome.google.com/webstore/detail/jwt-debugger/ppmmlchacdbknfphdeafcbmklcghghmd');
  }

  if(isChrome()) {
    try {
      chrome.webstore.install('https://chrome.google.com/webstore/detail/ppmmlchacdbknfphdeafcbmklcghghmd', function() {
        button.addClass('is-installed');
        setInstalledText();
      }, function() {
        button.removeClass('is-installed');
        button.find('.button-text').text('Add to chrome');
        openInWindow();
      });
    } catch(e) {
      button.removeClass('is-installed');
      button.find('.button-text').text('Add to chrome');
      openInWindow();
    }
  } else {
    button.removeClass('is-installed');
    button.find('.button-text').text('Add to chrome');
    openInWindow();
  }
});

//CANVAS
// $(function(){
//   var canvas = document.querySelector('canvas'),
//       ctx = canvas.getContext('2d'),
//       color = '#000000';
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   canvas.style.display = 'block';
//   ctx.fillStyle = color;
//   ctx.lineWidth = .1;
//   ctx.strokeStyle = color;
//
//   var mousePosition = {
//     x: 30 * canvas.width / 100,
//     y: 30 * canvas.height / 100
//   };
//
//   var dots = {
//     nb: 300,
//     distance: 100,
//     d_radius: 150,
//     array: []
//   };
//
//   function Dot(){
//     this.x = Math.random() * canvas.width;
//     this.y = Math.random() * canvas.height;
//
//     this.vx = -.5 + Math.random();
//     this.vy = -.5 + Math.random();
//
//     this.radius = Math.random();
//   }
//
//   Dot.prototype = {
//     create: function(){
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//       ctx.fill();
//     },
//
//     animate: function(){
//       for(i = 0; i < dots.nb; i++){
//
//         var dot = dots.array[i];
//
//         if(dot.y < 0 || dot.y > canvas.height){
//           dot.vx = dot.vx;
//           dot.vy = - dot.vy;
//         }
//         else if(dot.x < 0 || dot.x > canvas.width){
//           dot.vx = - dot.vx;
//           dot.vy = dot.vy;
//         }
//         dot.x += dot.vx;
//         dot.y += dot.vy;
//       }
//     },
//
//     line: function(){
//       for(i = 0; i < dots.nb; i++){
//         for(j = 0; j < dots.nb; j++){
//           i_dot = dots.array[i];
//           j_dot = dots.array[j];
//
//           if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
//             if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
//               ctx.beginPath();
//               ctx.moveTo(i_dot.x, i_dot.y);
//               ctx.lineTo(j_dot.x, j_dot.y);
//               ctx.stroke();
//               ctx.closePath();
//             }
//           }
//         }
//       }
//     }
//   };
//
//   function createDots(){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     for(i = 0; i < dots.nb; i++){
//       // Prevent memory leak
//       if (!dots.array[i]) {
//         dots.array[i] = new Dot();
//       }
//       dot = dots.array[i];
//
//       dot.create();
//     }
//
//     dot.line();
//     dot.animate();
//   }
//
//   $('canvas').on('mousemove mouseleave', function(e){
//     if(e.type == 'mousemove'){
//       mousePosition.x = e.pageX;
//       mousePosition.y = e.pageY;
//     }
//     if(e.type == 'mouseleave'){
//       mousePosition.x = canvas.width / 2;
//       mousePosition.y = canvas.height / 2;
//     }
//   });
//   setInterval(createDots, 1000/30);
// });
