import { Auth } from './Mutation';
import { User } from './User';
import { SignUpPayload, SignInPayload, RefreshPayload, Me } from './AuthPayloads';
import { UserData } from './Queries';

export const resolvers = {
    Auth,
    User,
    SignUpPayload,
    SignInPayload,
    RefreshPayload,
    Me,
    UserData,
};
