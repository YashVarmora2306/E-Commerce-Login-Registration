import express from "express";

import user_router from "./routes/user/route.js";
import seller_router from "./routes/seller/route.js";

const app = express();

app.use(express.json());

app.use('/user', user_router);

app.use('/seller', seller_router);

export default app;