import * as path from 'path';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as methodOverride from 'method-override';
import * as cors from 'cors';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

// GraphQL related imports
import { GraphQLServer } from 'graphql-yoga';
import { prisma } from '../prisma/generated/prisma-client';
import datamodelInfo from '../prisma/generated/nexus-prisma';
import {
    stringArg,
    idArg,
    makeSchema,
    objectType,
} from 'nexus';
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma';
import * as allTypes from './resolvers';

// Custom imports
import { handleError } from './utils/errorHandler';
// import mainRouter from './routes';
import { DataBaseController } from './utils/dataBaseController';

const schema = makePrismaSchema({
    types: allTypes,
    prisma: {
        datamodelInfo,
        client: prisma,
    },

    outputs: {
        schema: path.join(__dirname, '../prisma/generated/schema.graphql'),
        typegen: path.join(__dirname, '../prisma/generated/nexus.ts'),
    },

    nonNullDefaults: {
        input: false,
        output: false,
    },

    typegenAutoConfig: {
        sources: [
            {
                source: path.join(__dirname, './types/prisma.ts'),
                alias: 'types',
            },
        ],
        contextType: 'types.Context',
    },
});

const server = new GraphQLServer({
    schema,
    context: request => {
        return {
            ...request,
            prisma,
        };
    },
});

// Get env congif
dotenv.config();

const app: express.Application = express();
const { PORT = 8080 } = process.env;

// Set up CORS policy
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ["POST"],
    credentials: true,
    maxAge: 3600,
};

// Set up CSRF protection
export const csrfProtection = csrf({ cookie: true });

// Set up port
app.set('port', PORT);

// Enable cookie parser
app.use(cookieParser());

// Enable Helmet
app.use(helmet({
    xssFilter: true,
    hidePoweredBy: true,
    // contentSecurityPolicy: true,
    ieNoOpen: true,
    referrerPolicy: true,
    permittedCrossDomainPolicies: true,
    frameguard: true,
}));

// Enable body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Include all routes
// app.use('/', mainRouter);

// Allows to override express methods
app.use(methodOverride());

// Enable express json parsing
app.use(express.json());

// Set up cors policy
app.use(cors(corsOptions));

// Enable custom error handler
app.use((
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.log(err);
    handleError(err, res);
});

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send(200);
});

// if (require.main === module) {
//     DataBaseController.connect('data');

//     app.listen(app.get('port'), () => {
//         console.log(`App listening to ${app.get('port')}...`, app.get('env'));
//     });
// }

server.start(() => console.log(`Server ready at http://localhost:4000`));

export default app;
