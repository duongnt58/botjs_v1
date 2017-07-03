var models = require("../connectdb/models");
var env = require('dotenv').load();

module.exports = findByIdd = function(userId) {
    // return the promise itself
    return models.user.find({
        where: {
            id: userId
        }
    }).then(function(userr) {
        if (!userr) {
            return 'not find';
        }
        return userr.dataValues;
    });
};
//console.log(findUser(3));
//
//doan code tren stack