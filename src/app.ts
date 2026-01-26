import express, { Request, Response, Express } from 'express';

const app : Express = express();

app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to WalletWatcher API');
});


export default app;