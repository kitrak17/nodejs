'use strict';

module.exports = function(sequelize, Sequelize) {

    var Friend = sequelize.define('Friend', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        friend_id: {
            type: Sequelize.INTEGER
        },
        request_sent_on: {
            type: Sequelize.DATE,
            unique: true
        },
        status: {
            type : Sequelize.INTEGER
        },
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'friends'
    });
    return Friend;
};




