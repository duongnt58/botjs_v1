var models = require("../connectdb/models");
var env = require('dotenv').load();
var Promise = require("bluebird");


var someCacheValue;
var cacheValue;

var getValuee = function() {
		if (someCacheValue) {
			return Promise.resolve(someCacheValue);
		}
		return models.user.find({
			where: {
				id: 3
			}
		}).then(userr => {
			someCacheValue = userr;
			return userr.dataValues;
		});
	}
	//console.log(getValuee());
var tmpp = getValuee().then(result => {
	cacheValue = result.firstname;
}).then(function(cacheValue) {
	if (cacheValue === "Nguyen")
		cacheValue = 1;
	else
		cacheValue = 0;
	console.log(cacheValue);
	return cacheValue;
});
tmpp.then(cacheValue);