import { user_model } from "../../models/user/model.js";
import { validate_user } from '../../validation/user/validation.js';

export const user_registration = (req, res) => {
    const { first_name, last_name, username, email, password, phone_no, address, city, state, zip_code } = req.body;
        user_model.createUser(
            { first_name, last_name, username, email, password, phone_no, address, city, state, zip_code },
                       (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Failed to register user data. Please try again later."});
                }
                else {
                    return res.status(201).json({
                        message: "User registration Successfully.",
                        result
                    });
                }
            }
        );
};

export const register_user = [validate_user, user_registration];