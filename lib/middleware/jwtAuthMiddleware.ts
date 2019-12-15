import { rule } from 'graphql-shield';
import {  } from 'graphql-yoga';

import { jwtAuth } from '../auth-strategies/jwt-auth';

import { UserProfile } from '../types/auth';
import { IRuleResult } from 'graphql-shield/dist/types';

export const jwtAuthentication = async (resolve: any, root: any, args: any, context: any, info: any) => {
    const userProfile: UserProfile = await jwtAuth.authenticate(context.request);
    // console.log(Object.assign({ ...context }, { ...context, userProfile }));
    const result = await resolve(root, args, Object.assign({ ...context }, { ...context, userProfile }), info);
    return result;
};

export const jwt = rule()(async(parent: any, args: any, context: any) => {
    const userProfile: UserProfile = await jwtAuth.authenticate(context.request);
    console.log(userProfile);
    return userProfile !== null || userProfile !== undefined;
});
