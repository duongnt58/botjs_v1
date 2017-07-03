// Đây là module khởi tạo các giá trị ban đầu của hai bảng user và group với dữ liệu ban đầu được lấy từ file data_user và data_group
// 
// Khởi tạo các module cần thiết.
//
var models = require("../connectdb/models");
var env = require('dotenv').load();
var fs = require('fs');
//
//

models.sequelize.sync().then(function(){//Sync Database
	console.log("Nice! Database looks fine.");
//Khởi tạo bảng user 
var data_user = fs.readFileSync('./data/data_user');
data_user = data_user.toString();
data_user = (new Function("var date = new Date(); var d = date.getDate(); return [" + data_user + "];")());
for(var i = 0; i < data_user.length; i ++){
	models.user.create(data_user[i]);
}

//Khởi tạo bảng group
var data_group = fs.readFileSync('./data/data_group');
data_group = data_group.toString();
data_group = (new Function("return ["+ data_group +"];")());
for(var j = 0; j < data_group.length; j ++){
	models.group.create(data_group[j]);
}
}).catch(function(err){
	console.log(err, "Something went wrong with the Database Update");
});