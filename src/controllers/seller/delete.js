import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { seller_model } from '../../models/seller/model.js';

const secretKey = 'secret_key';

export const seller_delete = (req, res) => {
    const { username, password } = req.body;

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({
                status: 'Failure',
                message: 'Invalid token'
            });
        }

        if (decoded.username !== username) {
            return res.status(401).json({
                status: 'Failure',
                message: 'Unauthorized'
            });
        }

        seller_model.getSellerByUsername(username, (error, result) => {
            if (error) {
                return res.status(500).json({
                    error: "Failed to get seller username. please try again later. "
                })
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, isMatch) => {
                    if (error) {
                        return res.status(500).json({
                            error: " Failed to compare passwords. Please try again later. "
                        });
                    }
                    if (isMatch) {
                        seller_model.deleteSeller(username, (error, result) => {
                            if(error) {
                                return res.status(500).json({ 
                                    error: " Failed to delete account. Please try again later. "
                                });
                            }
                            return res.status(200).json({
                                status: "Success",
                                message: "Your data Deleted Successfully"
                            });
                        });
                    }
                    else{
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