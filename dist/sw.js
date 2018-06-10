


/**
 * SW Event Listeners
 */

 // Install Event

self.addEventListener('install',(event) => {
  console.log('sw installing...');
});


// Activate Event
self.addEventListener('activate', (event) => {
  console.log('sw activating...');
});


// Fetch Event
self.addEventListener('fetch', (fetchEvent) => {
  console.log('the sw is fetching...get it?');

  return fetchEvent.respondWith(fetchRequestCallback(fetchEvent.request));
});

function fetchRequestCallback (req) {
  //1. Parse the request
  const filetype = req.url.split('.').pop(); //someone else's code?

  console.log(`Request received: ${req.url}`);

  //2. Categorize request: db, image, css, js

  //3. Send back cached response & update cache 
  return networkFetchHandler(req);
 

  // must return a promise that resolves to a response

}

function networkFetchHandler(req) {

  return fetch(req).then((res)=>{
    if (res.status === 200) { // fetch ok

      return res; 

    } else { //fetch error
        return new Response("I need a custom handler");
    }
  }).catch((err) => {
    //something is really wrong
    console.log(err);
    return err;
  });

}
