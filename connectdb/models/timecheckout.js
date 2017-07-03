// đây là module khởi tạo bảng checkout.
// Lưu thông tin người dùng checkout

module.exports = function(sequelize, Sequelize){
	var TimeCheckout = sequelize.define('timecheckout',{
		id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
        	type: Sequelize.INTEGER,
        	notEmpty: true
        },
        firstName: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        lastName: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        timeGetout: {
        	type: Sequelize.DATE,
        	notEmpty: true
        }
	});
	return TimeCheckout;
}