module.exports = function(sequelize, Sequelize){
	var Group = sequelize.define('group', {
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
		name: {
			type: Sequelize.STRING,
			notEmpty: true,

		},
		about: {
			type: Sequelize.STRING
		},
		//timezone: '+07:00'
	});
	return Group;
}