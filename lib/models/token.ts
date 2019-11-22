import { Schema, Document, model } from 'mongoose';

import { UserModel } from './user';

export interface TokenModel extends Document {
    token: string;
    loginId: string;
    user: UserModel;
}

const TokenSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        index: true,
    },
    token: {
        type: String,
        unique: true,
        required: true,
    },
    loginId: { // When user login from new device server must create unique hash value to mark "session"
        type: String,
        unique: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const TokenController = model<TokenModel>('Token', TokenSchema);
