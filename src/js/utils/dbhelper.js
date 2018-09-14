/**
 * Common database helper functions.
 */





class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}`;  //DEV only, need to change in production
  }

  static get dbPromised() {
    return DB_PROMISED;
  }

  static getDBResource(callback, url) {

    //validate url
    if (!url) {
      console.log('EMPTY Request sent to the Worker');
      callback('There was not information in request.',[]);
      return;
    } else if (typeof(url) != 'string') {
      console.log('WRONG TYPE OF Request sent to the Worker');
      callback(`Data was of type: ${typeof(url)} instead of string `,[]);
      return;
    }

 
    //If browser supports window worker
    if (window.Worker) {
      console.log('WebWorker ativated')

      let dbWorker = new Worker('./js/dbWorker.js');
      
      dbWorker.postMessage({request: url});

      dbWorker.onmessage = (msg) => {
        
        if (!msg.data.response && !msg.data.error) {
          callback('something is wrong with the web worker...sorry', undefined);
          return
        }

        callback(msg.data.error, msg.data.response);
        console.log(`Web Worker is done in: ${msg.data.timeElapsed} seconds?`)
      }

    } else {
      //I will need a plan b
      console.log('new paln, who dis?')

    }

  }



  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    DBHelper.getDBResource(callback,'restaurants/');
  }

  /**
   * Fetch all reviews.
   */
  static fetchAllReviews(callback) {
    DBHelper.getDBResource(callback,'reviews/');
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
    },'restaurants');
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
    },'restaurants');
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
    });
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
    });
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
      rest_id: restaurant.id
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


}


function WebWorkerPolyfill() {
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
    reviewStore.createIndex('restaurant_id', ['restaurant_id','created_at'], {unique: false});
    reviewStore.createIndex('created_at','created_at',{unique:false});
  
    var restStore = upgradeDB.createObjectStore('restaurants');
    restStore.createIndex('neighborhood','neighborhood',{unique: false});
    restStore.createIndex('name', 'name', {unique:false});
  });
  

}
