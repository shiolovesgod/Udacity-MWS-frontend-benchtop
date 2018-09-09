/**
 * TODO:Features & Chores
 *  1. Create descriptions for functions
 */


class HTMLHelper {

  /**
  * Generate <img> tags with sizes and srcset attributes
  */
  static generateImgHTML(restaurant, defaultSize, imgSizes = [], sizesQuery = '') {

    const img = document.createElement('img');
    img.classList.add('lozad'); //lazy loading
    img.setAttribute('data-src', `img/${restaurant.id}-${defaultSize}w.jpg`);
    img.setAttribute(`alt`, restaurant.photoDesc);

    if (imgSizes.length > 0) {
      let srcsetVal = [];
      for (let [idx, imgSize] of imgSizes.entries()) {
        srcsetVal.push(`img/${restaurant.id}-${imgSize}w.jpg ${idx + 1}x`)
      }
      img.setAttribute('data-srcset', srcsetVal.join(', '));
    }

    if (sizesQuery.length > 0) {
      img.setAttribute('sizes', sizesQuery);
    }  //i may want to rewrite this to accommodate 'w' instead of 'x'    

    return img;

  }

  /**
  * Generate <picture> tags 
  */
  static generatePictureHTML(restaurant, imgSizes, queries = []) {

    /*  Sample inputs
    var queries = ['(min-width:300px)', '']; //imgSizes must be greater than nQueries
    var imgSizes = [
      [200, 400, 600],
      [400, 800], 200
    ];*/

    const picture = document.createElement('picture');

    for (let i = 0; i < imgSizes.length; i++) {

      if (i < queries.length) { //create a source element

        let source = document.createElement('source');
        let srcsetVal = [];
        for (let [idx, imgSize] of imgSizes[i].entries()) {
          srcsetVal.push(`img/${restaurant.id}-${imgSize}w.jpg ${idx + 1}x`)
        }

        source.setAttribute('srcset', srcsetVal.join(', '));

        if (queries[i].length > 0) {
          source.setAttribute('media', queries[i]);
        }

        picture.appendChild(source);

      } else { //default img tag
        let img = document.createElement('img');
        img.setAttribute('data-src', `img/${restaurant.id}-${imgSizes[i]}w.jpg`);
        img.setAttribute(`alt`, restaurant.photoDesc);
        picture.appendChild(img);

      }
    }

    return picture;

  }

  /**
  * Re-configure the order and focusability of Google Maps elements
  */
  static setMapTabOrder(map) {
    // I may need to move the tabindex value to 1 for non-map elements
    google.maps.event.addListener(map, 'tilesloaded', () => {

      //A little sloppy, but the timeout makes sure the controls are loaded
      setTimeout(() => {

        //Remove tab index from: iframe and div
        document.querySelector('#map .gm-style div:first-child').setAttribute('tabindex', -1);
        let iFrame = document.querySelector('#map .gm-style iframe');
        iFrame.setAttribute('aria-label', 'Restaurant location map');
        iFrame.setAttribute('tabindex', -1);

        //Tab through divs first
        document.querySelectorAll('#map .gm-style div[role="button"]')
          .forEach((el) => {
            el.setAttribute('tabindex', 0);
            el.classList.add('map-control');
          }); //map & satellite

        //Then Buttons
        document.querySelectorAll('#map .gm-style button')
          .forEach((el) => {
            el.setAttribute('tabindex', 0);
            el.classList.add('map-control');
          }); //zoom in, zoomout, full screen

        //Finally a's (currently not focusable)
        document.querySelectorAll('#map .gm-style a[href]')
          .forEach((el) => {
            el.setAttribute('tabindex', -1);
            el.classList.add('map-link');
          }); //zoom in, zoomout, full screen
      }, 500);
    });
  }

}

//==========================================================
//FRONT END FUNCTIONALITY
//==========================================================

/*
*
*  MODAL WINDOW
*
*/

const modalBtns = document.body.querySelectorAll('.btn-trigger-modal');
const modalOverlay = document.body.querySelector('#modal-overlay');

var focusedElementBeforeModal;

modalBtns.forEach(iBtn => {

  //get ID for associated modal wrapper
  let modalID = iBtn.getAttribute('data-mdl-wrpr'); //ID of wrapper
  let modalWrapper = document.body.querySelector(`#${modalID}`);
  iBtn.addEventListener('click', (e) => openModalWindow(modalWrapper));
});

function openModalWindow(modalWrapper) {
  let modalContent = modalWrapper.querySelector('.modal-content');
  let modalCancel = modalContent.querySelector('.modal-cancel'); //cancelButton

  //save current focus
  focusedElementBeforeModal = document.activeElement;

  //Listen for and add keyboard trap
  modalContent.addEventListener('keydown', trapTabKey);

  //Determine WHICH BUTTONS can close the app (in addition to ESC)
  modalOverlay.addEventListener('click', closeModal); //click background
  modalCancel.addEventListener('click', closeModal);

  //Find focusable children
  var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

  var focusableElements = modalContent.querySelectorAll(focusableElementsString);

  var firstTabStop = focusableElements[0];
  var lastTabStop = focusableElements[focusableElements.length - 1];

  modalWrapper.classList.add('show-modal');
  modalOverlay.classList.add('show-modal');

  //Focus first child
  firstTabStop.focus();

  function trapTabKey(e) {

    //Check for tab key press
    if (e.keyCode === 9) {

      //SHIFT+TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();

        }
      }
      else {
        //TAB

        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus()
        }

      }
    }

    //Check for ESC 
    if (e.keyCode === 27) {
      closeModal();
    }
  }

  function closeModal() {
    modalWrapper.classList.remove('show-modal');
    modalOverlay.classList.remove('show-modal');

    //set focus back to element that had it before modal was opened
    focusedElementBeforeModal.focus();

  }



}
