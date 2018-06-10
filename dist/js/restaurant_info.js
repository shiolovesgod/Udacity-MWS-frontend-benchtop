/**
 * TODO:Features
 *  1. Add a class to the current day based 
 *     on the timezone and current time at the 
 *     location using Timezone API
 */

let restaurant;
var map;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.body.querySelector('#map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }

    // Remove tab index from map items after tiles have been loaded 
    HTMLHelper.setMapTabOrder(self.map);
  });


}

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.body.querySelector('.restaurant-name');
  name.innerHTML = restaurant.name;

  const address = document.body.querySelector('.restaurant-address');

  //Add a soft break before state + zip (without RegEx)
  const addressStr_pre = restaurant.address.split("").reverse().join("").replace(",", " >rbw<,").split("").reverse().join("");
  address.innerHTML = addressStr_pre;

  const image_wrapper = document.body.querySelector('.restaurant-img-wrapper');
  const picture = HTMLHelper.generatePictureHTML(restaurant, [[400, 800], [200, 400, 600], [400]], ['(min-width:300px)','']);
  picture.querySelector('img').className = 'restaurant-img';
  image_wrapper.appendChild(picture);

  const cuisine = document.body.querySelector('.restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.body.querySelector('.restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('th');
    day.className = 'hours-day';
    day.innerHTML = key;
    row.appendChild(day);

    const timeList = document.createElement('ul');
    for (let timeRange of operatingHours[key].split(",")) {
      const timeItem = document.createElement('li');
      timeItem.innerHTML = timeRange.trim();
      timeList.appendChild(timeItem);
    }

    const time = document.createElement('td');
    time.className = 'hours-time';
    time.appendChild(timeList);
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.body.querySelector('.reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.body.querySelector('.reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  const name = document.createElement('h3');
  name.innerHTML = review.name;
  li.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
  li.appendChild(date);



  const rating_wrapper = document.createElement('div');
  rating_wrapper.className = 'rating';

  const ratingIcon = document.createElement('p');
  ratingIcon.innerHTML = DBHelper.rating2stars(review.rating);
  ratingIcon.className = 'rating-stars';
  ratingIcon.setAttribute('aria-hidden','true');
  rating_wrapper.append(ratingIcon);

  const ratingText = document.createElement('p');
  ratingText.innerHTML = `${review.rating} Stars`;
  ratingText.className = 'rating-text';
  ratingText.setAttribute('aria-label',`User rating ${ratingText.innerHTML}`);
  rating_wrapper.append(ratingText);

  li.append(rating_wrapper);


  const comments = document.createElement('p');
  comments.className = "review-comments";
  comments.classList.add("fade-ellipsis");
  comments.innerHTML = review.comments;
  comments.setAttribute("tabindex", 0);

  //Add listeners if the user clicks or presses key down on element
  comments.addEventListener("click", function toggleEllispis(event) {
    event.target.classList.toggle("fade-ellipsis");
  })
    
  comments.addEventListener("keydown", (e)=>{
    
    console.log(e.keyCode);
    if (e.keyCode == 13 || e.keyCode == 32) {
      e.preventDefault();
        event.target.classList.toggle("fade-ellipsis");
    }
  });

  li.appendChild(comments);

  return li;
}


/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant = self.restaurant) => {
  const breadcrumb = document.querySelector('.breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}