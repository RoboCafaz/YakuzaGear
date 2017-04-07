var app = angular.module("yakuzadb");

app.factory("datasets", ["$http", "$q", function ($http, $q) {
			var self = this;
			self.data = {
				locations: [],
				parts: []
			};
			var fetch = function (key, endpoint, mapping) {
				var existing = self.data[key]
					if (!existing || (Array.isArray(existing) && existing.length === 0)) {
						return $q(function (resolve, reject) {
							$http.get(endpoint).then(function (data) {
								console.debug("Loaded new " + key + " data.");
								var result = data.data;
								if (mapping) {
									if (Array.isArray(result)) {
										result = result.map(mapping);
									} else {
										result = mapping(result);
									}
								}
								self.data[key] = result;
								resolve(result);
							}, function () {
								console.debug("Could not load new " + key + " data.");
								reject(existing);
							});
						});
					}
					return $q(function (resolve, reject) {
						console.debug("Fetched loaded " + key + " data.");
						resolve(existing);
					});
			};
			self.locations = function () {
				return fetch("locations", "data/locations.json");
			};
			self.parts = function () {
				return $q(function (resolve, reject) {
					self.locations().then(function (locs) {
						fetch("parts", "data/parts.json", function (item) {
							var matchId = function (id) {
								var location = locs.find(function (loc) {
										return loc.Id === id
									});
								return {
									Id: id,
									Region: location ? location.Region : "Unknown",
									Name: location ? location.Name : "Unknown"
								};
							};
							item.Available = item.Available.map(matchId);
							item.Guaranteed = item.Guaranteed.map(matchId);
							return item;
						}).then(function (data) {
							resolve(data);
						}, function (data) {
							reject(data);
						});
					});
				});
			};
			return self;
		}
	]);