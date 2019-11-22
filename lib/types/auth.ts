export declare const securityId: unique symbol;

export interface Principal {
    [securityId]: string;
    [attribute: string]: any;
}

export interface SignUpCredentials {
    email: string;
    password: string;
    userName?: string;
}

export interface SignInCredentials {
    email: string;
    password: string;
}

export interface UserProfile extends Principal {
    email: string;
    userName: string;
}
