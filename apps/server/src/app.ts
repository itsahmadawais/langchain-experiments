import express from 'express';
import cors from 'cors';
import appRoutes from './routes/app.routes';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('Langchain Experiments API');
});

app.use('/api', appRoutes);

export default app;