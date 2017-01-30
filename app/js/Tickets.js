angular.module('realtimeData.data', ['ngResource']).factory('Tickets', ['$resource', function($resource) {
    'use strict';
    
    var server = $resource('/tickets');
    
    return {
        save: function (newTicket) {
            server.save(newTicket);
        },
        
        query: function () {
//           var tickets = []
//           server.query().$promise.then(function (results) {
//             angular.forEach(results, function (result) {
// //              result.desc = result.desc.replace(/\n|\r\n|\r/g, '<br/>');
//               console.log(JSON.stringify(result.desc))
//               tickets.push(result)
//             })

//           });



//          console.log(tickets)
//            return tickets
          return server.query();
        }
    };
}]);
