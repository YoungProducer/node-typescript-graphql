import {
    UserProfile,
    SignInCredentials,
} from './auth';
import {
    UserModel,
} from '../models/user';

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
    verifyCredentials(credentials: SignInCredentials): Promise<UserModel>;
    convertToUserProfile(user: UserModel): UserProfile;
}
