import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import usersRoutes from './routes/users.js';
import companiesRoutes from './routes/companies.js';
import advertisementRoutes from './routes/advertisement.js';
import informationRoutes from './routes/informations.js';
import cookieParser from 'cookie-parser';
import apicache from 'apicache';
const cache = apicache.middleware;
const app = express();
const PORT = 5500;

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Users related routes
app.use('/users',cache('10 minutes'), usersRoutes);

// Information related routes
app.use('/information', cache('10 minutes'),informationRoutes);

// Advertisement related routes
app.use('/advertisement',cache('10 minutes'), advertisementRoutes);

// Companies related routes
app.use('/companies', cache('10 minutes'),companiesRoutes);
app.get('/some-protected-route', cache('10 minutes'),(req, res) => {
    console.log("Route reached");
    res.send('This is some protected route.');
  });
  
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
