/**
 * TODO:Features & Chores
 *  1. Create descriptions for functions
 */


class HTMLHelper {

  static generateImgHTML(restaurant, defaultSize, imgSizes = [], sizesQuery = '') {

    const img = document.createElement('img');
    img.setAttribute('src', `./img/${restaurant.id}-${defaultSize}w.jpg`);
    img.setAttribute(`alt`, restaurant.photoDesc);

    if (imgSizes.length > 0) {
      let srcsetVal = [];
      for (let [idx, imgSize] of imgSizes.entries()) {
        srcsetVal.push(`./img/${restaurant.id}-${imgSize}w.jpg ${idx+1}x`)
      }
      img.setAttribute('srcset', srcsetVal.join(', '));
    }

    if (sizesQuery.length > 0) {
      img.setAttribute('sizes', sizesQuery);  
    }  //i may want to rewrite this to accommodate 'w' instead of 'x'    

    return img;

  }

  static generatePictureHTML(restaurant, imgSizes, queries = []) {

    // var queries = ['(min-width:300px)', '']; //imgSizes must be greater than nQueries
    // var imgSizes = [
    //   [200, 400, 600],
    //   [400, 800], 200
    // ]; //srcset for size query, default srcset (no query), default image size

    const picture = document.createElement('picture');

    for (let i = 0; i < imgSizes.length; i++) {

      if (i < queries.length) { //create a source element

        let source = document.createElement('source');
        let srcsetVal = [];
        for (let [idx, imgSize] of imgSizes[i].entries()) {
          srcsetVal.push(`./img/${restaurant.id}-${imgSize}w.jpg ${idx+1}x`)
        }

        source.setAttribute('srcset', srcsetVal.join(', '));

        if (queries[i].length > 0) {
          source.setAttribute('media', queries[i]);
        }

        picture.appendChild(source);

      } else { //default img tag
        let img = document.createElement('img');
        img.setAttribute('src', `./img/${restaurant.id}-${imgSizes[i]}w.jpg`);
        img.setAttribute(`alt`, restaurant.photoDesc);

        picture.appendChild(img);

      }
    }

    return picture;

  }

  static setMapTabOrder(map) {
    // I may need to move the tabindex value to 1 for non-map elements
    google.maps.event.addListener(map, 'tilesloaded', () => {

      //A little sloppy, but the timeout makes sure the controls are loaded
      setTimeout(() => {

        //Remove tab index from: iframe and div
        document.querySelector('#map .gm-style div:first-child').setAttribute('tabindex', -1);
        let iFrame = document.querySelector('#map .gm-style iframe');
          iFrame.setAttribute('aria-label','Restaurant location map');
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