import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { user_model } from '../../models/user/model.js';

const secretKey = 'secret_key';

export const password_update = (req, res) => {
    const { username, password, new_password } = req.body;

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                status: 'Failure',
                message: 'invalid token'
            });
        }

        if (decoded.username !== username) {
            return res.status(401).json({
                status: 'Failure',
                message: 'unauthorized'
            });
        }

        user_model.getUserByUsername(username, (error, result) => {
            if (error) {
                return res.status(500).json({
                    error: "Failed to get user username. please try again later."
                })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, isMatch) => {
                    if (error) {
                        return res.status(500).json({
                            error: "Failed to compare passwords. Please try again later"
                        });
                    }
                    if (isMatch) {

                        const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8}$/;
                        if (!passwordRegex.test(new_password)) {
                            return res.status(500).json({
                                error: "Password must be 8 characters long, contain an uppercase letter, a lowercase letter, a number and a special character , not allow any space"
                            });
                        }
                        bcrypt.hash(new_password, 10, (error, hash) => {
                            if (error) {
                                return res.status(500).json({
                                    error: "Failed to create new password. Please try again later."
                                });
                            }

                            user_model.updateUserPassword(username, hash, (error, result) => {
                                if (error) {
                                    return res.status(500).json({
                                        error: "Failed to update password. Please try again later."
                                    });
                                }
                                return res.status(200).json({
                                    status: "Success",
                                    message: "password updated successfully"
                                });
                            });
                        });
                    } else {
                        return res.status(401).json({
                            status: "Failure",
                            message: "invalid password"
                        });
                    }
                })
            }
            else {
                return res.status(401).json({
                    status: "Failure",
                    message: "invalid username and password"
                });
            }
        });
    });
};