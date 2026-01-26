import app from './app';
import { Server } from 'http';

const PORT = process.env['PORT'] || 3000;
// @ts-ignore
let server: Server;


const startServer = async () => {
    try {          
        server = app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }   
};

startServer();