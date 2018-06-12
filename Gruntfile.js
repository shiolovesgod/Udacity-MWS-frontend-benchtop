/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
  "grunt" alone creates a new, completed images directory
  "grunt clean" removes the images directory
  "grunt responsive_images" re-processes images without removing the old ones
*/

gm = require('gm').subClass({imageMagick: true});
console.log(gm);

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: {
      dev: {
        options: {
          // engine: 'gm',
          sizes: [{
            width: 200,
            quality: 60,
            suffix: 'w'
          },{
            width: 300,
            quality: 60,
            suffix: 'w'
          },{
            width: 400,
            quality: 60,
            suffix: 'w'
          },{
            width: 600,
            quality: 60,
            suffix: 'w'
          },{
            width: 800,
            quality: 60,
            suffix: 'w'
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'images_src/',
          dest: 'dist/img/'
        }]
      }
    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: ['dist/img'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: ['dist/img']
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'images_src/*.{gif,jpg,png}',
          dest: 'dist/img/'
        }]
      },
    },
  });

  /* Un-CSS - Remove unused css files (NOT CURRENTLY IN USE)*/
  // uncss {
  //   dist: {
  //     options: {
  //       ignore: ['.show'] //added at runtime
  //     },
  //     files: {
  //       'dist/css/style.css': ['dist/']
  //     }

  //   }
  // }


  
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);

};
