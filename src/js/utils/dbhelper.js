/**
 * Common database helper functions.
 */
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
  reviewStore.createIndex('restaurant_id', 'restaurant_id', {
    unique: false
  });
  reviewStore.createIndex('createdAt', 'createdAt', {
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

class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}`; //DEV only, need to change in production
  }

  static get dbPromised() {
    return DB_PROMISED;
  }

  static getDBResource(callback, url) {

    //validate url
    if (!url) {
      console.log('EMPTY Request sent to the Worker');
      callback('There was not information in request.', []);
      return;
    } else if (typeof (url) != 'string') {
      console.log('WRONG TYPE OF Request sent to the Worker');
      callback(`Data was of type: ${typeof(url)} instead of string `, []);
      return;
    }

    DBHelper._handleDBFetch((err, res) => {
      console.log(`${url} was fetched from: ${res.source}`);
      callback(err, res.resource);
    }, url);


  }

  //==============================================
  // PUBLIC FUNCTIONS 
  //==============================================


  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    DBHelper.getDBResource(callback, 'restaurants/');
  }

  /**
   * Fetch all reviews.
   */
  static fetchAllReviews(callback) {
    DBHelper.getDBResource(callback, 'reviews/');
  }


  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(rest_id, callback) {

    // fetch all restaurants with proper error handling.
    DBHelper.getDBResource(callback, `restaurants/${rest_id}`);
  }

  /**
   * Fetch a reviews by restaurant id
   */
  static fetchReviewsByRestaurantId(rest_id, callback) {

    // fetch all restaurants with proper error handling.
    DBHelper.getDBResource(callback, `reviews?restaurant_id=${rest_id}`);
  }




  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    }, 'restaurants');
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    }, 'restaurants');
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // let urlString = 'restaurants'; 
    // let queryFlag = false; 
    // if (cuisine != 'all') {
    //   urlString+= `&cuisine_type=${cuisine}`;
    //   queryFlag = true;
    // }
    // if (neighborhood != 'all') {
    //   urlString += `&neighborhood=${neighborhood}`;
    //   queryFlag = true;
    // }

    // Fetch all restaurants (can be optimized using index)
    //This code is redundant and needs improvement

    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants;
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    }, '/restaurants');
  }

  static parseCuisines (restaurants) {
    
    const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
    
    // Remove duplicates from cuisines
    const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i);
    return uniqueCuisines;
  }

  static parseNeighborhoods (restaurants) {

    const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
    
    // Remove duplicates from neighborhoods
    const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
    return uniqueNeighborhoods;

  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    },'/restaurants');
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.getDBResource((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    },'/restaurants');
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  static urlForReview(review) {
    return (`./restaurant.html?id=${review.restaurant_id}#review${review.id}`);
  }


  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`../images_src/${restaurant.photograph}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map, label) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      // label: {text: `${restaurant.id}`, color: 'white'},
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP,
      rest_id: restaurant.id, 
      is_fav: restaurant.is_favorite,
      icon: `./img/icons/map-icon-${restaurant.is_favorite ? 'favorite' : 'regular'}.png`,
    });

    return marker;
  }

  /**
   * Convert rating to stars (a little out of place, I know)
   */

  static rating2stars(rating) {

    const totalStars = 5;
    const charFull = '&#61445;'; //font-awesome: fa-star, \f005
    const charHalf = '&#61731;'; //font-awesome: fa-star-half-o \f123
    const charEmpty = '&#61446;'; //font-awesome: fa-star-o, \f006

    let fullStars = Math.trunc(rating);
    let emptyStars = Math.trunc(totalStars - rating);
    let hasHalfStar = fullStars + emptyStars < totalStars;

    //Return the star characters as a string
    return charFull.repeat(fullStars) + charHalf.repeat(hasHalfStar * 1) + charEmpty.repeat(emptyStars);
  }


  //==============================================
  // FAVORITES
  //==============================================

  static setFavoriteStatus(favObj, cb) {
    /*INPUT: favObj = {id: integer, is_favorite: Boolean}*/

    //Update in the local database
    let dbSuccess = DBHelper._changeDBFavorite(favObj);
    
    //Update on server
    if (navigator.onLine) {

      DBHelper._postFavoriteDB(favObj, res => {

        //Add to Q if server error
        if (res && res.retry) {
          DataSync.queueFavorite(favObj);
        } 
        cb(res); // send back the res
      });
    } else { //OFFLINE
      //Add to Q
      DataSync.queueFavorite(favObj);
    }
      
  }

  static _postFavoriteDB(favObj, cb) {

     //put method restaurants/rest_id, {is_favorite: value}
    fetch(`${DBHelper.DATABASE_URL}/restaurants/${favObj.id}`,{
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({is_favorite: favObj.is_favorite}),
    }).then(res => {
      if (!res.ok) throw res;
      return res.json();
    }).then(restaurant => {

      //Update idb (for good measure)
      DBHelper._putDBItem(restaurant,'restaurants');

      //Send back the response
      cb({ok: true, status: 200, body:restaurant});

    }).catch( err => cb(DBHelper.serverErrHandler(err)) );

  }


  //==============================================
  // REVIEWS
  //==============================================
  
  static addUserReview(formData, rest_name, cb) { 
    //Notify user with callback, (errMsg, successMsg);

    //Save the review to idb (autogenerate ID) and send user success
    let formDataDB, note;

    if (!formData) debugger; //something is reaally wrong

    if (formData.id) {
      //Already in IDB
      formDataDB = formData;
      rest_name = rest_name ? rest_name : formDataDB.restaurant_name;

    } else {

      //Add to IDB
      formDataDB = formData;
      var tempId = `-${DataSync.reviewQueue.length+1}`;
      var userNotification = '';
      formDataDB.id = tempId;

      DBHelper._putDBItem(formDataDB,'reviews');

    }

    

    //Check to see if use is online
    if (navigator.onLine) {

      DBHelper._postUserReview(formDataDB, (res)=> {
        
        

        if (res && res.ok) { //res fields --> ok, status, body || err: also retry
          //Successful

          note = {
            title: 'Review Posted',
            status: 'success',
            message: `Review${rest_name ? ' for ' +rest_name:''} created. Thanks!`,
          };

        } else if (res && res.retry) { //server offline
          //Server offline, poll to see when the server will be back online

          note = {
            title: 'Review Pending',
            status: 'info',
            message: `Review${rest_name ? ' for ' +rest_name: ''}will be posted when you reconnect.`,
          };

          //Queue to send later, poll server (no listener currently setup)!!!
          formDataDB.restaurant_name = rest_name;
          res.retry = true;
          DataSync.queueReview(formDataDB);

        } else if (res && !res.retry) {
          //Server Error, something wrong with form
          note = {
            title: 'Error',
            status: 'failure',
            message: `There was an error posting your review. See form for details`,
          };

          //remove from DB 
          DBHandler._deleteDBItem(formDataDB.id);

        } else { 

            note = {
            title: 'Error',
            status: 'failure',
            message: `An unknown error occured. Please email support.`,
          };

          res.body = 'An unknown error occured. Please email support.';

          //remove from DB 
          DBHandler._deleteDBItem(formDataDB.id);
        }

        //notify  user
        HTMLHelper.postNotification(note);
        //udpate frontend
        if (cb) cb(res);

      });

    } else {
      
      note = {
        title: 'Review Pending',
        status: 'info',
        message: `Review${rest_name ? ' for ' +rest_name: ''}will be posted when you reconnect.`,
      };

      //Queue to send later
      formDataDB.restaurant_name = rest_name;
      DataSync.queueReview(formDataDB);

      HTMLHelper.postNotification(note);
      if (cb) cb({ok: false, retry: true,status: 301, body: formDataDB});

    }
  }


  static _postUserReview(formDataDB, cb) {

    fetch(`${DBHelper.DATABASE_URL}/reviews`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(formDataDB),
    }).then(res => {

      if (!res.ok) throw res;
      return res.json();
    }).then(review => {
      //Replace the idb review with an updated version (quietly)
      DBHelper._replaceDBReview(formDataDB.id, review);

      //Send user success message
      cb({ok: true, status: 200, body: review});

    }).catch( err => {

      //let user know error
      console.log(err);
      cb(DBHelper.serverErrHandler(err));

    });

    
  }

  //==============================================
  // PRIVATE FUNCTIONS (mainly)...need to reorganize
  //==============================================
  static _handleDBFetch(callback, urlPath) {

    let callbackSent = false;
    let fetchURL = `${DBHelper.DATABASE_URL}/${urlPath}`.replace(/([^:]\/)\/+/g, "$1");

    //FIRST: Parse Input
    let opts = DBHelper._parseURLInput(fetchURL);
    let id = opts.value;

    const dbEntriesPromised = DBHelper._getDBItem(opts.endpoint, opts.value, opts.index_name);

    dbEntriesPromised.then(dbEntriesCached => {

      if (opts.endpoint=='reviews') dbEntriesCached.reverse();

      //If you find the db fetch, use it
      if (dbEntriesCached.length > 0 || dbEntriesCached.id) {
        callback(null, {
          resource: dbEntriesCached,
          source: 'cache'
        });
        callbackSent = true;
      }

      let xhr = new XMLHttpRequest();
      xhr.open('GET', fetchURL);
      xhr.onload = () => {
        if (xhr.status == 200) {
          const dbRecords = JSON.parse(xhr.responseText);

          //run the callback as soon as a response comes
          if (!callbackSent) {
            callback(null, {
              resource: dbRecords,
              source: 'server'
            });
            callbackSent = true;
          }

          //ALWAYS update the items in the idb
          if (Array.isArray(dbRecords)) {
            dbRecords.forEach(record => {
              DBHelper._putDBItem(record, opts.endpoint);
            });
          } else {
            DBHelper._putDBItem(dbRecords, opts.endpoint);
          }

        } else {
          let err = '';
          if (id) {
            err = `${opts.endpoint[0].toUpperCase()}${opts.endpoint.substr(1)} does not exist`;
          } else {
            err = `Request failed and ${opts.endpoint}(s) not cached. Returned status of ${xhr.status}`;
            callback(err, {
              resource: null,
              source: 'null'
            });
          }

        }
      }
      xhr.send();

    })

  }

  static serverErrHandler(errRes, msgDiv) {
    //errRes is what comes from the SAILS backend
    //Parse detailed error message
  
    if (errRes.status) { //err from backend
      errRes.text().then(errMessage => {
        switch (errRes.status) {
          case 401: //wrong password
          case 403: //user authenticated using another platform/method
          case 404: //user not found
          default: //another error
  
            if (msgDiv) {
              msgDiv.innerHTML = errMessage; //pring to a div
            } else {

              console.log(`ERR ${errRes.status}: ${errMessage}`); //print to console
              return {ok: false, status: errRes.status, body: errMessage, retry: false};
            }
        }
      });
  
    } else { //not a backend error

      if (errRes.stack && errRes.stack == "TypeError: Failed to fetch") {
        return {ok: false, retry: true, status: 'waiting', body: 'Failed to fetch, Server not found'};
      }
      if (msgDiv) {
        msgDiv.innerHTML = errRes;
      } else {
        console.log(errRes);
      }
  
    }
  }

  //convert request URL for restaurant or review to JSON
  static _parseURLInput(urlString) {

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

  static _getDBItem(store_name, value, index_name) {
    return DBHelper.dbPromised.then(db => {
      const tx = db.transaction(store_name);

      const dbTable = tx.objectStore(store_name);
      let dbIdx = dbTable;

      //modify in the event of an index based search
      if (index_name) {
        dbIdx = dbTable.index(index_name);
      }

      value = isNaN(parseInt(value)) ? value : parseInt(value);

      //Retrieve single value or entire table


      if (value) { 
        return dbIdx.getAll(parseInt(value));
      } else {
        return dbIdx.getAll();
      }

    })

  }

  static _putDBItem(entry, store_name) {
    //returns true if success, false if fails
    return DBHelper.dbPromised.then(db => {
      const tx = db.transaction(store_name, 'readwrite');
      const reviewTable = tx.objectStore(store_name);
      reviewTable.put(entry, parseInt(entry.id));

      return tx.complete;
    }).then((res) => {
      // console.log('EntryAdded');
      return true;
    }).catch((err) => {
      // console.log('Problem Posting');
      return false;
    })

  }

  static _changeDBFavorite(entry) {

    return DBHelper.dbPromised.then( async db => {
      const tx = db.transaction('restaurants','readwrite');
      const dbTable = tx.objectStore('restaurants');
      
      //Retrieve single value or entire table
      let restaurant = await dbTable.get(parseInt(entry.id));

      if (!restaurant) return //no need for error, will update on next sync

      //Update and replace
      restaurant.is_favorite = Boolean(entry.is_favorite);
      dbTable.put(restaurant, parseInt(entry.id));

      //Done
      return tx.complete;
    });


  }

  static _replaceDBReview(old_id, new_entry) {
    return DBHelper.dbPromised.then( db => {
      const tx = db.transaction('reviews', 'readwrite');
      const reviewTable = tx.objectStore('reviews');
      reviewTable.delete(parseInt(old_id));
      reviewTable.put(new_entry, parseInt(new_entry.id));

      return tx.complete;
    }).then(() => true).catch(()=> false);
  }

  static _deleteDBReview(old_id) {
    return DBHelper.dbPromised.then( db => {
      const tx = db.transaction('reviews', 'readwrite');
      const reviewTable = tx.objectStore('reviews');
      reviewTable.delete(parseInt(old_id));
      return tx.complete;
    }).then(() => true).catch(()=> false);
  }


}