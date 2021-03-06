import express, { Request, Response} from 'express'
import {RoutingConfig} from './routes/routes.config'
import dotenv from 'dotenv'
import * as bodyParser from 'body-parser';
import cors from 'cors';
import logger from './util/logger'
import {dbConnection} from './config/db'
import {setupPassport} from './config/passport'
import PropertyRoutes from './routes/property/property.routes'
import UserRoutes from './routes/user/user.routes'

export class Server {
    app: express.Application
    routers: Array<RoutingConfig>
    constructor() {
        this.app = express()
        this.config()
        this.routers = new Array<RoutingConfig>();
        this.routes()
    }
    config(): void {
        dotenv.config()
        this.app.use(cors({origin:'http://127.0.0.1'}))
        this.database()
        this.app.set('port', process.env.PORT || 3001)
        this.app.use(bodyParser.json())
        setupPassport(this.app)
    }
    
    routes(): void {
        this.app.get('/', (req: Request, res: Response) => res.send('home-u API v1.0.0'))
        this.routers.push(
            new PropertyRoutes(this.app),
            new UserRoutes(this.app)
        )
    }

    database(): void {
        dbConnection()
    }

    start(): void {
        this.app.listen(this.app.get('port'), () =>
         logger.info(`Running on port ${process.env.PORT}`) )
    }
}


// export class Server2 {
//     constructor() {
//         this.start(express.application = express(), 3000)
//     }
//     start = (app: express.Application, port: number): void => {
//         app.use(bodyParser.json())
//         app.get('/', (req: Request, res: Response) => res.send('Home'))
//         const propertyRoutes = new PropertyRoutes(app)
//         app.listen(port, () => console.log("Server running"))
//     } 
// }

