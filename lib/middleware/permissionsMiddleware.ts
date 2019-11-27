import * as HttpErrors from 'http-errors';

import { jwtAuth } from '../auth-strategies/jwt-auth';
import { UserProfile } from '../types/auth';

export const permissions = async (resolve: any, root: any, args: any, context: any, info: any) => {
    const userProfile: UserProfile = await jwtAuth.authenticate(context.request);
    console.log(userProfile);

    if (userProfile.role !== 'ADMIN') {
        throw new HttpErrors.Unauthorized(`Invalid permissions. You can't get users data.`);
    }

    const result = await resolve(root, args, context, info);
    return result;
};
