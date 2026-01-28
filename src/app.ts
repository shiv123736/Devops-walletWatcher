import express, { Request, Response, Application } from 'express';
import walletWatcherRoutes from './routes/walletRoute';
import { errorHandler as walletError } from './middleware/walletError';

// App initialization
const app: Application = express();
app.use(express.json());
app.use(walletError); // custom error handling middleware
app.use('/api', walletWatcherRoutes);




// Health check route
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).send('OK');
});

// Default routes
app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to WalletWatcher API');
});

export default app;