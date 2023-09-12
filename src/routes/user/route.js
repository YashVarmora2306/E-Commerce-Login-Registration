import express from "express";

import { user_login } from "../../controllers/user/login.js";
import { register_user } from "../../controllers/user/registration.js";
import { password_update } from "../../controllers/user/passwordUpdate.js";
import { user_details } from "../../controllers/user/userDetails.js";
import { user_delete } from "../../controllers/user/delete.js";

const user_router = express.Router();

user_router.post('/registration', register_user);

user_router.post('/login', user_login);

user_router.put('/updatePassword', password_update);

user_router.get('/details', user_details);

user_router.delete('/delete', user_delete);

export default user_router;