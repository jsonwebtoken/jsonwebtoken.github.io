function autoHeightInput() {
  var outputHeight = $('#decoded-jwt .output').outerHeight(),
      inputHeight = $('#encoded-jwt .input');

  inputHeight.css('height', outputHeight + 'px');
};

if (navigator.userAgent.indexOf('Mac OS X') != -1) {
  $("body").addClass("mac");
} else {
  $("body").addClass("pc");
}

$(".jwt-playground .tab-link a").click(function() {
  var container = $(this).parentsUntil(".jwt-playground").parent();
  if (!$(this).parent().hasClass("current")) {
    container.find(".tab-nav .current").removeClass("current")
    $(this).parent().addClass("current")
    container.find(".tab-content .box-content").removeClass('current')
    $($(this).attr("href")).addClass('current');
  };
  return false;
});

//Inizialize bootstrap widgets
$('[data-toggle="tooltip"]').tooltip();

// 07012015
$(".debugger-jwt .algorithm select").change(function() {
  $('.debugger-jwt .algorithm input[value="'+$(this).val()+'"]').parent().trigger("click");
  $('.debugger-jwt .algorithm input[value="'+$(this).val()+'"]').change();
});

$(".debugger-jwt .algorithm select").change(function(){var a=$('.debugger-jwt .algorithm input[value="'+$(this).val()+'"]');a.prop("checked",!0)})
// end 07012015

if(navigator.platform.toLowerCase().indexOf('mac') !== -1) {
    var e = $('.keyboard-info span');
    var text = e.text();
    e.text(text.replace('Ctrl', 'Cmd'));
}

$(document).ready(initJwtView);
