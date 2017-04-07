var app = angular.module("yakuzadb");

app.factory("datasets", ["$http", "$q", function ($http, $q) {
			var self = {};
			self.data = {};
			var fetch = function (key, endpoint) {
				return $q(function (resolve, reject) {
					var existing = self.data[key];
					if (!existing || (Array.isArray(existing) && existing.length === 0)) {
						$http.get(endpoint).then(function (data) {
							var result = data.data;
							self.data[key] = result;
							console.debug("Fetched new " + key + " data.");
							resolve(result);
						}, function () {
							console.debug("Could not fetch new " + key + " data.");
							reject(existing);
						});
					} else {
						console.debug("Fetched loaded " + key + " data.");
						resolve(existing);
					}
				});
			};
			self.locations = function () {
				return fetch("locations", "data/locations.json");
			};
			self.parts = function () {
				return fetch("parts", "data/parts.json");
			};
			return self;
		}
	]);
