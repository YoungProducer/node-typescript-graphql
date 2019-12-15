import {
    stringArg,
    mutationType,
} from 'nexus';
import * as _ from 'lodash';
import { UserInputError } from 'apollo-server';

import {
    SignUpCredentials,
    SignInCredentials,
    UserProfile,
    securityId,
} from '../types/auth';
import { prisma, User } from '../../prisma/generated/prisma-client';
import { userService } from '../services/user-service';
import { validateCredentials } from '../services/validator';
import { bcryptHasher } from '../services/bcrypt-hasher';
import { jwtAccessService } from '../services/access-service';
import { jwtRefreshService } from '../services/refresh-service';
import { JWT_SERVICE } from '../constants';

import { handleSignUpError } from '../errors/handleSignUpError';
import { handleSignInError } from '../errors/handleSignInError';

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
                try {
                    validateCredentials(_.pick(credentials, ['email', 'password']));

                    credentials.password = await bcryptHasher.hashPassword(credentials.password);

                    const savedUser = await prisma.createUser({
                        email: credentials.email,
                        password: credentials.password,
                        userName: credentials.userName,
                        role: "DEFAULT_USER",
                    });

                    return {
                        ...savedUser,
                    };
                } catch (error) {
                    handleSignUpError(error, credentials);
                    // throw error;
                }

            },
        });
        t.field('signin', {
            type: 'SignInPayload',
            args: {
                email: stringArg(),
                password: stringArg(),
            },
            resolve: async (root, credentials: SignInCredentials, ctx) => {
                try {
                    // Verify user's credentials
                    const user: User = await userService.verifyCredentials(credentials);

                    // Create user profile
                    const userProfile: UserProfile = userService.convertToUserProfile(user);

                    // Generate new access token
                    const accessToken = await jwtAccessService.generateToken(userProfile);
                    // Generate new refresh token
                    const refreshToken = await jwtRefreshService.generateToken(userProfile);

                    const timezoneOffset = new Date().getTimezoneOffset();
                    const accessTokenExpirationDate = new Date(Date.now() + (timezoneOffset * -1 * 60 * 1000) + (Number(JWT_SERVICE.JWT_EXPIRES_IN)));
                    const refreshTokenExpirationDate = new Date(Date.now() + (timezoneOffset * -1 * 60 * 1000) + (Number(JWT_SERVICE.REFRESH_EXPIRES_IN)));

                    ctx.response.cookie('accessToken', `Bearer ${accessToken}`, {
                        // httpOnly: true,
                        // secure: // Uncomment in production mode,
                        expires: accessTokenExpirationDate,
                        domain: 'http://localhost:8080/',
                        path: '/',
                    });

                    ctx.response.cookie('refreshToken', refreshToken, {
                        // httpOnly: true,
                        // secure: // Uncomment in production mode,
                        expires: refreshTokenExpirationDate,
                        domain: 'http://localhost:8080/',
                        path: '/',
                    });

                    console.log(ctx.request.headers)
                    // console.log(ctx.response)

                    return {
                        ...userProfile,
                        id: userProfile[securityId],
                    };
                } catch (error) {
                    handleSignInError(error);
                }
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

                const timezoneOffset = new Date().getTimezoneOffset();
                const refreshTokenExpirationDate = new Date(Date.now() + (timezoneOffset * -1 * 60 * 1000) + (Number(JWT_SERVICE.REFRESH_EXPIRES_IN)));

                ctx.response.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    // secure: // Uncomment in production mode,
                    expires: refreshTokenExpirationDate,
                });

                return {
                    ...userProfile,
                };
            },
        });
        // t.field('me', {
        //     type: 'Me',
        //     args: {
        //         data: stringArg(),
        //     },
        //     resolve: async (root, credentials, ctx) => {
        //         return credentials.data;
        //     },
        // });
    },
});
