
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

  var DEFAULT_HS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';

  var DEFAULT_RS_TOKEN = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.EkN-DOsnsuRjRO6BxXemmJDm3HbxrbRzXglbN2S4sOkopdU4IsDxTI8jO19W_A4K8ZPJijNLis4EZsHeY559a4DFOd50_OqgHGuERTqYZyuhtF39yxJPAjUESwxk2J5k_4zM3O-vtd1Ghyo4IbqKKSy6J9mTniYJPenn5-HIirE';

  var DEFAULT_PUBLIC_RSA = "\
-----BEGIN PUBLIC KEY-----\n\
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDdlatRjRjogo3WojgGHFHYLugd\
UWAY9iR3fy4arWNA1KoS8kVw33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQs\
HUfQrSDv+MuSUMAe8jzKE4qW+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5D\
o2kQ+X5xK9cipRgEKwIDAQAB\n\
-----END PUBLIC KEY-----\
  ";

  var DEFAULT_PRIVATE_RSA = "\
-----BEGIN RSA PRIVATE KEY-----\n\
MIICWwIBAAKBgQDdlatRjRjogo3WojgGHFHYLugdUWAY9iR3fy4arWNA1KoS8kVw\
33cJibXr8bvwUAUparCwlvdbH6dvEOfou0/gCFQsHUfQrSDv+MuSUMAe8jzKE4qW\
+jK+xQU9a03GUnKHkkle+Q0pX/g6jXZ7r1/xAK5Do2kQ+X5xK9cipRgEKwIDAQAB\
AoGAD+onAtVye4ic7VR7V50DF9bOnwRwNXrARcDhq9LWNRrRGElESYYTQ6EbatXS\
3MCyjjX2eMhu/aF5YhXBwkppwxg+EOmXeh+MzL7Zh284OuPbkglAaGhV9bb6/5Cp\
uGb1esyPbYW+Ty2PC0GSZfIXkXs76jXAu9TOBvD0ybc2YlkCQQDywg2R/7t3Q2OE\
2+yo382CLJdrlSLVROWKwb4tb2PjhY4XAwV8d1vy0RenxTB+K5Mu57uVSTHtrMK0\
GAtFr833AkEA6avx20OHo61Yela/4k5kQDtjEf1N0LfI+BcWZtxsS3jDM3i1Hp0K\
Su5rsCPb8acJo5RO26gGVrfAsDcIXKC+bQJAZZ2XIpsitLyPpuiMOvBbzPavd4gY\
6Z8KWrfYzJoI/Q9FuBo6rKwl4BFoToD7WIUS+hpkagwWiz+6zLoX1dbOZwJACmH5\
fSSjAkLRi54PKJ8TFUeOP15h9sQzydI8zJU+upvDEKZsZc/UhT/SySDOxQ4G/523\
Y0sz/OZtSWcol/UMgQJALesy++GdvoIDLfJX5GBQpuFgFenRiRDabxrE9MNUZ2aP\
FaFp+DyAe+b4nDwuJaW2LURbr8AEZga7oQj0uYxcYw==\n\
  -----END RSA PRIVATE KEY-----\
  ";

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

  var payloadEditor = codeMirror(document.getElementsByClassName('js-payload')[0], {
    mode:           'application/json',
    lineWrapping:   true,
    extraKeys: { 'Tab':  tabHack},
    lint: true
  });

  var algorithmRadios = $('input[name="algorithm"]'),
    lastRestoredToken;
  var tokenRadios = $('input[name="token-type"]');

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


  function tokenEditorOnChangeListener(instance) {
    var value = getTrimmedValue(instance);

    if (!value) { return; }

    var parts = value.split('.');

    var secretElement = document.getElementsByName('secret')[0];
    var signatureElement = getFirstElementByClassName('js-signature');

    if (!signatureElement) {
      return;
    }

    var decodedHeader = window.decode(parts[0]);

    try {
      selectDetectedAlgorithm(JSON.parse(decodedHeader.result).alg);
    }catch (e){
      console.error('Invalid header decoded');
    }

    var selector = $('.jwt-header');
    setJSONEditorContent(headerEditor, decodedHeader, selector);
    var decodedPayload = window.decode(parts[1]);
    selector = $('.jwt-payload');
    setJSONEditorContent(payloadEditor, decodedPayload, selector);

    fireEvent(secretElement);

    if (window.matchMedia('(min-width: 768px)').matches) {
      autoHeightInput();
    }
  }

  function selectDetectedAlgorithm(alg){
    var $algRadio = $('.algorithm input[value="'+alg+'"]');
    $algRadio.prop('checked', true);

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
      $(signatureElement).removeClass('invalid-token');
      $(signatureElement).addClass('valid-token');
      signatureElement.innerHTML = '<i class="icon-budicon-499"></i> signature verified';
    } else {
      $(signatureElement).removeClass('valid-token');
      $(signatureElement).addClass('invalid-token');
      signatureElement.innerHTML = '<i class="icon-budicon-501"></i> invalid signature';
    }
  }

  function getKey(algorithm, action) {
    var secretElement = $('input[name="secret"]');
    var privateKeyElement = $('textarea[name="private-key"]');
    var publicKeyElement = $('textarea[name="public-key"]');

    if(algorithm === 'HS256') {
      return secretElement.val();
    } else {
      return action === 'sign' ? privateKeyElement.val() : publicKeyElement.val();
    }
  }

  function getAlgorithm() {
    return algorithmRadios.filter(':checked').val();
  }

  function updateAlgorithm () {
    var algorithm = algorithmRadios.filter(':checked').val();

    $('.js-input').attr('data-alg', algorithm);

    $('.jwt-signature pre')
        .hide()
        .filter('.' + algorithm)
        .show();

    if(getTokenType() === 'id_token' && getTrimmedValue(tokenEditor) === DEFAULT_HS_TOKEN &&
      algorithm === 'RS256'){
      setDefaultsForRSA();
    }else if(getTokenType() === 'id_token' && getTrimmedValue(tokenEditor) === DEFAULT_RS_TOKEN &&
      algorithm === 'HS256'){
      setDefaultsForHMAC();
    }
  }

  function setDefaultsForRSA() {
    tokenEditor.setValue(DEFAULT_RS_TOKEN);

    $('.jwt-signature textarea[name=public-key]').val(DEFAULT_PUBLIC_RSA);
    $('.jwt-signature textarea[name=private-key]').val(DEFAULT_PRIVATE_RSA);
  }

  function setDefaultsForHMAC(){
    tokenEditor.setValue(DEFAULT_HS_TOKEN);
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
    var valid;

    if($textarea.prop('name') === 'public-key') {
      valid = /-----BEGIN (PUBLIC KEY|CERTIFICATE)-----(.|\n)*-----END (PUBLIC KEY|CERTIFICATE)-----/.test($textarea.val());
    } else {
      valid = /-----BEGIN RSA PRIVATE KEY-----(.|\n)*-----END RSA PRIVATE KEY-----/.test($textarea.val());
    }

    if (valid) {
      $textarea.removeClass('error');
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

  $('.jwt-signature textarea[name="public-key"]').on('input', updateSignature);
  $('.jwt-signature textarea[name="private-key"]').on('input', function () {
    validateKey.apply(this);
    refreshTokenEditor();
  });


  secretElement.addEventListener('change', updateSignature, false);
  secretElement.addEventListener('keyup', updateSignature, false);

  isBase64EncodedElement.addEventListener('change', updateSignature, false);

  var qs;
  var d;
  if (document.location.search) {
    qs = document.location.search.slice(1);
    d = {};
    qs = qs.split('&');
    qs.forEach(function (kv) { kv = kv.split('='); d[kv[0]] = kv[1]; });
    if (d.value) {
      tokenEditor.setValue(decodeURIComponent(d.value));
      return;
    }
  }

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
      return;
    }

    if (d.access_token) {
      tokenEditor.setValue(decodeURIComponent(d.access_token));
      return;
    }
  }

  loadFromStorage(function (jwt) {
    lastRestoredToken = jwt || DEFAULT_HS_TOKEN;

    tokenEditor.setValue(
      lastRestoredToken
    );
  });

}());


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


$(".debugger-jwt .algorithm select").change(function(){var a=$('.debugger-jwt .algorithm input[value="'+$(this).val()+'"]');a.prop("checked",!0);});
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
