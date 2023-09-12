import express from "express";

import { seller_login } from "../../controllers/seller/login.js";
import { register_seller } from "../../controllers/seller/registration.js";
import { password_update } from "../../controllers/seller/passwordUpdate.js";
import { seller_details } from "../../controllers/seller/sellerDetails.js";
import { seller_delete } from "../../controllers/seller/delete.js";

const seller_router = express.Router();

seller_router.post('/registration', register_seller);

seller_router.post('/login', seller_login);

seller_router.put('/updatePassword', password_update);

seller_router.get('/details', seller_details);

seller_router.delete('/delete', seller_delete);

export default seller_router;