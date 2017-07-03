module.exports = function(sequelize, Sequelize) {
	var Date = sequelize.define('date', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		userId: {
			type: Sequelize.INTEGER
		},
		firstName: {
			type: Sequelize.STRING,
			notEmpty: true
		},
		lastName: {
			type: Sequelize.STRING,
			notEmpty: true
		},
		dateLate: {
			type: Sequelize.DATE,
			notEmpty: true
		},
		//timezone: '+07:00'
	});
	return Date;
}