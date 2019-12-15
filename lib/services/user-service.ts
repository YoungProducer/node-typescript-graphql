import * as HttpErrors from 'http-errors';

import { BcryptHasher } from '../services/bcrypt-hasher';
import {
    UserService,
    PasswordHasher,
} from '../types/services';
import {
    SignInCredentials,
    UserProfile,
    securityId,
} from '../types/auth';
import { USER_SERVICE } from '../constants';
import { prisma, User } from '../../prisma/generated/prisma-client';

export class MyUserService implements UserService {
    constructor(
        protected bcryptHasher: PasswordHasher = new BcryptHasher(),
    ) { }

    async verifyCredentials(credentials: SignInCredentials): Promise<User> {
        const { email, password } = credentials;

        const foundUser = await prisma.user({ email });

        if (!foundUser) {
            throw new HttpErrors.Unauthorized('User not found');
        }

        const passwordMatched = await this.bcryptHasher.comparePasswords(password, foundUser.password);

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized('Incorrect password');
        }

        return foundUser;
    }

    convertToUserProfile(user: User): UserProfile {
        return {
            [securityId]: user.id,
            userName: user.userName || "",
            email: user.email,
            role: user.role,
        };
    }
}

export const userService = new MyUserService();
