// Scrollup button
// ===============
$(document).ready(function() {

    // Hide button on load
    $('#scrollup').hide();

    // Show button if user has scrolled enough
    $(document).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scrollup').show(200);
        } else {
            $('#scrollup').hide(200);
        }
    });

    // Scroll to top
    $('#scrollup').on('click', function(event) {
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });
});


// Angular
// =======
var pollApp = angular.module('polls', ['ngRoute', 'pollModule']);
pollApp.config(
    ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/list', {
                templateUrl: 'partials/list.html',
                controller: 'PollListController'
            })
            .when('/create', {
                templateUrl: 'partials/create.html',
                controller: 'PollCreateontroller'
            })
            .when('/:id', {
                templateUrl: 'partials/show.html',
                controller: 'PollShowController'
            })
            .otherwise({redirectTo: '/list'});
    }]
);
