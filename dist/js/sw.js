


/**
 * SW Event Listeners
 */

 // Install Event

self.addEventListener('install',(event)=>{
  console.log('sw installing...');
});


// Activate Event
self.addEventListener('activate', (event)=>{
  console.log('sw activating...');
});


// Fetch Event
self.addEventListener('fetch', (event)=>{
  console.log('the sw is fetching...get it?');
})