'use strict';

import { addClass } from './classManagement.js';
import { displayStudentList } from './uiManagement.js';
import { getData } from './getData.js';

export async function retrieveData(portal) {
  const data = await getData('summary-sheets');

  // Store class data for easy retrieval
  const classDataMap = new Map();

  for (let i = 0; i < data.length; i++) {
    if (!classDataMap.has(data[i].classId)) {
      addClass(data[i].classId); // Add class to the select element if not already present
      classDataMap.set(data[i].classId, data[i].students);
    }
  }

  document
    .getElementById('classSelection')
    .addEventListener('change', (event) => {
      const selectedClassId = event.target.value;
      const students = classDataMap.get(selectedClassId) || [];
      if (portal === 'staff') displayStudentList(students);
    });
}
