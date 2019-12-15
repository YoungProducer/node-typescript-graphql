import {
    Request,
} from 'express';
import * as HttpErrors from 'http-errors';

import {
    AuthStrategy,
    UserProfile,
} from '../types/auth';
import { jwtAccessService } from '../services/access-service';

export class JWTAuth implements AuthStrategy {
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        const token: string = this.extractCredentials(request);
        const userProfile: UserProfile = await jwtAccessService.verifyToken(token);
        return userProfile;
    }

    extractCredentials(request: Request): string {
        console.log(request.cookies);
        if (!request.cookies['accessToken']) {
            throw new HttpErrors.Unauthorized('Authorization token not found');
        }

        const authHeaderValue = request.cookies['accessToken'];

        if (!authHeaderValue.startsWith('Bearer')) {
            throw new HttpErrors.Unauthorized('Authorization header is not of type Bearer');
        }

        const parts = authHeaderValue.split(' ');

        if (parts.length !== 2) {
            throw new HttpErrors.Unauthorized(
                `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
            );
        }

        const token = parts[1];

        return token;
    }
}

export const jwtAuth = new JWTAuth();
