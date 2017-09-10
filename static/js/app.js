(function () {
    'use strict';

    angular
        .module('app', ['ngAnimate', 'toastr'])
        .directive("fileread", [function () {
            return {
                scope: {
                    fileread: "="
                },
                link: function (scope, element, attributes) {
                    element.bind("change", function (changeEvent) {
                        var formData = new FormData();
                        formData.append('file', element[0].files[0]);
                        scope.$apply(function () {
                            scope.fileread = formData;
                        });
                        /*var reader = new FileReader();
                        reader.onload = function (loadEvent) {
                            scope.$apply(function () {
                                scope.fileread = loadEvent.target.result;
                            });
                        };
                        reader.readAsDataURL(changeEvent.target.files[0]);*/
                    });
                }
            }
        }])
        .run(run)
        .config(function ($interpolateProvider, $locationProvider, $httpProvider) {
            $locationProvider.html5Mode(true);
            $interpolateProvider.startSymbol('{[{');
            $interpolateProvider.endSymbol('}]}');
            $httpProvider.defaults.xsrfCookieName = 'csrftoken';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        });

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();