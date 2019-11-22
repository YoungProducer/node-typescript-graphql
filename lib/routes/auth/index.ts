import {
    Request,
    Response,
    NextFunction,
    Router,
} from 'express';
import * as _ from 'lodash';
import * as HttpErrors from 'http-errors';

// Prisma import
import { prisma } from '../../../prisma/generated/prisma-client';

// Custom imports
import restfull from '../../utils/restfull';
import {
    SignUpCredentials,
    SignInCredentials,
    UserProfile,
} from '../../types/auth';
import {
    AccessTokenService,
    RefreshTokenService,
    PasswordHasher,
    UserService,
} from '../../types/services';
import {
    UserModel,
    UserController,
} from '../../models/index';
import { validateCredentials } from '../../services/validator';
import { JWTAccessService } from '../../services/access-service';
import { JWTRefreshService } from '../../services/refresh-service';
import { BcryptHasher } from '../../services/bcrypt-hasher';
import { MyUserService } from '../../services/user-service';

const router = Router();

const routes = (
    passwordHasher: PasswordHasher = new BcryptHasher(),
    userService: UserService = new MyUserService(),
    accessTokenService: AccessTokenService = new JWTAccessService(),
    refreshTokenService: RefreshTokenService = new JWTRefreshService(),
) => (
    router.all(
        '/auth/signup',
        restfull({
            post: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {
                const credentials: SignUpCredentials = req.body;

                try {
                    validateCredentials(_.pick(credentials, ['email', 'password']));

                    credentials.password = await passwordHasher.hashPassword(credentials.password);

                    const savedUser = await prisma.createUser({
                        email: credentials.email,
                        password: credentials.password,
                        userName: credentials.userName,
                    });

                    return res.send(savedUser)
                        .status(200)
                        .end();
                } catch (error) {
                    if (error.errors) {
                        if (error.errors.userName) {
                            return next(new HttpErrors.Unauthorized('The userName is already in use'));
                        }
                        if (error.errors.email) {
                            return next(new HttpErrors.Unauthorized('The email is already in use'));
                        }
                    }
                    return next(error);
                }
            },
        }),
    ),
    router.all(
        '/auth/signin',
        restfull({
            post: async (
                req: Request,
                res: Response,
                next: NextFunction,
            ) => {

            },
        }),
    )
);

export default routes();
