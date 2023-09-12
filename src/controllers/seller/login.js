import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { seller_model } from "../../models/seller/model.js";

const secretKey = 'secret_key';

export const seller_login = (req, res) => {
    const { username, password } = req.body;

    seller_model.getSellerByUsername(username, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Failed to get seller username. please try again later." });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, isMatch) => {
                if (error) {
                    return res.status(500).json({ error: "Failed to compare passwords. Please try again later." });
                }
                if (isMatch) {
                    const token = jwt.sign({
                        username: result[0].username,
                        user_id: result[0].user_id
                    }, secretKey, { expiresIn: '1h' });

                    return res.status(200).json({
                        status: 'Success',
                        message: 'valid',
                        token
                    });
                } else {
                    return res.status(401).json({
                        status: 'Failure',
                        message: 'invalid password'
                    });
                }
            })
        }
        else {
            return res.status(401).json({
                status: 'Failure',
                message: 'invalid username or password'
            });
        }
    })
};