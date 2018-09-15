/**
 * TODO:Features & Chores
 *  1. Link the map to the marker in mobile view
 *     (click once, preview place in popup)
 *  2. Add cuisine type to photo area?
 *  3. Clean up, eslint, and transpile all CSS, JS, and image files
 *  4. Create a JS controller and split the tasks into different files
 * 
 */

/**
 * Global vars
 */
let restaurants,
  neighborhoods,
  cuisines;
var map; 
var markers = [];
var isMapVisible = false;


/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM Content loaded');
  // fetchNeighborhoods();
  // fetchCuisines();
  console.log('Fetch complete');
});


/**
 * Fetch all neighborhoods and set their HTML.
 */
fetchNeighborhoods = () => {
  DBHelper.fetchNeighborhoods((error, neighborhoods) => {
    if (error) { // Got an error
      console.error(error);
    } else {
      self.neighborhoods = neighborhoods;
      fillNeighborhoodsHTML();
    }
  });
}

/**
 * Set neighborhoods HTML.
 */
fillNeighborhoodsHTML = (neighborhoods = self.neighborhoods) => {
  const select = document.body.querySelector('#neighborhoods-select');
  neighborhoods.forEach(neighborhood => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
}

/**
 * Fetch all cuisines and set their HTML.
 */
fetchCuisines = () => {
  DBHelper.fetchCuisines((error, cuisines) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.cuisines = cuisines;
      fillCuisinesHTML();
    }
  });
}

/**
 * Set cuisines HTML.
 */
fillCuisinesHTML = (cuisines = self.cuisines) => {
  const select = document.body.querySelector('#cuisines-select');

  cuisines.forEach(cuisine => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
}

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  let loc = {
    lat: 40.722216,
    lng: -73.987501
  };
  //Set map height
  const mapEl = document.body.querySelector('#map');

  //Create function for resizing map to parent container
  setMapSize = () => {

    //set to 0 first, so that the flex box can calculate the container size
    mapEl.style.height = 0;
    mapEl.style.height = document.body.querySelector('.section-map').clientHeight + 'px';
  };

  //Create a listener to handle map size changes
  google.maps.event.addDomListener(window, 'resize', setMapSize);

  //Create a new map
  self.map = new google.maps.Map(mapEl, {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });

  // Remove tab index from map items after tiles have been loaded 
  HTMLHelper.setMapTabOrder(self.map);


  updateRestaurants();
  setMapSize(); //set initial map size

}

/**
 * Show or hide map
 */

function toggleMap() {
  let mapContainer = document.body.querySelector('.section-map');
  let btnSwitchView = document.body.querySelector('.switch-view');

  if (isMapVisible) {
    mapContainer.classList.remove("show");
    btnSwitchView.innerHTML = "Show Map";

    //remove tab index 
  } else {
    mapContainer.classList.add("show");
    btnSwitchView.innerHTML = "Show List";
  }
  isMapVisible = !isMapVisible;
}

/**
 * Update page and map for current restaurants.
 */
var updateRestaurantCount =  0;
updateRestaurants = () => {
  const cSelect = document.body.querySelector('#cuisines-select');
  const nSelect = document.body.querySelector('#neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  self.selectedCuisine = cuisine;
  self.selectedNeighborhood = neighborhood;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error || !restaurants || restaurants.length < 1) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
  updateRestaurantCount++;
  console.log(`Update Restaurants has run: ${updateRestaurantCount} times`)
}

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
resetRestaurants = (restaurants) => {
  // Remove all restaurants
  self.restaurants = [];
  const ul = document.body.querySelector('.restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  self.markers.forEach(m => m.setMap(null));
  self.markers = [];
  self.restaurants = restaurants;
}

/**
 * Create all restaurants HTML and add them to the webpage.
 */
fillRestaurantsHTML = (restaurants = self.restaurants) => {

  if (!restaurants || restaurants.length < 1) {
    cosole.log("There aren't any restaurants, somthing is wrong");
  }

  const ul = document.body.querySelector('.restaurants-list');
  restaurants.forEach((restaurant, idx) => {
    ul.append(createRestaurantHTML(restaurant));

  });

  addMarkersToMap();

  //Let user know if results 
  //Started with just notifying them in nothing found, but it's weird not to do both
  const cuisine = self.selectedCuisine;
  const neighborhood = self.selectedNeighborhood;

  if (restaurants.length < 1) {
    let li = document.createElement('li');
    li.innerHTML = `No restaurant reviews found for <wbr> ${cuisine} cuisine in ${neighborhood}.`;
    li.setAttribute('aria-role', 'alert');
    li.setAttribute('aria-live', 'polite');
    ul.append(li);

  }
  // Notify user of number of results found?
  // else if (cuisine != "all" || neighborhood !="all" ) { //may be overkill?
  //   let li = document.createElement('li');
  //   document.body.querySelector('aria-alert').innerHTML = `${restaurants.length} reviewed restaurants found.`;
  // }

  //Setup lazy loading (third-party code)
  const observer = lozad(); // lazy loads elements with default selector as '.lozad'
  observer.observe();
}

/**
 * Create restaurant HTML.
 */

function cleanInput(stringInput) {
  return document.createTextNode(String(stringInput));
};


createRestaurantHTML = (restaurant) => {

  const li = document.createElement('li');
  const a_wrapper = document.createElement('a');
  a_wrapper.href = DBHelper.urlForRestaurant(restaurant);


  const name = document.createElement('h1');
  name.appendChild(cleanInput(restaurant.name));
  name.className = 'restaurant-name';
  a_wrapper.appendChild(name);

  const content_wrapper = document.createElement('div');
  content_wrapper.className = 'restaurant-info-wrapper';

  const text_wrapper = document.createElement('div');
  text_wrapper.className = 'restaurant-info-text';

  const rating_wrapper = document.createElement('div');
  rating_wrapper.className = 'rating';

  
  if (restaurant.average_rating)
  {
    const ratingText = document.createElement('p');
    ratingText.innerHTML = restaurant.average_rating.toFixed(1);
    ratingText.setAttribute('aria-label', `Average rating ${ratingText.innerHTML}`);
    ratingText.className = 'rating-text';
    rating_wrapper.appendChild(ratingText);
  }


  const ratingIcon = document.createElement('p');
  ratingIcon.innerHTML = DBHelper.rating2stars(restaurant.average_rating);
  ratingIcon.className = 'rating-stars';
  ratingIcon.setAttribute('aria-hidden', 'true');
  rating_wrapper.appendChild(ratingIcon);

  const nReviews = document.createElement('p');
  const reviewCount = restaurant.total_reviews ?  `${restaurant.total_reviews} Reviews`: 'No Reviews Yet';
  nReviews.appendChild(cleanInput(reviewCount));
  nReviews.className = 'review-count';
  rating_wrapper.appendChild(nReviews);

  text_wrapper.appendChild(rating_wrapper);


  const neighborhood = document.createElement('p');
  if (restaurant.neighborhood)
  {
    neighborhood.appendChild(cleanInput(restaurant.neighborhood));
    text_wrapper.appendChild(neighborhood);
  }

  const address = document.createElement('p');

  if (restaurant.address){
    //don't let user define address via textbox
    address.innerHTML = restaurant.address.replace(", ", "<br>");
  } else {
    address.innerText = 'Address not listed';
  }
  text_wrapper.appendChild(address);
  content_wrapper.appendChild(text_wrapper);

  //mainly for different screen density
  const image = HTMLHelper.generateImgHTML(restaurant, 200, [200, 400, 600, 800], '200px');
  image.classList.add('restaurant-img');
  content_wrapper.appendChild(image);

  a_wrapper.appendChild(content_wrapper);


  //link the html element to the marker index
  a_wrapper.setAttribute('data-rest-id', restaurant.id);
  a_wrapper.addEventListener('mouseenter', (e) => {
    startAnimation(e, restaurant.id)
  });
  a_wrapper.addEventListener('focus', (e) => {
    startAnimation(e, restaurant.id)
  });
  a_wrapper.addEventListener('mouseleave', (e) => {
    stopAnimation(e, restaurant.id)
  });
  a_wrapper.addEventListener('blur', (e) => {
    stopAnimation(e, restaurant.id)
  });

  li.append(a_wrapper);

  return li;

  function startAnimation(e, id) {
    //find the matching id (would be faster to track index)
    let thisMarker = self.markers.find((element) => {
      return element.rest_id == id
    });
    thisMarker.setAnimation(google.maps.Animation.BOUNCE);
  }

  function stopAnimation(e, id) {
    let thisMarker = self.markers.find((element) => {
      return element.rest_id == id
    });
    thisMarker.setAnimation(null);
  }

}


/**
 * Add markers for current restaurants to the map.
 */
addMarkersToMap = (restaurants = self.restaurants) => {
  restaurants.forEach(restaurant => {
    // Add marker to the map
    const marker = DBHelper.mapMarkerForRestaurant(restaurant, self.map);
    google.maps.event.addListener(marker, 'click', () => {
      window.location.href = marker.url
    });
    self.markers.push(marker);
  });
}

/** ====================================================================
 * Service Worker Section
 *  ====================================================================
 */


/* SW TIPS
 * 
 * ++ Accessing SW: navigator.serviceWorker.controller
 * ++ Shift + F5: reload bypassing sw
 * 
 */

/**
 * Register the service worker
 */

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    })
    .then((reg) => {
      console.log('sw registered');
    })
    .catch((err) => {
      console.log('sw error');
    });
}
