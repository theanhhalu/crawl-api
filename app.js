const express = require('express');
const morgan = require('morgan');
const companiesRoutes = require('./api/routes/companies');
const MonGoDB = require('./databases/mongodb'); 
const app = express();

const port = process.env.PORT || 3000;

MonGoDB.init();
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/companies', companiesRoutes);

app.listen(port, () => console.log(`server running on port ${port}`));


