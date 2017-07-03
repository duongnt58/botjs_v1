module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
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
        id_slack:{
            type: Sequelize.STRING,
            notEmpty: true
        },
        userName: {
            type: Sequelize.TEXT,
            alowNull: true
        },
        sex: {
            type: Sequelize.ENUM('male', 'female'),
            defaultValue: 'male'
        },
        birthDay:{
            type: Sequelize.DATEONLY,
            notEmpty: true
        },
         email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            },
            allowNull: true
        },
        group: {
            type: Sequelize.INTEGER,
            notEmpty: true
        },

        role: {
            type: Sequelize.ENUM('0','1','2'),// Giá trị của trường role có ý nghĩa là nếu là 0 nhân viên, 1 trưởng nhóm, 2 admin
            defaultValue: '0'
        },
 
        last_checkin: {
            type: Sequelize.INTEGER
        },
        last_checkout: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
       // timezone: '+07:00'
 
    });
 
    return User;
 
};
