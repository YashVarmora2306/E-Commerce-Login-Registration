import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { seller_model } from '../../models/seller/model.js';

const secretKey = 'secret_key';



export const seller_details = (req, res) => {
    const { username, password } = req.body;

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

        seller_model.getSellerByUsername(username, (error, result) => {
            if (error) {
                return res.status(500).json({
                    error: "Failed to get seller username. please try again later."
                })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, isMatch) => {
                    if (error) {
                        return res.status(500).json({
                            error: "Failed to compare passwords. Please try again later."
                        });
                    }
                    if (isMatch) {
                        if (result.length > 0) {
                            const { first_name, last_name, email, gstin_no, phone_no, business_category, address, city, state, zip_code } = result[0];
                            return res.status(200).json({
                                status: 'success',
                                data: {
                                    first_name,
                                    last_name,
                                    email,
                                    gstin_no,
                                    phone_no,
                                    business_category,
                                    address,
                                    city,
                                    state,
                                    zip_code
                                }
                            })
                        }
                    }
                    else {
                        return res.status(401).json({
                            status: 'Failure',
                            message: 'invalid username or password'
                        });
                    }
                });
            }
        });
    });
}