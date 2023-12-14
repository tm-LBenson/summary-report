'use strict';

/**  script.js Main file for the modules  */
import { addClass, createClassInputField } from './classManagement.js';
import { processData } from './dataProcessing.js';
import { retrieveData } from './retrieveData.js';
import { wakeUpBackend } from './wakeUpBackend.js';

wakeUpBackend();

document
  .getElementById('processDataButton')
  .addEventListener('click', processData);

document.getElementById('addClassButton').addEventListener('click', () => {
  if (!document.getElementById('newClassName')) {
    createClassInputField();
  } else {
    const container = document.getElementById('classInputContainer');
    const newClassName = document.getElementById('newClassName').value;
    if (newClassName) {
      addClass(newClassName, false);
    }
    container.remove();
  }
});
retrieveData();
