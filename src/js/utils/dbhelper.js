/**
 * Common database helper functions.
 */

const DB_PROMISED = idb.open('restreviews-db', 1, upgradeDB => {
  switch (upgradeDB.oldVersion) {
    case 0:
      upgradeDB.createObjectStore('reviews');
  }
});

class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337; // Change this to your server port
    return `http://localhost:${port}/restaurants`;
  }

  static get dbPromised() {
    return DB_PROMISED;
  }


  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    DBHelper._handleDBfetch(callback);
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {

    // fetch all restaurants with proper error handling.
    DBHelper._handleDBfetch(callback, id);
  }



  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
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
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
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
    DBHelper.fetchRestaurants((error, restaurants) => {
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



  static _handleDBfetch(callback, id) {

    let fetchURL = DBHelper.DATABASE_URL;

    if (id) fetchURL = fetchURL + `/${id}`;

    //Get the ID from the url
    const dbReviewsPromised = DBHelper._getDbReview(id);

    dbReviewsPromised.then(dbReviewsCached => {

      //If you find the db fetch, use it
      if (!id && dbReviewsCached) callback(null, dbReviewsCached);

      let xhr = new XMLHttpRequest();
      xhr.open('GET', fetchURL);
      xhr.onload = () => {
        if (xhr.status == 200) {
          const restaurants = JSON.parse(xhr.responseText);

          if (!id) {
            //update the items in the idb
            restaurants.forEach(rest => {
              DBHelper._putDbReview(rest)
            });
          }

          //run the callback
          callback(null, restaurants);
        } else if (dbReviewsCached) {
          callback(null, dbReviewsCached);
        } else {
          let err = '';
          if (id) {
            err = 'Restaurant does not exist';
          } else {
            err = `Request failed and review(s) not cached. Returned status of ${xhr.status}`;
          }

          callback(err, null);
        }
      }
      xhr.send();


    })


  }

  static _getDbReview(id) {
    return DBHelper.dbPromised.then(db => {
      const tx = db.transaction('reviews');

      const reviewTable = tx.objectStore('reviews');

      if (id) {
        return reviewTable.get(parseInt(id));
      } else {
        return reviewTable.getAll();
      }
    })

  }

  static _putDbReview(review) {
    //returns true if success, false if fails
    return DBHelper.dbPromised.then(db => {
      const tx = db.transaction('reviews', 'readwrite');
      const reviewTable = tx.objectStore('reviews');
      reviewTable.put(review, parseInt(review.id));

      return tx.complete;
    }).then(() => true).catch(() => false)

  }


}