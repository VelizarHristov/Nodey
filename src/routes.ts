const path = require('path');

import { createPlant } from "./createPlant";

export function setUpRoutes(app: any) {
    app.get('/', function (req: any, res: any) {
        res.sendFile(path.resolve('index.html'));
    });

    app.post('/create_plant', function (req: any, res: any) {
        createPlant(req.body.name);
        res.send("Success");
    });
}
