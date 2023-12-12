'use strict';
/** classManagement.js The purpose of this file is to contain any class management related functions */
export function addClass() {
  let className = prompt('Enter the name of the new class:');
  if (className) {
    let classSelect = document.getElementById('classSelection');
    let newOption = new Option(className, className);
    classSelect.add(newOption);
  }
}
