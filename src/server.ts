import 'dotenv/config'; 
import app from './app';
import { Server } from 'http';
import pool from './config/db';
import { initializeDB } from './config/db';

const PORT = process.env.PORT || 3000;
// @ts-ignore
let server: Server;

const startServer = async () => {
    try {  
        // 1. Initialize DB
        await pool.connect();
        console.log("Connected to the database successfully.");   

        // 1.1 Drop Tables (for development purposes)
        // await dropTables();
        
        // 2. Initialize tables
        await initializeDB();

        // 2. Start Express server
        server = app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to Database', error);
        process.exit(1);
    }   
};

startServer();