'use strict';

const express = require('express');
const app = express();
require('dotenv').config();

app.use('/docs',express.static('./docs'));

app.listen(process.env.PORT, () => {console.log(`App listening on ${process.env.PORT}`);});