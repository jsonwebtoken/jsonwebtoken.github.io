export const navbarElement = document.querySelector('nav.navbar');
export const menuTriggerElement = document.querySelector('.menu-trigger');
export const menuLinks = document.querySelectorAll('.navbar .menu a');
export const menuScrollableLinks = 
  navbarElement.querySelectorAll('a.scrollto');

export const sectionElements = document.getElementsByTagName('section');

export const extensionButton = document.getElementById('extension-button');
export const extensionButtonText = 
  extensionButton.querySelector('.button-text');

export const codeElements = document.querySelectorAll('.plain-text pre code');

export const debuggerSection = document.getElementById('debugger-io');

export const editorElement = document.querySelector('#encoded-jwt .input');
export const decodedElement = document.querySelector('#decoded-jwt .output');
export const headerElement = document.querySelector('.js-header');
export const payloadElement = document.querySelector('.js-payload');
export const payloadTooltipElement = 
  document.getElementById('js-payload-tooltip');

export const signatureStatusElement =
  document.querySelector('.validation-status.js-signature');

export const algorithmSelect = document.getElementById('algorithm-select');

export const keyEditorContainer = document.querySelector('.jwt-signature pre.RS256');
export const rsaShaTextSpan = document.getElementById('rsasha-text');
export const secretEditorContainer = document.querySelector('.jwt-signature pre.HS256');
export const hmacShaTextSpan = document.getElementById('hmacsha-text');

export const publicKeyTextArea =
  document.querySelector('.jwt-signature textarea[name="public-key"]');
export const privateKeyTextArea =
  document.querySelector('.jwt-signature textarea[name="private-key"]');
export const secretInput = 
  document.querySelector('.jwt-signature input[name="secret"]');
export const secretBase64Checkbox =
  document.getElementById('is-base64-encoded');

export const starsElements = document.getElementsByClassName('stars');
export const librariesElement = document.querySelector('.libraries-sv');
export const librariesSelect = document.getElementById('libraries-select');

export const counterElement = document.querySelector('.counter');
