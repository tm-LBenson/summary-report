'use strict';

/** classManagement.js - Class management related functions */

// Function to create a text input for the new class name
export function createClassInputField() {
  const container = document.getElementById('classInputContainer');
  const input = document.createElement('input');
  input.className = 'form-control mb-3 w-50';
  input.type = 'text';
  input.id = 'newClassName';
  input.placeholder = 'Enter the name of the new class';
  container.appendChild(input);
}

// Function to add the class
export function addClass(className, pageload = true) {
  let classSelect = document.getElementById('classSelection');
  let newOption = new Option(className, className);
  classSelect.add(newOption);
  if (!pageload) newOption.selected = true;
}
