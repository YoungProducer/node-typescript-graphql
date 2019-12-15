import { UserInputError } from 'apollo-server';
import { SignUpCredentials } from '../types/auth';

interface I_InvalidCredentials {
    email: boolean;
    password: boolean;
    userName: boolean;
}

interface I_InvalidCredentialsMessages {
    email: string;
    password: string;
    userName: string;
}

export const handleSignUpError = (error: any, credentials: SignUpCredentials) => {
    if (error) {
        console.log(error);
        const invalidCredentials: I_InvalidCredentials = {
            email: false,
            password: false,
            userName: false,
        };
        const invalidCredentialsMessages: I_InvalidCredentialsMessages = {
            email: '',
            password: '',
            userName: '',
        };

        if (error.result) {
            const { message } = error.result.errors[0];
            if (message.indexOf('email') !== -1) {
                invalidCredentials.email = true;
                invalidCredentialsMessages.email =
                    message.indexOf('unique') !== -1
                    && message.indexOf('email') !== -1
                    ? 'Email already exist.'
                    : message;
            }
            if (message.indexOf('password') !== -1) {
                invalidCredentials.password = true;
                invalidCredentialsMessages.password = message;
            }
            if (message.indexOf('userName') !== -1) {
                invalidCredentials.userName = true;
                invalidCredentialsMessages.userName = message;
            }
            if (invalidCredentials.email || invalidCredentials.password || invalidCredentials.userName) {
                throw new UserInputError('Form Arguments invalid', {
                    invalidCredentials,
                    invalidCredentialsMessages,
                });
            }
        }
    }
    throw error;
};
