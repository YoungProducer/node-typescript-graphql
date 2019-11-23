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
import { prisma, User } from '../../prisma/generated/prisma-client';
import { userService } from '../services/user-service';
import { validateCredentials } from '../services/validator';
import { bcryptHasher } from '../services/bcrypt-hasher';
import { jwtAccessService } from '../services/access-service';
import { jwtRefreshService } from '../services/refresh-service';

export const Auth = mutationType({
    definition(t) {
        t.field('signup', {
            type: 'SignUpPayload',
            args: {
                userName: stringArg({ nullable: true }),
                email: stringArg(),
                password: stringArg(),
            },
            resolve: async (root, credentials: SignUpCredentials, ctx) => {
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
        t.field('signin', {
            type: 'SignInPayload',
            args: {
                email: stringArg(),
                password: stringArg(),
            },
            resolve: async (root, credentials: SignInCredentials, ctx) => {
                // Verify user's credentials
                const user: User = await userService.verifyCredentials(credentials);

                // Create user profile
                const userProfile: UserProfile = userService.convertToUserProfile(user);

                // Generate new access token
                const accessToken = jwtAccessService.generateToken(userProfile);

                const refreshToken = jwtRefreshService.generateToken(userProfile);

                return {
                    ...userProfile,
                };
            },
        });
        t.field('refresh', {
            type: 'RefreshPayload',
            args: {
                token: stringArg(),
            },
            resolve: async (root, credentials, ctx) => {
                const userProfile: UserProfile = await jwtRefreshService.verifyToken(credentials.token);

                const refreshToken = await jwtRefreshService.generateToken(userProfile);

                return {
                    ...userProfile,
                };
            },
        });
    },
});
