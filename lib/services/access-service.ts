import { promisify } from 'util';
import * as HttpErrors from 'http-errors';

import { AccessTokenService } from '../types/services';
import { UserProfile, securityId } from '../types/auth';
import { JWT_SERVICE } from '../constants';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTAccessService implements AccessTokenService {
    async verifyToken(token: string): Promise<UserProfile> {
        if (!token) {
            throw new HttpErrors.Unauthorized(`Error verifying token: 'token' is null`);
        }

        let userProfile: UserProfile;

        try {
            const decodedToken = await verifyAsync(
                token,
                JWT_SERVICE.JWT_SECRET,
            );

            userProfile = Object.assign(
                {
                    [securityId]: "",
                    id: "",
                    userName: "",
                    email: "",
                    role: "",
                },
                {
                    [securityId]: decodedToken.id,
                    id: decodedToken.id,
                    userName: decodedToken.userName,
                    email: decodedToken.email,
                    role: decodedToken.role,
                },
            );
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error verifying token: ${error.message}`,
            );
        }

        return userProfile;
    }

    async generateToken(userProfile: UserProfile): Promise<string> {
        if (!userProfile) {
            throw new HttpErrors.Unauthorized('Error generating token: userProfile is null');
        }

        const userInfoForToken = {
            id: userProfile[securityId],
            userName: userProfile.userName,
            email: userProfile.email,
            role: userProfile.role,
        };

        let token: string = '';

        try {
            token = await signAsync(
                userInfoForToken,
                JWT_SERVICE.JWT_SECRET, {
                    expiresIn: Number(JWT_SERVICE.JWT_EXPIRES_IN),
                });
        } catch (error) {
            throw new HttpErrors.Unauthorized(
                `Error encoding token: ${error.message}`,
            );
        }

        return token;
    }
}

export const jwtAccessService = new JWTAccessService();
