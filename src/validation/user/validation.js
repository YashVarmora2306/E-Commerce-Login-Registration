import validator from "validator";

import con from "../../dbconfig/config.js";

const validateRequiredField = (fieldName, value, errors) => {
    if (!value) {
        errors.push(`${fieldName} is required`);
    }
};

const validateExistedField = (fieldName, value, errors, callback = () => { }) => {
    const sql = `SELECT * FROM users WHERE ${fieldName} = ?`;
    value = [value];
    con.query(sql, value, (error, result) => {
        if (error) { 
            return callback(error);
        }
        else if (result.length > 0) {
            return callback(`${fieldName} already existed`);
        } else {
            return callback();
        }
    });
};


export const validate_user = (req, res, next) => {
    const errors = [];
    const { first_name, last_name, username, email, password, phone_no, address, city, state, zip_code } = req.body;

    validateRequiredField('first_name', first_name, errors);

    validateRequiredField('last_name', last_name, errors);

    validateRequiredField('username', username, errors);
    const usernameRegex = /^[a-zA-Z0-9_@]{6,16}$/;
            if (!usernameRegex.test(username)){
                errors.push("username to be between 6 and 16 characters long.it not allow any space ");
            }
    validateExistedField('username', username, errors, (usernameError) => {
        if (usernameError) {
            errors.push(usernameError);
        }

        validateRequiredField('email', email, errors);
        if (!validator.isEmail(email)) {
            errors.push("Email is Invalid");
        }
        validateExistedField('email', email, errors, (emailError) => {
            if (emailError) {
                errors.push(emailError)
            }


            validateRequiredField('password', password, errors);
            // if (!validator.isStrongPassword(password)) {
            //     errors.push("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character");
            // }
            const passwordRegex = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8}$/;
            if (!passwordRegex.test(password)){
                errors.push("Password must be 8 characters long, contain an uppercase letter, a lowercase letter, a number and a special character , not allow any space");
            }


            validateRequiredField('phone_no', phone_no, errors);
            if (!validator.isLength(phone_no, { min: 10, max: 10 })){
                errors.push("phone no must be exactly 10 number long")
            }
            else if (!validator.isNumeric(phone_no)){
                errors.push("phone no. must be a number")
            }
            validateExistedField('phone_no', phone_no, errors, (phone_noError)=>{
                if (phone_noError){
                    errors.push(phone_noError)
                }

            validateRequiredField('address', address, errors);

            validateRequiredField('city', city, errors);

            validateRequiredField('state', state, errors);

            validateRequiredField('zip_code', zip_code, errors);
            if (!validator.isLength(zip_code, { min: 6, max: 6 })) {
                errors.push("zip code must be exactly 6 number long");
            }
            else if (!validator.isNumeric(zip_code)) {
                errors.push("zip code must be a number");
            }

            if (errors.length > 0) {
                return res.status(400).json({ error: errors[0] })
            }
            return next();
        });
        });
    });
}   