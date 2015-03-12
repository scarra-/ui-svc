angular.module('messageApp.PeopleController', [])
    .controller('PeopleController', ['PeopleService', function(PeopleService) {
        var self = this;
        self.people = PeopleService.getPeople;
    }]);
