/**
 * TODO:Features & Chores
 *  1. Link the map to the marker in mobile view
 *     (click once, preview place in popup)
 *  2. On hover map icon, highlight corresponding 
 *     location
 *  3. Create a helper file for common map controls
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

   // Remove tab index from map items after tiles have ben loaded 
   // I may need to move the tabindex value to 1 for non-map elements
   google.maps.event.addListener(self.map, 'tilesloaded', () => {

     //A little sloppy, but the timeout makes sure the controls are loaded
     setTimeout(() => {

       //Remove tab index from: iframe and div
       document.querySelector('#map .gm-style div:first-child').setAttribute('tabindex', -1);
       document.querySelector('#map .gm-style iframe').setAttribute('tabindex', -1);

       //Tab through divs first
       document.querySelectorAll('#map .gm-style div[role="button"]')
         .forEach((el) => {
           el.setAttribute('tabindex', 0); //2
           el.classList.add = "map-control";
         }); //map & satellite

       //Then Buttons
       document.querySelectorAll('#map .gm-style button')
         .forEach((el) => {
           el.setAttribute('tabindex', 0); //3
           el.classList.add = "map-control";
         }); //zoom in, zoomout, full screen

       //Finally a's (currently not focusable)
       document.querySelectorAll('#map .gm-style a[href]')
         .forEach((el) => {
           el.setAttribute('tabindex', -1);
           el.classList.add = "map-link";
         }); //zoom in, zoomout, full screen
     }, 500);
   });


   updateRestaurants();
   setMapSize(); //set initial map size

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
  restaurants.forEach((restaurant, idx) => {
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
    ratingIcon.innerHTML = DBHelper.rating2stars(restaurant.average_rating);
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

  address.innerHTML = restaurant.address.replace(", ","<br>");
  text_wrapper.append(address);

  content_wrapper.append(text_wrapper);

  const image = document.createElement('img');
  image.className = 'restaurant-img';
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  content_wrapper.append(image);

  li.append(content_wrapper);
  
  a_wrapper.append(li);

  
  //link the html element to the marker index
  a_wrapper.setAttribute('data-rest-id', restaurant.id);
  a_wrapper.addEventListener('mouseenter', (e) => {startAnimation(e, restaurant.id)});
  a_wrapper.addEventListener('focus', (e) => {startAnimation(e, restaurant.id)});
  a_wrapper.addEventListener('mouseleave', (e) => {stopAnimation(e, restaurant.id)});
  a_wrapper.addEventListener('blur', (e) => {stopAnimation(e, restaurant.id)});

  return a_wrapper

  function startAnimation(e, id) {
    //find the matching id (would be faster to track index)
     let thisMarker = self.markers.find((element)=>{ return element.rest_id == id });
    thisMarker.setAnimation(google.maps.Animation.BOUNCE);  
  }
  
  function stopAnimation(e, id) {
    let thisMarker = self.markers.find((element)=>{ return element.rest_id == id });
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