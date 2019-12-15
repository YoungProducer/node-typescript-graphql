import {
    stringArg,
    queryType,
} from 'nexus';
import { UserProfile } from '../types/auth';

export const UserData = queryType({
    definition(t) {
        t.field('me', {
            type: 'Me',
            args: {
                data: stringArg(),
            },
            resolve: async (root, credentials, ctx) => {
                return { ...ctx.userProfile };
            },
        });
    },
});
