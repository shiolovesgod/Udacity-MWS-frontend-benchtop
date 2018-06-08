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
  fetchNeighborhoods();
  fetchCuisines();
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
  
  setMapSize = () => { 
    
    //set to 0 first, so that the flex box can calculate the container size
    mapEl.style.height = 0;
    mapEl.style.height = document.body.querySelector('.section-map').clientHeight + 'px'; 
  };

  //Create a listener to handle map size changes
  google.maps.event.addDomListener(window, 'resize', setMapSize);
  self.map = new google.maps.Map(mapEl, {
    zoom: 12,
    center: loc,
    scrollwheel: false
  });

  updateRestaurants();
  setMapSize(); //call the function
}

/**
 * Show or hide map
 */

function toggleMap(){
  let mapContainer = document.body.querySelector('.section-map');
  let btnSwitchView = document.body.querySelector('.switch-view');

  if (isMapVisible){
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
updateRestaurants = () => {
  const cSelect = document.body.querySelector('#cuisines-select');
  const nSelect = document.body.querySelector('#neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  DBHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, (error, restaurants) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      resetRestaurants(restaurants);
      fillRestaurantsHTML();
    }
  })
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
  const ul = document.body.querySelector('.restaurants-list');
  restaurants.forEach(restaurant => {
    ul.append(createRestaurantHTML(restaurant));
  });
  addMarkersToMap();
}

/**
 * Create restaurant HTML.
 */
createRestaurantHTML = (restaurant) => {

  const a_wrapper = document.createElement('a');
  a_wrapper.href = DBHelper.urlForRestaurant(restaurant);
  const li = document.createElement('li');


  const name = document.createElement('h1');
  name.innerHTML = restaurant.name;
  name.className = 'restaurant-name';
  li.append(name);

  const content_wrapper = document.createElement('div');
  content_wrapper.className = 'restaurant-info-wrapper';

  const text_wrapper = document.createElement('div');
  text_wrapper.className = 'restaurant-info-text';
  

  const rating_wrapper = document.createElement('div');
  rating_wrapper.className = 'rating';
   
    const ratingText = document.createElement('p');
    ratingText.innerHTML = restaurant.average_rating.toFixed(1);
    ratingText.className = 'rating-text';
    rating_wrapper.append(ratingText);

    const ratingIcon = document.createElement('p');
    ratingIcon.innerHTML = rating2stars(restaurant.average_rating);
    ratingIcon.className = 'rating-stars';
    rating_wrapper.append(ratingIcon);

    const nReviews = document.createElement('p');
    nReviews.innerHTML = restaurant.total_reviews + ' Reviews';
    nReviews.className = 'review-count';
    rating_wrapper.append(nReviews);
  
  text_wrapper.append(rating_wrapper);

    
  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  text_wrapper.append(neighborhood);
  
  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  text_wrapper.append(address);

  content_wrapper.append(text_wrapper);

  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  content_wrapper.append(image);

  li.append(content_wrapper);
  
  a_wrapper.append(li);

  return a_wrapper
}


/**
 * Calculate the number of stars (should I use hearts?)
 */

function rating2stars(rating) {
  const totalStars = 5;
  const charFull = '&#61445;'; //font-awesome: fa-star, \f005
  const charHalf = '&#61731;'; //font-awesome: fa-star-half-o \f123
  const charEmpty = '&#61446;'; //font-awesome: fa-star-o, \f006

  let fullStars = Math.trunc(rating);
  let emptyStars = Math.trunc(totalStars - rating);
  let hasHalfStar = fullStars+emptyStars < totalStars;

  //Return the star characters as a string
  return charFull.repeat(fullStars)+charHalf.repeat(hasHalfStar*1)+charEmpty.repeat(emptyStars);
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