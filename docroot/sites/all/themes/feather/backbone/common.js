require.config({
    baseUrl: base_path + 'backbone/lib',
    paths: {
      'app': '../app',
      'backbone': 'backbone-min',
      'Snap': 'snap.svg-min',
      'matchMedia': 'matchMedia',
      'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
      'underscore': 'underscore-min',
      'moment': 'moment-with-langs',
      'jquery.ui.widget': 'jquery.ui.widget',
      'jquery.selectBoxIt': 'jquery.selectBoxIt',
      'bootstrap': 'bootstrap-min',
      'async': 'async',
      'waypoints': 'waypoints.min',
      'waypointssticky': 'waypoints-sticky.min'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'popover' : {
          deps: ['jquery'],
          exports: 'popover'
        },
        'placholder' : {
          deps: ['jquery'],
          exports: 'placeholder'
        },
        'jquery.ui.widget': {
          deps: ['jquery'],
          exports: 'widget'
        },
        'jquery.selectBoxIt': {
          deps: ['jquery.ui.widget'],
          exports: 'selectBoxIt'
        },
        'bootstrap': {
          deps: ['jquery'],
          exports: '$.fn.tooltip'
        },
        'matchMedia': {
          exports: 'matchMedia'
        },
        'waypoints': {
           deps: ['jquery']
        },
        'waypointssticky': {
          deps: ['waypoints']
        }
    },
    //urlArgs: "v=" + Math.random(),
    urlArgs: "v=24",
    waitSeconds: 0
});
