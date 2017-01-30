angular.module('realtimeData', ['ngRoute', 'realtimeData.data', 'ngSanitize'])
  .controller('DashboardCtrl', ['$scope', 'Tickets', 'socketio', '$sce', function ($scope, Tickets, socketio, $sce) {
        'use strict';
        
        $scope.tickets = Tickets.query();
        
        socketio.on('ticket', function (msg) {
          msg.desc = msg.desc.replace(/\n|\r\n|\r/g, '<br/>');
            $scope.tickets.push(msg);
          console.log('this is receive new msg');
          console.log(JSON.stringify($scope.tickets))
        });
    }])
    .controller('CreateCtrl', ['$scope', '$location', 'Tickets', function ($scope, $location, Tickets) {
        'use strict';

        $scope.save = function (newTicket) {
            Tickets.save(newTicket);
            $location.path('/');
        };

        $scope.cancel = function () {
            $location.path('/');
        };

    }])
    .config(['$routeProvider', function ($routeProvider) {
        'use strict';
        
        $routeProvider
            .when('/', {
                controller: 'DashboardCtrl',
                templateUrl: 'partials/dashboard.html'
            })
            .when('/new', {
                controller: 'CreateCtrl',
                templateUrl: 'partials/ticket.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .filter('reverse', function () {
        'use strict';
    
        return function (items) {
            return items.slice().reverse();
        };
    })
    // From http://briantford.com/blog/angular-socket-io
    .factory('socketio', ['$rootScope', function ($rootScope) {
        'use strict';
        
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);
