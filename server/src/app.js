import express from 'express';
import routes from './route/index';
import ErrorHandler from './middleware/errorHandler';


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', routes);
app.use(ErrorHandler.sendError);
app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to Customer Management App' }));


const port = process.env.PORT || 3000;


app.listen(port);

export default app;
