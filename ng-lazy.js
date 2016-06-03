/**
 * Created by Eric on 6/3/2016.
 */
angular.module('ngLazy', [])

.directive('ngLazy', function(){
    return {
        restrict: 'E',
        scope: {},
        link: function(scope, elem, attrs){

        },
        templateUrl: '<div ng-include="templateUrl"></div>'
    }
});