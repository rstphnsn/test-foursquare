describe('Factory: GeolocationFactory', function () {
    'use strict';

    var GeolocationFactory,
        window;

    beforeEach(module('App'));
    beforeEach(module('App.services'));

    beforeEach(inject(function (_GeolocationFactory_, $q, $window) {
        GeolocationFactory = _GeolocationFactory_;
        window = $window;
    }));

    it('should exist', function () {
        expect(GeolocationFactory).toBeDefined();
    });


    //  ## TEST - GeolocationFactory.deg2rad  ------------------------------------------//

    it('should have a method called "deg2rad"', function () {
        expect(GeolocationFactory.deg2rad).toBeDefined();
        expect(typeof GeolocationFactory.deg2rad).toBe('function');
    });

    describe('GeolocationFactory.deg2rad', function () {

        it('should get turn degree values into radians', function () {
            var radians = GeolocationFactory.deg2rad(90);
            expect(radians).toBe(1.5708);
        });

    });


    //  ## TEST - GeolocationFactory.getDistanceBetweenTwoLocations  -------------------//

    it('should have a method called "getDistanceBetweenTwoLocations"', function () {
        expect(GeolocationFactory.getDistanceBetweenTwoLocations).toBeDefined();
        expect(typeof GeolocationFactory.getDistanceBetweenTwoLocations).toBe('function');
    });

    describe('GeolocationFactory.getDistanceBetweenTwoLocations', function () {

        var location1,
            location2,
            distance;

        beforeEach(function () {
            location1 = { // Goodmanham, East Yorkshire
                'lat': 53.87696673330006,
                'lng': -0.6459939479827881 
            };  
            location2 = { // Stratford, London
                'lat': 51.54016964213219,
                'lng': -0.0017595291137695312                 
            };
        });

        it('should return the distance in kilometers between two locations', function () {
            spyOn(GeolocationFactory, 'getDistanceFromLatLonInKm').and.callThrough();
            distance = GeolocationFactory.getDistanceBetweenTwoLocations(location1, location2);
            expect(GeolocationFactory.getDistanceFromLatLonInKm).toHaveBeenCalled();
            expect(distance).toBe(263.5046756975743);
        });

        it('should throw an error if location1 is missing lat', function () {
            location1.lat = null;
            expect(function () {
                GeolocationFactory.getDistanceBetweenTwoLocations(location1, location2);
            }).toThrow(new Error('Incorrect location arguments'));
        });

        it('should throw an error if location1 is missing lng', function () {
            location1.lng = null;
            expect(function () {
                GeolocationFactory.getDistanceBetweenTwoLocations(location1, location2);
            }).toThrow(new Error('Incorrect location arguments'));
        });

        it('should throw an error if location2 is missing lat', function () {
            location2.lat = null;
            expect(function () {
                GeolocationFactory.getDistanceBetweenTwoLocations(location1, location2);
            }).toThrow(new Error('Incorrect location arguments'));
        });

        it('should throw an error if location2 is missing lng', function () {
            location2.lng = null;
            expect(function () {
                GeolocationFactory.getDistanceBetweenTwoLocations(location1, location2);
            }).toThrow(new Error('Incorrect location arguments'));
        });

    });


    //  ## TEST - GeolocationFactory.getDistanceFromLatLonInKm  ------------------------//
    
    it('should have a method called "getDistanceFromLatLonInKm"', function () {
        expect(GeolocationFactory.getDistanceFromLatLonInKm).toBeDefined();
        expect(typeof GeolocationFactory.getDistanceFromLatLonInKm).toBe('function');
    });

    describe('GeolocationFactory.getDistanceFromLatLonInKm', function () {

        var lat1 = 53.87696673330006,
            lng1 = -0.6459939479827881,
            lat2 = 51.54016964213219,
            lng2 = -0.0017595291137695312,
            distance;

        it('should return the distance in kilometers between two locations', function () {
            distance = GeolocationFactory.getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2);
            console.log(distance);
            expect(distance).toBe(263.5046756975743);
        });

    });

});

