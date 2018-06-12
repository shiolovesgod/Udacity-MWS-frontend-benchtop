/**
 * Global vars
 */

 //Define cache variables
 const CACHED_DIRS = ['/', '/js/', '/js/third-party/','/css/', '/css/third-party/','/img/*','/data/'];
 const rCACHED_DIRS = CACHED_DIRS.map(dir => {return new RegExp(`^${dir.split('*').join('.*')}$`)} ); 
 const rFilename = new RegExp('[^\\/:*?"<>|\r\n]+$');

 const EXT_CACHED = [ 'https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXiWtFCc.woff2',
  'https://fonts.gstatic.com/s/vidaloka/v9/7cHrv4c3ipenMKlEavs7wH8Dnzcj.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://maps.googleapis.com/maps-api-v3/api/js/33/3/stats.js',
 ];

 const CORE_CACHE_NAME = 'restreviews-static-v1';
 const IMG_CACHE_NAME = 'restreviews-imgs-v1'; 
 const DATA_CACHE_NAME = 'restreviews-data-v1';
 var allCaches = [CORE_CACHE_NAME, IMG_CACHE_NAME, DATA_CACHE_NAME];
 
  
/**
 * SW Event Listeners
 */

 // Install Event

self.addEventListener('install',(event) => {
  console.log('sw installing...');

  // Initialize cache with base files: css, js, html 
  //TO DO: make grunt automatically build this list
  const initCacheURLs = ['/', '/restaurant.html',
    '/js/main.js', '/js/restaurant_info.js', '/js/utilities.js',
    '/js/third-party/picturefill.min.js',
    '/css/styles.css', '/css/inner_styles.css',
    '/css/third-party/google-fonts.css',
    '/data/restaurants.json',//for now
  ];
  event.waitUntil(caches.open(CORE_CACHE_NAME)).then(cache => {
    return cache.addAll(initCacheURLs);
  });

});


// Activate Event
self.addEventListener('activate', (event) => {
  console.log('sw activating...');
});


// Fetch Event
self.addEventListener('fetch', (fetchEvent) => {
  return fetchEvent.respondWith(fetchRequestCallback(fetchEvent.request));
});

function fetchRequestCallback (req) {
  //1. Parse the request
  var reqParsed = parseRequest(req) 

  //2. If no cache, return
  if (!reqParsed.isCache) return networkFetchHandler(req);

  //3. Send back cached response if exists, otherwise cache
  return caches.open(reqParsed.cacheName).then(cache => {
    return cache.match(reqParsed.cachedURL||req.url).then(cacheRes => {
      if (cacheRes) return cacheRes;

      //add to cache
      return networkFetchHandler(req).then(netRes => {
        if (netRes.ok) cache.put(reqParsed.cacheName, netRes.clone());
        return netRes;
      })
    })
  })
}

function parseRequest (req) {
  //1. Check to see if the request should be cached
  const filetype = req.url.split('.').pop(); //reference: uncertain
  const reqURL = new URL(req.url);
  let cacheFlag = false;
  let fileDir = reqURL.pathname.replace(rFilename, '');
  let cachedURL = ''; //not always necessary
  let cacheName = CORE_CACHE_NAME;

  if (reqURL.origin === location.origin) {

    //compare to the cached directories
    cacheFlag = testDir(fileDir);

  } else if (reqURL.origin === 'https://maps.googleapis.com') {
    //cache map api js files?? (maybe against terms and services)
    // cacheFlag = ['js'].indexOf(filetype) > -1;
  } else {
    //compare to external directories
    cacheFlag = EXT_CACHED.indexOf(reqURL.href) > -1 || EXT_CACHED.indexOf(req.referrer) > -1;
  }

  if (!cacheFlag && ['css', 'js'].indexOf(filetype) > 0) {
    console.log(`You're not caching: ${reqURL}`);
  }


  //2. Serve appropriate cache URL for images
  switch (fileDir) {
    case '/':
      cachedURL = '/root';
    case '/img/': 
      cachedURL = req.url.replace(/-\d+w.jpg$/, '');
      cacheName = IMG_CACHE_NAME;
      break;
    case '/data/':
      cacheName = DATA_CACHE_NAME; //for now, until IndexedDb
      break;
    default:
  }


  //OUTPUT
  return { 
    isCache: cacheFlag,
    cachedURL,
    cacheName
  };

}

 //This function returns true if the cached directory exists
 function testDir (str, rules = rCACHED_DIRS) { 
  for (let rExp of rules) {
    if ( rExp.test(str) ) return true;
  }
  return false;
} //idea based on user:spen @ stack overflow


function networkFetchHandler(req) {

  return fetch(req).then((res)=>{
    console.log(res.status)
    if (res.status === 200 || res.type == 'opaque') { // fetch ok

      return res; 

    } else {
      //fetch error
      console.log('trouble in the camp')
      console.log(res);
      console.log(res.status);
        return new Response("I need a custom handler");

    }

  }).catch((err) => {
    //something is really wrong
    console.log(err);
    return err;
  });

}

/**
 * TO DO: Features
 * 
 * 1. Switch from json to serve data to IndexedDb
 */
