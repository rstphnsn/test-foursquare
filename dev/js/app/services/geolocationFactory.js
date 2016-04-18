angular.module('App.services')

.factory('GeolocationFactory', ['$q', '$window', function GeolocationFactory($q, $window) {
    'use strict';

    var getGeolocation = function () {
        var deferred = $q.defer();
        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (error) {
                    deferred.reject(error);
                }
            );
        }
        return deferred.promise;
    },

    deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    },

    getDistanceFromLatLonInKm = function (lat1, lon1, lat2, lon2) {
        var RadiusOfEarth = 6371,
            degreeLat = deg2rad(lat2 - lat1),
            degreeLon = deg2rad(lon2 - lon1),
            a = Math.sin(degreeLat / 2) * Math.sin(degreeLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(degreeLon / 2) * Math.sin(degreeLon / 2),
            c,
            distance;
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        distance = RadiusOfEarth * c; // Distance in km
        return distance;
    },

    getDistanceBetweenTwoLocations = function (location1, location2) {
        if (location1.lat && location1.lng && location2.lat && location2.lng) {
            return getDistanceFromLatLonInKm(location1.lat, location1.lng, location2.lat, location2.lng);
        } else {
            throw new Error('Incorrect location arguments');
        }
    };

    return {
        getGeolocation: getGeolocation,
        getDistanceBetweenTwoLocations: getDistanceBetweenTwoLocations,
        getDistanceFromLatLonInKm: getDistanceFromLatLonInKm
    };

}]);
