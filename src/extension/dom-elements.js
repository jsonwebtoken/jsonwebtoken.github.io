export * from '../dom-elements.js';

export const shareJwtLink = document.querySelector('.jwt-clipboard-btn');
export const shareJwtTextElement =
  document.getElementById('share-this-jwt-text');

export const cookiesOptGroup =
  document.querySelector('optgroup[label="Cookies"]');
export const webStorageOptGroup =
  document.querySelector('optgroup[label="Web Storage"]');

export const storageSelect = cookiesOptGroup.parentElement;

export const saveBackElement = document.querySelector('.save-back');
export const saveBackLink = document.getElementById('save-back-link');
