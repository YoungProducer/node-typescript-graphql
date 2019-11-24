import { jwtAuth } from '../auth-strategies/jwt-auth';

import { UserProfile } from '../types/auth';

export const jwtAuthMiddleware = async (resolve: any, root: any, args: any, context: any, info: any) => {
    const userProfile: UserProfile = await jwtAuth.authenticate(context.request);
    console.log(Object.assign({ ...context }, { ...context, userProfile }));
    const result = await resolve(root, args, context, info);
    return result;
};
