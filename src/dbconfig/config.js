import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

try {
    con.connect((err)=>{
        if(err){
            console.log("Please check your Connection, Not Connected", err);
        }
        else{
            console.log("Successfully Connected");
        }
    });
} catch (error) {
    console.log("Error occurred", error);
};   

export default con;