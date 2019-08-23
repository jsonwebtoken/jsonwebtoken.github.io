export const encodedTabLink =
  document.querySelector('.tab-link a[href="#encoded-jwt"]');
export const decodedTabLink =
  document.querySelector('.tab-link a[href="#decoded-jwt"]');
export const encodedTabElement = document.getElementById('encoded-jwt');
export const decodedTabElement = document.getElementById('decoded-jwt');

export const editorElement = document.querySelector('#encoded-jwt .input');
export const decodedElement = document.querySelector('#decoded-jwt .output');

export const headerElement = document.querySelector('.js-header');
export const payloadElement = document.querySelector('.js-payload');

export const signatureStatusElement =
  document.querySelector('.validation-status.js-signature');
export const editorWarnings =
  document.querySelector('.js-editor-warnings');

export const algorithmSelect = document.getElementById('algorithm-select');
export const algorithmEs512 =
  algorithmSelect.querySelector('option[value="ES512"]');

export const keyEditorContainer =
  document.querySelector('.jwt-signature pre.RS256');
export const rsaShaTextSpan = document.getElementById('rsasha-text');
export const secretEditorContainer =
  document.querySelector('.jwt-signature pre.HS256');
export const hmacShaTextSpan = document.getElementById('hmacsha-text');

export const publicKeyTextArea =
  document.querySelector('.jwt-signature textarea[name="public-key"]');
export const privateKeyTextArea =
  document.querySelector('.jwt-signature textarea[name="private-key"]');
export const secretInput =
  document.querySelector('.jwt-signature input[name="secret"]');
export const secretBase64Checkbox =
  document.getElementById('is-base64-encoded');
