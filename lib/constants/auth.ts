export namespace BCRYPT_HASHER {
    export const BCRYPT_ROUNDS = 10;
}

export namespace USER_SERVICE {
    export const INVALID_CREDENTIALS_ERROR = 'Invalid email or password';
    export const SHORT_PASSWORD = 'Password must be minimum 8 characters';
    export const INVALID_EMAIL = 'Invalid email pattern';
}

export namespace JWT_SERVICE {
    export const JWT_SECRET = 'sup3rs3cr3tk3y';
    export const JWT_EXPIRES_IN = '216000';
    export const REFRESH_TOKEN_SECRET = '446fc55c-aeb8-4a18-936a-010cc339e508';
    export const REFRESH_EXPIRES_IN = '2592000';
}
