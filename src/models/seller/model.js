import bcrypt from "bcrypt";

import con from "../../dbconfig/config.js";

const saltRounds = 10;

export const seller_model = {
    createSeller: (sellerData, callback) => {
        bcrypt.genSalt(saltRounds, (error, salt) => {
            if (error) {
                return res.status(500).json({ error: "Error generating salt for password encryption" });
            }
            bcrypt.hash(sellerData.password, salt, (error, hashedpassword) => {
                if (error) {
                    return res.status(500).json({ error: "Error retrieving seller data" });
                }

                const sql = `INSERT INTO sellers (first_name, last_name, username, email, password, gstin_no, phone_no, business_category, address, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const values = [sellerData.first_name, sellerData.last_name, sellerData.username, sellerData.email, hashedpassword,sellerData.gstin_no, sellerData.phone_no, sellerData.business_category, sellerData.address, sellerData.city, sellerData.state, sellerData.zip_code];
                con.query(sql, values, callback);
            });
        });
    },

    getSellerIdByUsername: (username, callback) => {
        const sql = `SELECT seller_id FROM sellers WHERE username = ?`;
        const values = [username];
        con.query(sql, values, callback);
    },

    getSellerByUsername: (username, callback) => {
        const sql = `SELECT * FROM sellers WHERE username = ?`;
        const values = [username];
        con.query(sql, values, callback);
    },

    updateSellerPassword: (username, new_password, callback) =>{
        const sql = `UPDATE sellers SET password = ? WHERE username = ?`;
        const values = [new_password, username];
        con.query(sql, values, callback);
    },

    deleteSeller: (username, callback) => {
        const sql = `DELETE FROM sellers WHERE username = ?`;
        const values = [username];
        con.query(sql, values, callback);
    }

};