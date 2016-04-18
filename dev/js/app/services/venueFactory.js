angular.module('App.services')

.factory('VenueFactory', function VenueFactory(APP, $http) {
    'use strict';

    var getVenues = function (location) {
        return $http.get(APP.SERVICE_URL + '/venues/search?near=' + location + '&client_id=' + APP.CLIENT_ID + '&client_secret=' + APP.CLIENT_SECRET + '&v=20160416').then(
            function (response) {
                return response.data.response.venues;
            },
            function (error) {
                throw new Error(error);
            }
        );
    };

    return {
        getVenues: getVenues
    };

});
