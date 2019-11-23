import { Auth } from './Mutation';
import { User } from './User';
import { SignUpPayload, SignInPayload, RefreshPayload } from './AuthPayloads';

export const resolvers = {
    Auth,
    User,
    SignUpPayload,
    SignInPayload,
    RefreshPayload,
};
