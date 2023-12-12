'use strict';
/** wakeUpBackend.js The express server that powers this appliation will go to sleep if not used. This function will send a simple get request to the backend getting it spun up on page load.  */

export async function wakeUpBackend() {
  await fetch('https://astro-server-z1u9.onrender.com');
}
