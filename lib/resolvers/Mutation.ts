import {
    stringArg,
    idArg,
    mutationType,
} from 'nexus';
import * as _ from 'lodash';

import {
    SignUpCredentials,
    SignInCredentials,
    UserProfile,
} from '../types/auth';
import { prisma } from '../../prisma/generated/prisma-client';
import { userService } from '../services/user-service';
import { validateCredentials } from '../services/validator';
import { bcryptHasher } from '../services/bcrypt-hasher';

export const Mutation = mutationType({
    definition(t) {
        t.field('signup', {
            type: 'SignUpPayload',
            args: {
                userName: stringArg({ nullable: true }),
                email: stringArg(),
                password: stringArg(),
            },
            resolve: async(root, credentials: SignUpCredentials, ctx) => {
                validateCredentials(_.pick(credentials, ['email', 'password']));

                credentials.password = await bcryptHasher.hashPassword(credentials.password);

                const savedUser = await prisma.createUser({
                    email: credentials.email,
                    password: credentials.password,
                    userName: credentials.userName,
                });

                return {
                    ...savedUser,
                };
            },
        });
    },
});
