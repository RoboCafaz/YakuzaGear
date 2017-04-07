var app = angular.module("yakuzadb", ["ngRoute"]);
app.config(function ($routeProvider) {
	$routeProvider
	.when("/", {
		template: "<home-component></home-component>"
	})
	.when("/locations/:id?", {
		template: "<locations-component></locations-component>"
	})
	.when("/weapons/:id?", {
		template: "<weapons-component></weapons-component>"
	})
	.when("/armor/:id?", {
		template: "<armor-component></armor-component>"
	})
	.when("/accessories/:id?", {
		template: "<accessories-component></accessories-component>"
	})
	.when("/parts/:id?", {
		template: "<parts-component></parts-component>"
	})
	.otherwise({
		redirectTo: "/"
	});
});

app.component("navComponent", {
	templateUrl: "nav.html",
	controller: ["$scope", "$route", function ($scope, $route) {
			$scope.isActive = function (route) {
				var path = $route.current.$$route.originalPath;
				path = path.substr(0, path.indexOf("/", 1));
				return route === path;
			};
		}
	]
});

app.component("locationsComponent", {
	templateUrl: "locations.html",
	controller: [function () {}
	]
});

app.component("weaponsComponent", {
	templateUrl: "weapons.html",
	controller: [function () {}
	]
});

app.component("armorComponent", {
	templateUrl: "armor.html",
	controller: [function () {}
	]
});

app.component("accessoriesComponent", {
	templateUrl: "accessories.html",
	controller: [function () {}
	]
});

app.component("partsComponent", {
	templateUrl: "parts.html",
	controller: ["$scope", "datasets", function ($scope, datasets) {
			$scope.Title = "Parts";
			$scope.Parts = []
			datasets.parts().then(function (data) {
				$scope.Parts = data;
			});
		}
	]
});
