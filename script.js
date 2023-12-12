'use strict';
/**  script.js Main file for the modules  */
import { addClass } from './JS/classManagement.js';
import { processData } from './JS/dataProcessing.js';
import { toggleStudentList } from './JS/uiManagement.js';
import { wakeUpBackend } from './JS/wakeUpBackend.js';

wakeUpBackend();

document
  .getElementById('processDataButton')
  .addEventListener('click', processData);

document
  .getElementById('toggleStudentsButton')
  .addEventListener('click', toggleStudentList);

document.getElementById('addClassButton').addEventListener('click', addClass);

