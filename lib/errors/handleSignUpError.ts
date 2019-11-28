import { UserInputError } from 'apollo-server';
import { SignUpCredentials } from '../types/auth';

export const handleSignUpError = (error: any, credentials: SignUpCredentials) => {
    if (error) {
        console.log({ error })
        const { message } = error.result.errors[0];
        const invalidArg = Object.keys(credentials).filter(arg => message.indexOf(arg) !== -1);
        if (invalidArg) {
            throw new UserInputError('Form Arguments invalid', {
                invalidArg,
            });
        }
    }
    throw error;
};
