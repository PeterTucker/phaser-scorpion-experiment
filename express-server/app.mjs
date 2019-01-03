'use strict';
import express from 'express';
import routes from './routes/routes.mjs';


const app = express(),
      port = 3000;

// View & CSS Engines
app.set('view engine', 'ejs');

// Define Public Routes
app.use(express.static('public'));
app.use('js/', express.static('public'));
app.use('css/', express.static('public'));
app.use('img/', express.static('public'));

// Define Routes
app.use('/', routes);

// Start Server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))