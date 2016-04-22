'use strict';

module.exports = function(sequelize, Sequelize) {

    var User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type : Sequelize.STRING
        },
	   remember_token: {
            type : Sequelize.STRING
        },
        verify_code: {
            type : Sequelize.STRING
        },
        status: {
            type : Sequelize.INTEGER
        },
        profile_pic: {
            type : Sequelize.STRING
        },
        expire_time: {
            type : Sequelize.DATE
        },
    }, {
        timestamps: true,
        //paranoid: true,
        underscored: true,
        tableName: 'users'
        // classMethods: {
        //     associate : function(models){
        //         User.hasMany(models.Follow,{as : 'followers',foreignKey:'followers_id'});
        //         User.hasMany(models.Follow,{as : 'following',foreignKey:'following_id'});
        //     }
        // }
    });
    return User;
};




