import bcrypt from "bcrypt";

import con from "../../dbconfig/config.js";

const saltRounds = 10;

export const user_model = {
    createUser: (userData, callback) => {
        bcrypt.genSalt(saltRounds, (error, salt) => {
            if (error) {
                return res.status(500).json({ error: "Error generating salt for password encryption" });
            }
            bcrypt.hash(userData.password, salt, (error, hashedpassword) => {
                if (error) {
                    return res.status(500).json({ error: "Error retrieving user data" });
                }

                const sql = `INSERT INTO users (first_name, last_name, username, email, password, phone_no, address, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const values = [userData.first_name, userData.last_name, userData.username, userData.email, hashedpassword, userData.phone_no, userData.address, userData.city, userData.state, userData.zip_code];
                con.query(sql, values, callback);
            });
        });
    },

    getUserByUsername: (username, callback) => {
        const sql = `SELECT * FROM users WHERE username = ?`;
        const values = [username];
        con.query(sql, values, callback);
    },

    updateUserPassword: (username, new_password, callback) =>{
        const sql = `UPDATE users SET password = ? WHERE username = ?`;
        const values = [new_password, username];
        con.query(sql, values, callback);
    },

    deleteUser: (username, callback) => {
        const sql = `DELETE FROM users WHERE username = ?`;
        const values = [username];
        con.query(sql, values, callback);
    }

};