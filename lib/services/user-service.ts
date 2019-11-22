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
import {
    UserController,
    UserModel,
} from '../models';
import { USER_SERVICE } from '../constants';

export class MyUserService implements UserService {
    constructor(
        protected bcryptHasher: PasswordHasher = new BcryptHasher(),
    ) { }

    async verifyCredentials(credentials: SignInCredentials): Promise<UserModel> {
        const { email, password } = credentials;

        const foundUser = await UserController.findOne({ email });

        if (!foundUser) {
            throw new HttpErrors.Unauthorized(USER_SERVICE.INVALID_CREDENTIALS_ERROR);
        }

        const passwordMatched = await this.bcryptHasher.comparePasswords(password, foundUser.password);

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized(USER_SERVICE.INVALID_CREDENTIALS_ERROR);
        }

        return foundUser;
    }

    convertToUserProfile(user: UserModel): UserProfile {
        return {
            [securityId]: user._id,
            userName: user.userName || "",
            email: user.email,
        };
    }
}
