import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as helmet from 'helmet';

import routes from './routes';

createConnection()
    .then(async connection => {

        const app = express();

        app.use(cors());
        app.use(helmet())
        app.use(bodyParser.json());

        app.use('/', routes)

        const PORT = 3005;
        app.listen(PORT, () => console.log(`Server rules on port: ${PORT}`));
    })
    .catch(error => console.log(error));
