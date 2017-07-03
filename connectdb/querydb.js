//Đây là phần module chứa các hàm thao tác đến CSDL thông qua sequelize
//
//
//getUserByIdSlack: trả về toàn bộ row của 1 user
//getGroupById: trả về toàn bộ row của 1 group
//

var modelss = require("./models");

exports.getUserByIdSlack = function(idSlack) { // lấy thông tin user thông qua id slack 
	let user = modelss.user;
	return modelss.user.findOne({
		where: {
			id_slack: idSlack
		}
	});

}

exports.getGroupById = function(id) { // lấy thông tin group thông qua id group
	let group = models.group;
	return group.findALL({
		where: {
			id: id
		}
	});
}

exports.updateLastCheckin = function(user, id) { // update trường lastcheckin thông qua id
	let date = new Date();
	let updateValues = {
		last_checkin: date.getDate()
	};
	user.update(updateValues, {
		where: {
			id: id
		}
	}).then((result) => {
		// here your result is simply an array with number of affected rows
		console.log(result);
		// [ 1 ]
	});
}

exports.insertUserLate = function(date,userid, firstname, lastname){
	date.create({
		userId: userid,
		firstName: firstname,
		lastName: lastname,
		dateLate: new Date()
	})
}
exports.insertCheckout = function(timecheckout, userid, firstname, lastname){
	timecheckout.create({
		userId: userid,
		firstName: firstname,
		lastName: lastname,
		timeGetout: new Date()
	})
}