import { Schema, Document, model } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

import { TokenModel } from './token';

export interface UserModel extends Document
 {
    id: string;
    userName: string;
    email: string;
    password: string;
    refreshTokens: TokenModel[];
}

const UserSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        index: true,
    },
    userName: {
        type: String,
        unique: true,
        default: '',
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.plugin(uniqueValidator);

export const UserController = model<UserModel>('User', UserSchema);
