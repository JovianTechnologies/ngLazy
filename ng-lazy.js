/**
 * Created by Eric on 6/3/2016.
 */
angular.module('ngLazyL', [])

.directive('ngLazy', function($rootScope, $timeout){
    return {
        restrict: 'E',
        scope: {
            template: '@',
            loadPoint: '@',
            pageSize: '@',
            items: '='
        },
        link: function(scope, elem, attrs){
            if(!scope.template) throw new LazyInitException("This directive requires a template url.");
            if(!scope.template) throw new LazyInitException("This directive requires a list to iterate through.");

            //set defaults
            if(!scope.loadPoint) scope.loadPoint = .7;
            if(!scope.pageSize) scope.pageSize = 5;

            loadNextPage(true);

            $($(elem.parent())).on('scroll', function(){
                if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight * scope.loadPoint)
                loadNextPage();
                scope.$digest();
            });

            scope.$on('$destroy', function(){
                $(elem).off('scroll');
            });

            scope.$watchCollection('items', function(newVal, oldVal){
                loadNextPage(true);
            });

            function loadNextPage(listChanged){
                if(!scope.currentPage || listChanged) scope.currentPage = 1;
                else scope.currentPage++;

                scope.displayedItems = scope.items.slice(0, scope.currentPage * scope.pageSize);
            }
        },
        template: '<div ng-include="template"></div>'
    }
});

//exceptions
function LazyInitException(message){
    this.name = "LazyInitException";
    this.message = message;
}

LazyInitException.prototype = new Error();
LazyInitException.prototype.constructor = LazyInitException;