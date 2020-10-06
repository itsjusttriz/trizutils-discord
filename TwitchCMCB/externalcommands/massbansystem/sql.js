const mysql = require('mysql');

// Set the options needed to connect to the main Massban Database
let pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: 'massban'
});
console.log('Connected to MySQL.');

/* Tables
	bans 		- channel_banned_in, massban_account (PK), user_banned (PK), reason, proof, original_channel
	ban_in	- bot_id (PK), channel_id (PK)
	ignore  	- bot_id (PK), channel_id (PK)
	allowed  - bot_id (PK), user_id (PK)
	join 		- bot_id (PK), channel_id (PK)
	optin 	- bot_id (PK), optin
*/

// --- BANS --- //

// Add a new ban for a user.
function addBan(channel_banned_in, banned_by, user_banned, reason, proof, original_channel) {
	return new Promise((resolve, reject) => {
		pool.query(`INSERT IGNORE INTO table_bans (channel_banned_in, massban_account, user_banned, reason, proof, original_channel, banned_by) VALUES (?, ?, ?, ?, ?, ?, ?)`, [channel_banned_in, process.env.TWITCH_USERNAME, user_banned, reason, proof, original_channel, banned_by], (error, results, fields) => {
			if (error) {
				console.log('Error adding ban: ' + error);
				reject(error)
			} else resolve(null);
		});
	});
}

// Add more proof for a user.
function addProof(user_adding_to, proof) {
	return new Promise((resolve, reject) => {
		pool.query(`UPDATE table_bans SET proof = CONCAT(?,proof) WHERE user_banned = ? AND massban_account = ?`, [proof, user_adding_to, process.env.TWITCH_USERNAME], (error, results, fields) => {
			if (error) {
				console.log('Error adding proof: ' + error);
				reject(error);
				return;
			} else {
				pool.query(`SELECT * from table_bans WHERE user_banned = ? AND massban_account = ?`, [user_adding_to, process.env.TWITCH_USERNAME], (err, results, fields) => {
					if (err) {
						console.log('Error checking proof was added: ' + err);
						reject(err);
						return;
					} else if (results[0]) resolve(null);
					else reject(null);
				});
			}
		});
	});
}


// --- SETTINGS --- //
// Set opt-in status.
function setOptIn(bot_id, optin) {
	return new Promise((resolve, reject) => {
		pool.query(`INSERT INTO table_optin (bot_id, optin) VALUES (?, ?) ON DUPLICATE KEY UPDATE optin = ?`, [bot_id, optin, optin], (error, results, fields) => {
			if (error) {
				console.log('Error setting opt-in status: ' + error);
				reject(error)
			} else resolve(null);
		});
	});
}

// Get opt-in status.
function getOptIn(bot_id) {
	return new Promise((resolve, reject) => {
		pool.query(`SELECT optin FROM table_optin WHERE bot_id = ?`, [bot_id], (error, results, fields) => {
			if (error) {
				console.error('Error getting opt-in status: ' + error);
				reject(null);
			} else {
				// Resolves to true, false, or null if neither.
				if(results[0]) resolve(results[0].optin);
				else resolve(true);
			}
		});
	});
}

// Add ban channel for use with opt-in.
function addBanChannel(bot_id, channel_id) {
	return new Promise((resolve, reject) => {
		pool.query(`INSERT IGNORE INTO table_ban_in (bot_id, channel_id) VALUES (?, ?)`, [bot_id, channel_id], (error, results, fields) => {
			if (error) {
				console.log('Error adding ban channel: ' + error);
				reject(error)
			} else resolve(null);
		});
	});
}

// Remove a ban channel for use with opt-in.
function removeBanChannel(bot_id, channel_id) {
	return new Promise((resolve, reject) => {
		pool.query(`DELETE FROM table_ban_in WHERE bot_id = ? AND channel_id = ?`, [bot_id, channel_id], (error, results, fields) => {
			if (error) {
				console.log('Error removing ban channel: ' + error);
				reject(error)
			} else resolve(null);
		});
	});
}

// Get ban channels for use with opt-in.
function getBanChannels(bot_id) {
	return new Promise((resolve, reject) => {
		let data = [];
		pool.query(`SELECT channel_id from table_ban_in WHERE bot_id = ?`, [bot_id], (error, results, fields) => {
			if (error) {
				console.log('Error getting ban channels: ' + error);
				reject(null);
			} else {
				// Resolves to an array of channels or empty array.
				results.forEach((row) => {
					data.push(row.channel_id);
				});
				resolve(data);
			}
		})
	});
}

// Add allowed user.
function addAllowedUser(bot_id, user_id) {
	return new Promise((resolve, reject) => {
		pool.query(`INSERT IGNORE INTO table_allowed (bot_id, user_id) VALUES (?, ?)`, [bot_id, user_id], (error, results, fields) => {
			if (error) {
				console.log('Error adding allowed user: ' + error);
				reject(error)
			} else resolve(null);
		});
	});
}

// Remove allowed user.
function removeAllowedUser(bot_id, user_id) {
	return new Promise((resolve, reject) => {
		pool.query(`DELETE FROM table_allowed WHERE bot_id = ? AND user_id = ?`, [bot_id, user_id], (error, results, fields) => {
			if (error) {
				console.log('Error removing allowed user: ' + error);
				reject(error)
			} else resolve(null);
		});
	});
}

// Get allowed users.
function getAllowedUsers(bot_id) {
	return new Promise((resolve, reject) => {
		let data = [];
		pool.query(`SELECT user_id FROM table_allowed WHERE bot_id = ?`, [bot_id], (error, results, fields) => {
			if (error) {
				console.log('Error getting allowed users: ' + error);
				reject(null);
			} else {
				// Resolves to an array of channels or empty array.
				results.forEach((row) => {
					data.push(row.user_id);
				});
				resolve(data);
			}
		});
	});
}

// Add channel to join.
function addJoinChannel(bot_id, channel_id) {
	return new Promise((resolve, reject) => {
		pool.query(`INSERT IGNORE INTO table_join (bot_id, channel_id) VALUES (?, ?)`, [bot_id, channel_id], (error, results, fields) => {
			if (error) {
				console.log('Error adding join channel: ' + error);
				reject(error)
			} else resolve(null);
		});
	});
}

// Remove channel to join.
function removeJoinChannel(bot_id, channel_id) {
	return new Promise((resolve, reject) => {
		pool.query(`DELETE FROM table_join WHERE bot_id = ? AND channel_id = ?`, [bot_id, channel_id], (error, results, fields) => {
			if (error) {
				console.log('Error removing join channel: ' + error);
				reject(error)
			} else resolve(null);
		});
	});
}

// Get channels to join.
function getJoinChannels(bot_id) {
	return new Promise((resolve, reject) => {
		let data = [];
		pool.query(`SELECT channel_id FROM table_join WHERE bot_id = ?`, [bot_id], (error, results, fields) => {
			if (error) {
				console.log('Error getting join channels: ' + error);
				reject(null);
			} else {
				// Resolves to an array of channels or empty array.
				results.forEach((row) => {
					data.push(row.channel_id);
				});
				resolve(data);
			}
		});
	});
}

// Add channel to ignore.
function addIgnoreChannel(bot_id, channel_id) {
	return new Promise((resolve, reject) => {
		pool.query(`INSERT IGNORE INTO table_ignore (bot_id, channel_id) VALUES (?, ?)`, [bot_id, channel_id], (error, results, fields) => {
			if (error) {
				console.log('Error adding ignore channel: ' + error);
				reject(error)
			}
		});
	});
}

// Remove channel to ignore.
function removeIgnoreChannel(bot_id, channel_id) {
	return new Promise((resolve, reject) => {
		pool.query(`DELETE FROM table_ignore WHERE bot_id = ? AND channel_id = ?`, [bot_id, channel_id], (error, results, fields) => {
			if (error) {
				console.log('Error removing ignore channel: ' + error);
				reject(error)
			} else resolve(null);
		});
	});
}

// Get channels to ignore.
function getIgnoreChannels(bot_id) {
	return new Promise((resolve, reject) => {
		let data = [];
		pool.query(`SELECT channel_id FROM table_ignore WHERE bot_id = ?`, [bot_id], (error, results, fields) => {
			if (error) {
				console.log('Error getting ignore channels: ' + error);
				reject(null);
			} else {
				// Resolves to an array of channels or empty array.
				results.forEach((row) => {
					data.push(row.channel_id);
				});
				resolve(data);
			}
		});
	});
}

// Get all startup variables.
function getStartupVariables(bot_id) {
	return new Promise((resolve, reject) => {
		getOptIn(bot_id).then((opt_in) => {
			getBanChannels(bot_id).then((ban_channels) => {
				getAllowedUsers(bot_id).then((allowed_users) => {
					getJoinChannels(bot_id).then((join_channels) => {
						getIgnoreChannels(bot_id).then((ignore_channels) => {
							resolve({
								opt_in: 				opt_in,
								ban_channels:		ban_channels,
								allowed_users: 	allowed_users,
								join_channels: 	join_channels,
								ignore_channels: 	ignore_channels
							});
						}).catch((e) => {reject(null)});
					}).catch((e) => {reject(null)});
				}).catch((e) => {reject(null)});
			}).catch((e) => {reject(null)});
		}).catch((e) => {reject(null)});
	});
}

module.exports = {
	addBan: 					addBan,
	addProof: 				addProof,
	setOptIn:				setOptIn,
	getOptIn:				getOptIn,
	addBanChannel: 		addBanChannel,
	removeBanChannel:		removeBanChannel,
	getBanChannels:		getBanChannels,
	addAllowedUser:		addAllowedUser,
	removeAllowedUser:	removeAllowedUser,
	getAllowedUsers:		getAllowedUsers,
	addJoinChannel:		addJoinChannel,
	removeJoinChannel:	removeJoinChannel,
	getJoinChannels:		getJoinChannels,
	addIgnoreChannel:		addIgnoreChannel,
	removeIgnoreChannel: removeIgnoreChannel,
	getIgnoreChannels:	getIgnoreChannels,
	getStartupVariables: getStartupVariables
}
