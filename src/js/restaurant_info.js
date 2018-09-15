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


      //Set review form restaurant ID & name
      initializeRestaurantForm(self.restaurant);
    }

    // Remove tab index from map items after tiles have been loaded 
    HTMLHelper.setMapTabOrder(self.map);

  });
  // this runs twice!
  fetchReviewsFromURL((error, reviews) => {
    if (error) {
      console.error(error);
    } else {
      self.reviews = reviews;
    }
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
    error = 'No restaurant id in URL';
    callback(error, null);
  } else {
    DBHelper.getDBResource((error, restaurant) => {
      if (Array.isArray(restaurant)) restaurant = restaurant[0];
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }

      fillRestaurantHTML();
      callback(null, restaurant)
    }, `restaurants/${id}`);
  }
}

/**
 * Get current reviews for restaurant.
 */
var loadedFlag = false;
fetchReviewsFromURL = (callback) => {
  if (self.reviews) { // reviews already fetched!
    callback(null, self.reviews)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL';
    callback(error, null);
  } else {
    DBHelper.getDBResource((error, reviews) => {
      self.reviews = reviews;
      if (!reviews) {
        console.error(error);
        return;
      }
      if (!loadedFlag) {
        fillReviewsHTML(reviews);
      }
      loadedFlag = true;
      callback(null, reviews)
    }, `reviews/?restaurant_id=${id}`);
  }
}


/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.body.querySelector('.restaurant-name');
  name.appendChild(cleanInput(restaurant.name));

  const address = document.body.querySelector('.restaurant-address');

  if (restaurant.address) {
    //Add a soft break before state + zip (without RegEx)
    const addressStr_pre = restaurant.address.split("").reverse().join("").replace(",", " >rbw<,").split("").reverse().join("");
    address.innerHTML = addressStr_pre;
  } else {
    address.innerText = 'Address not listed';
  }

  if (restaurant.photograph) {
    const image_wrapper = document.body.querySelector('.restaurant-img-wrapper');
    const picture = HTMLHelper.generatePictureHTML(restaurant, [
      [400, 800],
      [200, 400, 600],
      [400]
    ], ['(min-width:300px)', '']);
    picture.querySelector('img').classList.add('restaurant-img');
    image_wrapper.appendChild(picture);
  }

  if (restaurant.cuisine_type) {
    const cuisine = document.body.querySelector('.restaurant-cuisine');
    cuisine.appendChild(cleanInput(restaurant.cuisine_type));
  }

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }

}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.body.querySelector('.restaurant-hours');
  const tbody = document.createElement('tbody');
  for (let key in operatingHours) {
    const row = document.createElement('tr');
    const day = document.createElement('th');
    day.setAttribute('scope', 'row');
    day.className = 'hours-day';
    day.appendChild(cleanInput(key));
    row.appendChild(day);

    const timeList = document.createElement('ul');
    for (let timeRange of operatingHours[key].split(",")) {
      const timeItem = document.createElement('li');
      timeItem.appendChild(cleanInput(timeRange.trim()));
      timeList.appendChild(timeItem);
    }

    const time = document.createElement('td');
    time.className = 'hours-time';
    time.appendChild(timeList);
    row.appendChild(time);
    tbody.appendChild(row);
  }
  hours.appendChild(tbody);
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.reviews) => {

  if (!Array.isArray(reviews)) reviews = [reviews];

  console.log("Filling the Reviews")
  const container = document.body.querySelector('.reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (reviews.length < 1 || !reviews) {
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

function cleanInput(stringInput) {
  return document.createTextNode(String(stringInput));
};

createReviewHTML = (review) => {

  const li = document.createElement('li');
  li.setAttribute('id', `rNo${parseInt(review.id)}`);;
  const name = document.createElement('h3');
  name.appendChild(cleanInput(review.name));
  li.appendChild(name);

  if (review.updatedAt) {
    const dateObj = new Date(review.updatedAt);
    const date = document.createElement('p');
    const dateStrFormatted = `${moment(dateObj).calendar()}`; //(${moment(dateObj).fromNow()})
    date.appendChild(cleanInput(dateStrFormatted));
    li.appendChild(date);
  }
  const rating_wrapper = document.createElement('div');
  rating_wrapper.className = 'rating';

  const ratingIcon = document.createElement('p');
  ratingIcon.innerHTML = DBHelper.rating2stars(review.rating);
  ratingIcon.className = 'rating-stars';
  ratingIcon.setAttribute('aria-hidden', 'true');
  rating_wrapper.append(ratingIcon);

  const ratingText = document.createElement('p');
  ratingText.appendChild(cleanInput(`${review.rating} Stars`));
  ratingText.className = 'rating-text';
  ratingText.setAttribute('aria-label', `User rating ${ratingText.innerText}`);
  rating_wrapper.append(ratingText);

  li.append(rating_wrapper);


  const comments = document.createElement('p');
  comments.className = "review-comments";
  comments.classList.add("fade-ellipsis");
  comments.appendChild(cleanInput(review.comments));
  comments.setAttribute("tabindex", 0);

  //Add listeners if the user clicks or presses key down on element
  comments.addEventListener("click", function toggleEllispis(event) {
    event.target.classList.toggle("fade-ellipsis");
  })

  comments.addEventListener("keydown", (e) => {
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
  const a = document.createElement('a');
  a.appendChild(cleanInput(restaurant.name));
  a.href = `./restaurant.html?id=${parseInt(restaurant.id)}`;
  a.className = 'current-page';
  a.setAttribute('aria-current', 'page');
  li.append(a);

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


//================================================================
//FORM FUNCTIONALITY
//================================================================
document.addEventListener("DOMContentLoaded", function (event) {
  //do work
});

/**
 * FORM JS
 */

try {
  //throws an error if already exists
  const backendBaseURI = (window.DBHelper) ? DBHelper.DATABASE_URL : 'http://localhost:1337';
} finally {}

const star0 = document.body.querySelector('#star0');
const star1 = document.body.querySelector('#star1');

//Cancel default action
const reviewForm = document.body.querySelector('#form__user-review');
const formSubtitle = reviewForm.querySelector('.form-subtitle');
const formErrorDiv = reviewForm.querySelector('.form-error');
//reviewForm.action = `${backendBaseURI}/restaurants`; //do this manually
reviewForm.onsubmit = validateReview;


//Initialize restaurant form

function initializeRestaurantForm(rest = self.restaurant) {
  //Set ID field
  reviewForm.restaurant_id.value = rest.id;

  //Change restaurant name
  formSubtitle.innerText = rest.name;

}


//Validate rating
const formError = document.body.querySelector('.form-error');
var radioFlag = false;

document.body.querySelectorAll('.radio-star').forEach((iBtn) => {
  iBtn.addEventListener("click", () => {
    if (reviewForm.rating.value > 0) {
      formError.innerText = "";

      if (!radioFlag) star0.disabled = true;
      radioFlag = true;
    } else {
      formError.innerText = "A restaurant rating is required.";
    }
  })
});


//Validate the form input
function validateReview(e) {

  let rating = reviewForm.rating.value;

  if (rating < 1) {
    formError.innerText = "A restaurant rating is required.";
    formError.classList.add("invalid");
    if (!radioFlag) star0.disabled = true;
    star1.checked = true;
    star1.focus();
    return false;
  }

  //GET RESTAURANT ID
  if (!reviewForm.restaurant_id.value) //set by me
  {
    console.log('Please add the restaurant ID!');
    return false;
  }

  let formData = form2object(reviewForm, ['name', 'restaurant_id', 'comments', 'rating']);

  //close the form 
  modalOverlay.click();
  //Escape before submitting to backend?
  // postReview(formData);

  DBHelper._addUserReview(formData, self.restaurant.name, (res) => {
    console.log('Top Level Response: ');
    console.log(res);

    //show the user the revioew
    if (res.ok || res.retry) {

      //Add review to top of page
      let reviewsList = document.body.querySelector('.reviews-list');
      let newReview = createReviewHTML(res.body);
      newReview.classList.add('pending')
      reviewsList.prepend(newReview);

      //Reset form
      resetReviewForm();

      //OLD PLAN: redirect and reload page (send notifiacation through session storage)
      // let currentURL = window.location.href.replace(window.location.hash, '');
      // window.location.replace(`${currentURL}#${res.review.id}`);
      // location.reload();
    } else {

      formError.innerText = res.body; //even if i don't know the error, show it
      formError.classList.add('invalid');
    }

  });

  return false;
}

function resetReviewForm() {

  star0.disabled = false;
  star0.checked = true;
  formError.innerText = "";
  formError.classList.remove("invalid");
  reviewForm.name.value = '';
  reviewForm.comments.value = '';

}


//.........................................................
//REUSABLE FORM & DB FUNCTIONS
//.........................................................

function form2object(form, fields2keep) {
  let formData = {};
  let formElements = form.elements;

  for (let i = 0; i < formElements.length; i++) {

    if (fields2keep && fields2keep.indexOf(formElements[i].name) < 0) continue

    let fieldName = formElements[i].name ? formElements[i].name : `field${i}`;
    formData[fieldName] = formElements[i].value;
  }
  return formData;
}
