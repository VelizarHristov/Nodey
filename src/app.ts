const express = require('express');

import { setUpRoutes } from "./routes";
import { initDbClient } from "./sqlClient";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

initDbClient();
setUpRoutes(app);

app.listen(PORT);
