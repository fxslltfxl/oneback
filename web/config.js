'use strict';

let path = require('path');

let config = {
    globs: {
        angular: [
            'node_modules/angular/angular.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-route/angular-route.min.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-touch/angular-touch.js',
            'node_modules/angular-touch/angular-touch.min.js',
            'node_modules/angular-cookies/angular-cookies.js',
            'node_modules/angular-cookies/angular-cookies.min.js'
        ],
        jquery: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jquery/dist/jquery.min.js'
        ],
        bootstrap_css: [
            'node_modules/bootstrap/dist/css/*.css'
        ],
        bootstrap_font: [
            'node_modules/bootstrap/dist/fonts/*.*',
            'app/assets/font/*.*'
        ],
        bootstrap_js: [
            'node_modules/bootstrap/dist/js/*.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js'
        ],
        others: [
            'node_modules/ng-file-upload/dist/ng-file-upload-shim.js',
            'node_modules/ng-file-upload/dist/ng-file-upload.js',
            'node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js',
            'node_modules/ng-file-upload/dist/ng-file-upload-.min.js',
            'node_modules/ngstorage/ngStorage.js',
            'node_modules/ngstorage/ngStorage.min.js',
            'node_modules/file-saver/FileSaver.js',
            'node_modules/file-saver/FileSaver.min.js',
            'node_modules/angular-smart-table/dist/smart-table.js',
            'node_modules/angular-smart-table/dist/smart-table.min.js',
        ],
        otherlibs: [
            
            ],
        application: [
            'app/app.js',
            'app/scripts/common/*.js',
            'app/scripts/tools/*.js',
            'app/scripts/directives/*.js',
            'app/scripts/filters/*.js',
            'app/scripts/controllers/*.js',
            'app/scripts/services/*.js'
        ],
        css: [
            'app/app.css',
            'app/assets/css/*.css'
        ]
    },
    environment: {
        develop: '',
        release: '',
        production: ''
    },
    lint: ['./app/**/*.js']
};

module.exports = config;