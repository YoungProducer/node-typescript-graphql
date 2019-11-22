import * as validator from 'isemail';
import * as HttpErrors from 'http-errors';

import {
    SignUpCredentials,
} from '../types/auth';
import {
    USER_SERVICE,
} from '../constants';

export const validateCredentials = (credentials: SignUpCredentials) => {

    if (credentials.email === undefined || credentials.password === undefined) {
        throw new HttpErrors.UnprocessableEntity('Incorrect request. Missed email or password property');
    }

    if (!validator.validate(credentials.email)) {
        throw new HttpErrors.Unauthorized(USER_SERVICE.INVALID_EMAIL);
    }

    if (credentials.password.length < 8) {
        throw new HttpErrors.Unauthorized(USER_SERVICE.SHORT_PASSWORD);
    }
};
