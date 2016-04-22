'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

  	// Users
    queryInterface.createTable(
	  'users',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    first_name: Sequelize.STRING(45),
	    last_name: Sequelize.STRING(45),
	    email: Sequelize.STRING(70),
	    password: Sequelize.STRING,
	    verify_code: Sequelize.STRING(20),
	    profile_pic: Sequelize.STRING,
	    profile: Sequelize.ENUM(0,1),
	    fb_token: Sequelize.STRING,
	    role_id: Sequelize.INTEGER,
	    remember_token: Sequelize.STRING,
	    expire_time: Sequelize.DATE,
	    last_login: Sequelize.DATE,
	    createdAt: {
	      type: Sequelize.DATE
	    },
	    updatedAt: {
	      type: Sequelize.DATE
	    },
	  }
	)

    // User Roles
	queryInterface.createTable(
	  'user_roles',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    role_name: Sequelize.STRING(20),
	  }
	) 

	// Events
	queryInterface.createTable(
	  'events',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    visibility: Sequelize.ENUM('0', '1'),
	    event_name: Sequelize.STRING(45),
	    event_type: Sequelize.INTEGER,
	    party_theme: Sequelize.STRING(45),
	    start_time: Sequelize.DATE,
	    end_time: Sequelize.DATE,
	    cover_picture: Sequelize.STRING(100),
	    event_desc: Sequelize.TEXT,
	    location: Sequelize.STRING(100),
	    lat: Sequelize.STRING,
	    lng: Sequelize.STRING,
	    created_at: {
	      type: Sequelize.DATE
	    },
	    updated_at: {
	      type: Sequelize.DATE
	    },
	  }
	)

	// Event Types
	queryInterface.createTable(
	  'event_types',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    type_name: Sequelize.STRING(45),
	  }
	) 

	// Comments
	queryInterface.createTable(
	  'comments',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    comment: Sequelize.ENUM('0', '1'),
	    event_id: Sequelize.INTEGER,
	    comment_by: Sequelize.INTEGER,
	    status: Sequelize.BOOLEAN,
	    created_at: {
	      type: Sequelize.DATE
	    },
	    updated_at: {
	      type: Sequelize.DATE
	    },
	  }
	)


	// Events Checkin
	queryInterface.createTable(
	  'events_checkin',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    event_id: Sequelize.INTEGER,
	    user_id: Sequelize.INTEGER,
	    checked_at: Sequelize.DATE,
	  }
	)

	// Events Going
	queryInterface.createTable(
	  'events_going',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    event_id: Sequelize.INTEGER,
	    user_id: Sequelize.INTEGER,
	    going_count: Sequelize.INTEGER,
	    created_at: Sequelize.DATE,
	  }
	)

	// Events Invitations
	queryInterface.createTable(
	  'events_invitations',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    event_id: Sequelize.INTEGER,
	    user_id: Sequelize.INTEGER,
	    invited_by: Sequelize.INTEGER,
	    status: Sequelize.BOOLEAN,
	    receiver_notified: Sequelize.BOOLEAN,
	    sender_notified: Sequelize.BOOLEAN,
	    created_at: Sequelize.DATE,
	  }
	)

	// Event Requests
	queryInterface.createTable(
	  'events_requests',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    event_id: Sequelize.INTEGER,
	    request_by: Sequelize.INTEGER,
	    status: Sequelize.BOOLEAN,
	    accept_by: Sequelize.INTEGER,
	    receiver_notified: Sequelize.BOOLEAN,
	    sender_notified: Sequelize.BOOLEAN,
	    created_at: Sequelize.DATE,
	  }
	)

	// Friends
	queryInterface.createTable(
	  'friends',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    user_id: Sequelize.INTEGER,
	    friend_id: Sequelize.INTEGER,
	    request_sent_on: Sequelize.DATE,
	    status: Sequelize.INTEGER,
	    receiver_notified: Sequelize.BOOLEAN,
	    sender_notified: Sequelize.BOOLEAN,
	    updated_on: Sequelize.DATE,
	  }
	)

	// Ratings
	queryInterface.createTable(
	  'ratings',
	  {
	    id: {
	      type: Sequelize.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    rate: Sequelize.INTEGER,
	    event_id: Sequelize.INTEGER,
	    rate_by: Sequelize.INTEGER,
	    created_at: Sequelize.DATE,
	    updated_at: Sequelize.DATE,
	  }
	)


  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
