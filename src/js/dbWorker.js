/*
Purpose of this worker: 
  * Handle alll traffic and requests to backend
  * Ensure db is up to date
  * Handle syncing of information when we reconnect
  * Push notifications to user about updates to information
  * Check for differences between the db and cache (push changes when necessray)
*/

//list of failed operations that I will try to do again later (when I'm back online)
//then I'll push a single message to the user

//idb code
"use strict";!function(){function e(e){return new Promise(function(t,n){e.onsuccess=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function t(t,n,o){var r,i=new Promise(function(i,u){e(r=t[n].apply(t,o)).then(i,u)});return i.request=r,i}function n(e,t,n){n.forEach(function(n){Object.defineProperty(e.prototype,n,{get:function(){return this[t][n]},set:function(e){this[t][n]=e}})})}function o(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return t(this[n],r,arguments)})})}function r(e,t,n,o){o.forEach(function(o){o in n.prototype&&(e.prototype[o]=function(){return this[t][o].apply(this[t],arguments)})})}function i(e,n,o,r){r.forEach(function(r){r in o.prototype&&(e.prototype[r]=function(){return e=this[n],(o=t(e,r,arguments)).then(function(e){if(e)return new c(e,o.request)});var e,o})})}function u(e){this._index=e}function c(e,t){this._cursor=e,this._request=t}function s(e){this._store=e}function p(e){this._tx=e,this.complete=new Promise(function(t,n){e.oncomplete=function(){t()},e.onerror=function(){n(e.error)},e.onabort=function(){n(e.error)}})}function a(e,t,n){this._db=e,this.oldVersion=t,this.transaction=new p(n)}function f(e){this._db=e}n(u,"_index",["name","keyPath","multiEntry","unique"]),o(u,"_index",IDBIndex,["get","getKey","getAll","getAllKeys","count"]),i(u,"_index",IDBIndex,["openCursor","openKeyCursor"]),n(c,"_cursor",["direction","key","primaryKey","value"]),o(c,"_cursor",IDBCursor,["update","delete"]),["advance","continue","continuePrimaryKey"].forEach(function(t){t in IDBCursor.prototype&&(c.prototype[t]=function(){var n=this,o=arguments;return Promise.resolve().then(function(){return n._cursor[t].apply(n._cursor,o),e(n._request).then(function(e){if(e)return new c(e,n._request)})})})}),s.prototype.createIndex=function(){return new u(this._store.createIndex.apply(this._store,arguments))},s.prototype.index=function(){return new u(this._store.index.apply(this._store,arguments))},n(s,"_store",["name","keyPath","indexNames","autoIncrement"]),o(s,"_store",IDBObjectStore,["put","add","delete","clear","get","getAll","getKey","getAllKeys","count"]),i(s,"_store",IDBObjectStore,["openCursor","openKeyCursor"]),r(s,"_store",IDBObjectStore,["deleteIndex"]),p.prototype.objectStore=function(){return new s(this._tx.objectStore.apply(this._tx,arguments))},n(p,"_tx",["objectStoreNames","mode"]),r(p,"_tx",IDBTransaction,["abort"]),a.prototype.createObjectStore=function(){return new s(this._db.createObjectStore.apply(this._db,arguments))},n(a,"_db",["name","version","objectStoreNames"]),r(a,"_db",IDBDatabase,["deleteObjectStore","close"]),f.prototype.transaction=function(){return new p(this._db.transaction.apply(this._db,arguments))},n(f,"_db",["name","version","objectStoreNames"]),r(f,"_db",IDBDatabase,["close"]),["openCursor","openKeyCursor"].forEach(function(e){[s,u].forEach(function(t){e in t.prototype&&(t.prototype[e.replace("open","iterate")]=function(){var t,n=(t=arguments,Array.prototype.slice.call(t)),o=n[n.length-1],r=this._store||this._index,i=r[e].apply(r,n.slice(0,-1));i.onsuccess=function(){o(i.result)}})})}),[u,s].forEach(function(e){e.prototype.getAll||(e.prototype.getAll=function(e,t){var n=this,o=[];return new Promise(function(r){n.iterateCursor(e,function(e){e?(o.push(e.value),void 0===t||o.length!=t?e.continue():r(o)):r(o)})})})});var d={open:function(e,n,o){var r=t(indexedDB,"open",[e,n]),i=r.request;return i&&(i.onupgradeneeded=function(e){o&&o(new a(i.result,e.oldVersion,i.transaction))}),r.then(function(e){return new f(e)})},delete:function(e){return t(indexedDB,"deleteDatabase",[e])}};"undefined"!=typeof module?(module.exports=d,module.exports.default=module.exports):self.idb=d}();

debugger
var failedMessages = [];
let onlineFlag = navigator.onLine;

navigator.addEventListener('online', updateConnectivity);
navigator.addEventListener('offline', updateConnectivity);

function updateConnectivity() {
  onlineFlag = navigator.onLine;
  console.log(`Am I online? ${navigator.onLine}`);
}

//============================================================
// GLOBAL FUNCTIONS
//============================================================

// self.importScripts('./library.js');

const DATABASE_URL = 'http://localhost:1337/';

const DB_PROMISED = idb.open('restreviews-db', 2, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 1:
      upgradeDB.deleteObjectStore('reviews'); //format has changed
      break;
    case 0:
      // upgradeDB.createObjectStore('reviews'); //don't do this
  }

  //Create a new object store with a different format
  var reviewStore = upgradeDB.createObjectStore('reviews');
  reviewStore.createIndex('restaurant_id', ['restaurant_id', 'created_at'], {
    unique: false
  });
  reviewStore.createIndex('created_at', 'created_at', {
    unique: false
  });

  var restStore = upgradeDB.createObjectStore('restaurants');
  restStore.createIndex('neighborhood', 'neighborhood', {
    unique: false
  });
  restStore.createIndex('name', 'name', {
    unique: false
  });
});

//============================================================
// RECEIVE MESSAGE
//============================================================

self.onmessage = (msg) => {

  //CHECK IF ONLINE

  console.log("Let's get this party started!!");

  switch(msg.data.type.toLowerCase()) {
    case 'fetch':
      fetchItem(msg);
      break;
    case 'post':
      postItem(msg);
      break;
    case 'put':
      putItem(msg);
      break;
    case 'connection':
      updateConnectivity();
  }
  ///self.postMessage(result); going out

}

self.onerror = () => {
  console.log('There was an error with the dbWorker');
}

//============================================================
// MAIN FUNCTIONS
//============================================================

function fetchItem(msg) {
  let resourceURI = msg.data.request;
  let t0 = performance.now();

  _handleDBFetch((err, res) => {

    if (!err && res) {
      let timeElapsed = performance.now() - t0;
      self.postMessage({
        error: null,
        response: res.resource,
        source: res.source,
        timeElapsed,
        originalRequest: resourceURI
      });
      return
    }

    //TODO: Error handler & time out handler
    //how do you want to handle errors? we won't give errors back
    //maybe we give back an explantion after a certain amount of time

  }, resourceURI);
}

function postItem(msg) {

  let formData = msg.data.body;

  //only have form data
  _postReview((err, res) => {
    if (!err & res) {
      self.postMessage({
        error: null,
        response: res.resource, 
        source: 'server',
        originalRequest: formaDta
      });
      return
    }

    //TO DO: QUEUE ON OFFLINE
  }, formData);

}

function putItem(msg) {
  //check to see if it is in the queue already and toggle it
}


//============================================================
// AUXILIARY FUNCTIONS
//============================================================


function _postReview(callback, formData) {

  let postURL = `${DATABASE_URL}${urlPath}/reviews`;

  fetch(postURL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(formData),
  }).then(res => {
    if (!res.ok) throw res;
    return res.json();
  }).then(review => { 

    //This should be a redirect from the backend if this works
    console.log(`New Review from ${unescape(review.name)} created.`); //user information


    //Save the review to the database
    _putDBItem(review, 'reviews');
 

  }).catch(err => {
    //Let the user know what went wrong (in a hidden dialog box)

    authErrHandler(err, formError);
    formError.classList.add("invalid");
  });

}

function _handleDBFetch(callback, urlPath) {

  let callbackSent = false;
  let fetchURL = `${DATABASE_URL}${urlPath}`.replace(/([^:]\/)\/+/g, "$1");

  //FIRST: Parse Input
  let opts = _parseURLInput(fetchURL);
  let id = opts.value;

  const dbEntriesPromised = _getDBItem(opts.endpoint, opts.value, opts.index_name);

  dbEntriesPromised.then(dbEntriesCached => {

    if (!id) dbEntriesCached.reverse();

    //If you find the db fetch, use it
    if (dbEntriesCached.length > 0 || dbEntriesCached.id) {
      callback(null, {
        resource: dbEntriesCached,
        source: 'cache'
      });
      callbackSent = true;
    }

    console.log("Na man, I'm good")
    let xhr = new XMLHttpRequest();
    xhr.open('GET', fetchURL);
    xhr.onload = () => {
      console.log('I have an XHR update');
      if (xhr.status == 200) {
        const dbRecords = JSON.parse(xhr.responseText);

        //run the callback as soon as a response comes
        if (!callbackSent) {
          callback(null, {resource: dbRecords, source: 'server'});
          callbackSent = true;
        } 

        //ALWAYS update the items in the idb
        if (Array.isArray(dbRecords)) {
          dbRecords.forEach(record => {
            _putDBItem(record, opts.endpoint);
          });
        } else {
          _putDBItem(dbRecords, opts.endpoint);
        }
        
      } else {
        let err = '';
        if (id) {
          err = `${endpoint[0].toUpperCase()}${endpoint.substr(1)} does not exist`;
        } else {
          err = `Request failed and ${endpoint}(s) not cached. Returned status of ${xhr.status}`;
          callback(err, {resource: null, source: 'null'});
        }

      }
    }
    xhr.send();
    console.log("I sent an  XHR")

  })

}


//convert request URL for restaurant or review to JSON
function _parseURLInput(urlString) {

  let options = {}; //endpoint, index_name, value

  let url = new URL(urlString);

  //get query parameters
  let paramsJson = getJsonFromUrl(url.search);
  if (paramsJson) {
    options.index_name = Object.keys(paramsJson)[0]
    options.value = paramsJson[options.index_name];
  };

  //get endpoint and value
  let pathname = url.pathname;
  let folders = pathname.split('/').filter(x => x);
  let endpoint = folders[0];
  options.endpoint = endpoint;

  if (folders.length > 1) {
    let value = folders.pop();
    options.value = value;
  }

  return options;

  //Stack Exchange Function: https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
  function getJsonFromUrl(queryIn) {

    if (!queryIn) return;

    //include the '?' in the query string
    var query = queryIn.substr(1);
    var result = {};
    query.split("&").forEach(function (part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;

  }

}




function _getDBItem(store_name, value, index_name) {
  return DB_PROMISED.then(db => {
    const tx = db.transaction(store_name);

    const dbTable = tx.objectStore(store_name);
    let dbIdx = dbTable;

    //modify in the event of an index based search
    if (index_name) {
      dbIdx = dbTable.index(index_name);
    } else {
      value = parseInt(value);
    }

    //Retrieve single value or entire table
    if (value) {
      return dbIdx.getAll(value);
    } else {
      return dbIdx.getAll();
    }

  })

}

function _putDBItem(entry, store_name) {
  //returns true if success, false if fails
  return DB_PROMISED.then(db => {
    const tx = db.transaction(store_name, 'readwrite');
    const reviewTable = tx.objectStore(store_name);
    reviewTable.put(entry, parseInt(entry.id));

    return tx.complete;
  }).then(() => true).catch(() => false)

}
