'use strict';

/**  script.js Main file for the modules  */

import { retrieveData } from './retrieveData.js';
import { toggleStudentList } from './uiManagement.js';
import { wakeUpBackend } from './wakeUpBackend.js';

wakeUpBackend();

document
  .getElementById('toggleStudentsButton')
  .addEventListener('click', toggleStudentList);

retrieveData('staff');
