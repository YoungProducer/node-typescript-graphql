import { shield } from 'graphql-shield';

import { jwtAuthentication, jwt } from './jwtAuthMiddleware';
import { permissions } from './permissionsMiddleware';

const authMiddleware = {
    Query: {
        me: jwtAuthentication,
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

const auth = shield({
    Query: {
        me: jwt,
    },
});

// export const middlewares = [authMiddleware, permissionsMiddleware];
export const middlewares = [authMiddleware];
