import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import { GraphQLServer } from 'graphql-yoga';

import { schema } from './schema';
import { prisma } from '../prisma/generated/prisma-client';
import { middlewares } from './middleware';

// Get env congif
dotenv.config();

const { PORT = 4000 } = process.env;

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:8080'],
};
const opts = {
    port: PORT,
    credentials: true,
    origin: ['http://localhost:8080'],
};

const server = new GraphQLServer({
    schema,
    middlewares,
    context: req => {
        return {
            ...req,
            prisma,
        };
    },
});

server.express.use(cors(corsOptions));
server.express.use(helmet({
    xssFilter: true,
    hidePoweredBy: true,
    // contentSecurityPolicy: true,
    ieNoOpen: true,
    referrerPolicy: true,
    permittedCrossDomainPolicies: true,
    frameguard: true,
}));
server.express.use(cookieParser());
server.start(opts, () => console.log(`Server ready at http://localhost:4000`));
