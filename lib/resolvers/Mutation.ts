import {
    stringArg,
    idArg,
    mutationType,
} from 'nexus';

export const Mutation = mutationType({
    definition(t) {
        t.field('signup', {
            type: 'AuthPayload',
            args: {
                userName: stringArg({ nullable: true }),
                email: stringArg(),
                password: stringArg(),
            },
            resolve: async(_, { userName, email, password }, ctx) => {
                return {
                    userName,
                    email,
                };
            },
        });
    },
});
