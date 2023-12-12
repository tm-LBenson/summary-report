'use strict';

/**  script.js Main file for the modules  */
import { addClass, createClassInputField } from './JS/classManagement.js';
import { processData } from './JS/dataProcessing.js';
import { retrieveData } from './JS/retrieveData.js';
import { toggleStudentList } from './JS/uiManagement.js';
import { wakeUpBackend } from './JS/wakeUpBackend.js';

wakeUpBackend();

document
  .getElementById('processDataButton')
  .addEventListener('click', processData);


document
  .getElementById('toggleStudentsButton')
  .addEventListener('click', toggleStudentList);

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
