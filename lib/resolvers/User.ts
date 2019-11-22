import { prismaObjectType } from 'nexus-prisma';

export const User = prismaObjectType({
    name: 'User',
    definition(t) {
        t.prismaFields([
            'id',
            'email',
            'password',
            'userName',
            {
                name: 'refreshTokens',
                args: [],
            },
        ]);
    },
});
