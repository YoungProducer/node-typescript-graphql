import { UserInputError } from 'apollo-server';

interface I_InvalidCredentials {
    email: boolean;
    password: boolean;
}

interface I_InvalidCredentialsMessages {
    email: string;
    password: string;
}

export const handleSignInError = (error: any) => {
    if (error) {
        console.log(error);
        const invalidCredentials: I_InvalidCredentials = {
            email: false,
            password: false,
        };
        const invalidCredentialsMessages: I_InvalidCredentialsMessages = {
            email: '',
            password: '',
        };

        if (error.message === 'User not found') {
            invalidCredentials.email = true;
            invalidCredentialsMessages.email = error.message;
        }

        if (error.message === 'Incorrect password') {
            invalidCredentials.password = true;
            invalidCredentialsMessages.password = error.message;
        }

        throw new UserInputError('Invalid credentials', {
            invalidCredentials,
            invalidCredentialsMessages,
        });
    }
};
