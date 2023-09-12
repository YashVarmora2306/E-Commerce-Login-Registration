import { seller_model } from "../../models/seller/model.js";
import { validate_seller } from '../../validation/seller/validation.js';

export const seller_registration = (req, res) => {
    const { first_name, last_name, username, email, password, gstin_no, phone_no, business_category, address, city, state, zip_code } = req.body;
        seller_model.createSeller(
            { first_name, last_name, username, email, password, gstin_no, phone_no, business_category, address, city, state, zip_code },
                       (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Failed to register seller data. Please try again later." });
                }
                else {
                    return res.status(201).json({
                        message: "Seller registration Successfully.",
                        result
                    });
                }
            }
        );
};

export const register_seller = [validate_seller, seller_registration];