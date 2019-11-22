import { promisify } from 'util';
import * as HttpErrors from 'http-errors';

import {
    UserController,
    TokenController,
} from '../models/index';
import { RefreshTokenService } from '../types/services';
import { UserProfile, securityId } from '../types/auth';
import { JWT_SERVICE } from '../constants/index';

const uuid = require('uuid/v4');
const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTRefreshService implements RefreshTokenService {
    async verifyToken(token: string): Promise<UserProfile> {
        if (!token) {
            throw new HttpErrors.Unauthorized(
                `Error verifying refresh token: refreshToken is null`,
            );
        }

        let userProfile: UserProfile;

        try {
            // Find token in database
            // If refreshToken is incorrect - delete all tokens related to current user with same hash properties
            // If refreshToken is correct then delete provided refreshToken which related to current user

            const foundToken = await TokenController.findOne({ token });

            const decodedToken = await verifyAsync(
                token,
                JWT_SERVICE.REFRESH_TOKEN_SECRET,
            );

            const foundUser = await UserController.findOne({ email: decodedToken.email });
            const refreshTokens = foundUser.refreshTokens;

            await TokenController.deleteMany({ loginId: decodedToken.hash });

            foundUser.refreshTokens = refreshTokens.filter(token => {
                return token.loginId !== decodedToken.hash;
            });
            foundUser.save(err => {
                if (err) {
                    throw err;
                }
            });

            if (!foundToken) {
                throw new HttpErrors.Unauthorized('Invalid refresh token');
            }

            userProfile = Object.assign(
                {
                    [securityId]: "",
                    userName: "",
                    email: "",
                    hash: "",
                },
                {
                    [securityId]: decodedToken.bind,
                    userName: decodedToken.userName,
                    email: decodedToken.email,
                    hash: decodedToken.hash,
                },
            );
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error verifying refreshToken: ${error.message}`,
            );
        }

        return userProfile;
    }

    // In Rest API after successful token verifying push received UserProfile to this function
    async generateToken(userProfile: UserProfile): Promise<string> {
        if (!userProfile) {
            throw new HttpErrors.Unauthorized(
                `Error generating refresh token: userProfile is null`,
            );
        }

        const userInfoForToken = {
            id: userProfile[securityId],
            userName: userProfile.userName,
            email: userProfile.email,
            hash: userProfile.hash || uuid(),
        };

        let token: string = '';

        try {
            token = await signAsync(
                userInfoForToken,
                JWT_SERVICE.REFRESH_TOKEN_SECRET, {
                    expiresIn: Number(JWT_SERVICE.REFRESH_EXPIRES_IN),
                },
            );

            const foundUser = await UserController.findOne({ email: userProfile.email });

            if (!foundUser) {
                throw new HttpErrors.Unauthorized('Invalid userProfile');
            }

            const refreshToken = await TokenController.create({
                token,
                user: foundUser,
                loginId: userInfoForToken.hash,
            });

            foundUser.refreshTokens.push(refreshToken);
            foundUser.save(err => {
                if (err) {
                    throw err;
                }
            });
            // Create record in database
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error generating refresh token: ${error.message}`,
            );
        }

        return token;
    }
}
