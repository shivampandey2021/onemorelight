const registerSchema = require('./register-schema');
const config = require('./config')[process.env.NODE_ENV];
const mysql = require('mysql');
const pool = mysql.createPool(config);
const Ajv = new require('ajv');
const ajv = new Ajv.default({ allErrors: true });
const addFormats = require("ajv-formats")
addFormats(ajv);

class RegisterService {

    RegisterService() { };

    /**
     * Save User's Information to the DB
     * @throws Error when Databse Down or any problem while saving details
     * @return Success/Failure status with error if error is there, of insertion
     * 
     */
    static saveUserDetials(req, callback) {
        try {
            const valid = ajv.validate(registerSchema, req.body);
            if (!valid) {
                console.log('Error Inside validating with AJV In updateMSProgress :--- ' + ajv.errorsText(valid.errors));
                callback({ status: "FAILURE", error: "VALIDATION", error_msg: (ajv.errorsText(valid.errors)).replace("data.", "") });
            } else {
                let userObj = new Object();
                userObj.name = req.body.name;
                userObj.profile_photo = req.body.profilePhoto;
                userObj.dob = req.body.dob;
                userObj.gender = req.body.gender;
                userObj.about_me = req.body.aboutMe;
                userObj.creation_dt = new Date();
                pool.getConnection(function (conErr, connection) {
                    if (conErr) {
                        console.log('Error while getting database connection:----- ', conErr);
                        callback({ status: "FAILURE", error: "DB_CONNECTION" });
                    } else {
                        connection.query("INSERT INTO users set ?", userObj, function (insertErr, insertRes) {
                            connection.release();
                            if (insertErr) {
                                console.log('Error while saving user details:-------- ', insertErr);
                                callback({ status: "FAILURE", error: "INSERT_FAILURE" });
                            } else {
                                callback({ status: "SUCCESS", user_id: insertRes.insertId });
                            }
                        });
                    }
                });

            }
        } catch (e) {
            callback({ status: "FAILURE", error: "CATCH", error_msg: e.message });
        }
    }


    /**
    * Save User's Interest to the DB
    * @throws Error when Databse Down or any problem while saving details
    * @return Success/Failure status with error if error is there, of insertion
    * 
    */
    static saveUserTopics(req, callback) {
        try {
            if (req.body.user_id && typeof req.body.user_id === 'number' && req.body.user_topic && req.body.user_topic.length > 1) {
                let values = [];
                let topicList = req.body.user_topic;
                for (var count = 0; count < topicList.length; count++) {
                    values.push([req.body.user_id, topicList[count].topic_id, new Date()]);
                }
                console.log('Values is:------- ', values);

                pool.getConnection(function (conErr, connection) {
                    if (conErr) {
                        console.log('Error while getting database connection:----- ', conErr);
                        callback({ status: "FAILURE", error: "DB_CONNECTION" });
                    } else {
                        connection.query("INSERT INTO user_topic (user_id, topic_id, creation_dt) VALUES ?", [values], function (insertErr, insertRes) {
                            connection.release();
                            if (insertErr) {
                                console.log('Error while saving user topics:-------- ', insertErr);
                                callback({ status: "FAILURE", error: "INSERT_FAILURE" });
                            } else {
                                callback({ status: "SUCCESS" });
                            }
                        });
                    }
                });
            } else {
                callback({ status: "FAILURE", error: "VALIDATION", error_msg: "user id and topic list required " });
            }

        } catch (e) {
            callback({ status: "FAILURE", error: "CATCH", error_msg: e.message });
        }
    }


    static seggestUsers(req, callback) {
        try {
            if (req.body.user_id && typeof req.body.user_id === 'number') {
                pool.getConnection(function (conErr, connection) {
                    if (conErr) {
                        console.log('Error while getting database connection:----- ', conErr);
                        callback({ status: "FAILURE", error: "DB_CONNECTION" });
                    } else {
                        let suggestionQuery = "SELECT others_user_topic.user_id AS other_user_id, other_user.name ,COUNT(*) AS same_topic_count "
                            + "FROM user_topic AS others_user_topic "
                            + "JOIN user_topic AS current_user_topic "
                            + "ON current_user_topic.topic_id = others_user_topic.topic_id "
                            + "AND current_user_topic.user_id <> others_user_topic.user_id "
                            + "JOIN users this_user ON this_user.userId = current_user_topic.user_id "
                            + "JOIN users other_user ON other_user.userId = others_user_topic.user_id AND other_user.is_active = 1 "
                            + "WHERE current_user_topic.user_id = " + connection.escape(req.body.user_id) + " AND (TIMESTAMPDIFF(year,this_user.dob, other_user.dob) >= 6 OR TIMESTAMPDIFF(year,this_user.dob, other_user.dob) <= -6) "
                            + "GROUP BY current_user_topic.user_id,others_user_topic.user_id "
                            + "HAVING same_topic_count >= 3 "
                            + "ORDER BY current_user_topic.user_id ,same_topic_count DESC";
                        connection.query(suggestionQuery, function (userErr, userRes) {
                            connection.release();
                            if (userErr) {
                                console.log('Error while getting user suggestion:-------- ', userErr);
                                callback({ status: "FAILURE" });
                            } else {
                                callback(userRes);
                            }
                        });
                    }
                });
            } else {
                callback({ status: "FAILURE", error: "VALIDATION", error_msg: "user id required " });
            }
        } catch (e) {
            callback({ status: "FAILURE", error: "CATCH", error_msg: e.message });
        }
    }


}

module.exports = RegisterService;