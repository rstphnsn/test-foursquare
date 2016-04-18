angular.module('App.controllers')

.controller('VenueController', ['VenueFactory', 'GeolocationFactory', function (VenueFactory, GeolocationFactory) {
    'use strict';

    var vm = this;

    var addDistanceInfo = function (venues) {
        angular.forEach(venues, function (venue) {
            var venueLocation = {};
            venueLocation.lat = venue.location.lat;
            venueLocation.lng = venue.location.lng;
            venue.distance = GeolocationFactory.getDistanceBetweenTwoLocations(vm.currentGeolocation, venueLocation);
        });
        return venues;
    };

    GeolocationFactory.getGeolocation().then(function (response) {
        vm.currentGeolocation = {};
        vm.currentGeolocation.lat = response.coords.latitude;
        vm.currentGeolocation.lng = response.coords.longitude;
    });

    vm.search = function (searchLocation) {
        if (searchLocation) {
            vm.loading = true;
            VenueFactory.getVenues(searchLocation).then(
                function (response) {
                    if (vm.currentGeolocation) {
                        vm.venues = addDistanceInfo(response); 
                    } else {
                        vm.venues = response;
                    }
                    vm.loading = false;
                    vm.message = null;
                },
                function () {
                    vm.venues = null;
                    vm.message = 'Sorry there was a problem finding venues for that location';
                    vm.loading = false;
                } 
            );
        }
    };

}]);
