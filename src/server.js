import app from "./app.js";

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

server.on('error', (error) => {
    console.log(`Server error: ${error.message}`);
});