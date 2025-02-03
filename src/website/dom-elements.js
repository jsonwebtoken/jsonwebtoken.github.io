export * from '../dom-elements.js';
export * from './dom-elements-common.js';

export const extensionSection = document.querySelector('.update-site');
export const ebookSection = document.querySelector('.jtw-ebook-banner');

export const extensionButton = document.getElementById('extension-button');
export const extensionButtonText = extensionButton ?
    extensionButton.querySelector('.button-text') :
    undefined;

export const debuggerSection = document.getElementById('debugger-io');

export const shareJwtButton = document.querySelector('.website-share button');
export const shareJwtTextElement = shareJwtButton.querySelector('span');

export const starsElements = document.getElementsByClassName('stars');
