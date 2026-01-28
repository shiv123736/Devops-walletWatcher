import 'dotenv/config'; 
import app from './app';
import { Server } from 'http';
import prisma from './utils/prisma';
// import pool from './config/db';
// import { initializeDB } from './config/db';

const PORT = process.env.PORT || 3000;
// @ts-ignore
let server: Server;

const startServer = async () => {
    try {  
        // 1. Initialize DB
        // await pool.connect();
        // console.log("Connected to the database successfully.");   

        // 1.1 Drop Tables (for development purposes)
        // await dropTables();
        
        // 2. Initialize tables
        // await initializeDB();

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

// Graceful shutdown
const shutdown =  async () => {
    console.log('Shutting down server...');
    server.close(() => {
        console.log('Server closed.');
    });
    // pool.end(() => {
    //     console.log('Database connection closed.');
    //     process.exit(0);
    // });
    // Close prisma connection here 
    try {
        await prisma.$disconnect();
        console.log('Database connection closed.');
    } catch (error) {
        console.error('Error disconnecting from database', error);
    }
    process.exit(0);
}

process.on('SIGTERM', shutdown);    
process.on('SIGINT', shutdown);
