import {
    UserProfile,
    SignInCredentials,
} from './auth';
import {
    UserModel,
} from '../models/user';
import { User } from '../../prisma/generated/prisma-client';

export interface PasswordHasher<T = string> {
    hashPassword(password: T): Promise<string>;
    comparePasswords(providedpass: T, storedPass: T): Promise<boolean>;
}

export interface AccessTokenService {
    verifyToken(token: string): Promise<UserProfile>;
    generateToken(userProfile: UserProfile): Promise<string>;
}

export interface RefreshTokenService {
    verifyToken(token: string): Promise<UserProfile>;
    generateToken(userProfile: UserProfile): Promise<string>;
}

export interface UserService {
    verifyCredentials(credentials: SignInCredentials): Promise<User>;
    convertToUserProfile(user: User): UserProfile;
}
