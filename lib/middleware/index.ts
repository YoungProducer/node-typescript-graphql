import { jwtAuthentication } from './jwtAuthMiddleware';
import { permissions } from './permissionsMiddleware';

const authMiddleware = {
    Mutation: {
        protected: jwtAuthentication,
    },
};

const permissionsMiddleware = {
    Query: {
        user: permissions,
        users: permissions,
        token: permissions,
        tokens: permissions,
    },
};

export const middlewares = [authMiddleware, permissionsMiddleware];
