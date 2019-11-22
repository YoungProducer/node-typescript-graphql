import { objectType } from 'nexus';

export const SignUpPayload = objectType({
    name: 'AuthPayload',
    definition(t) {
        t.string('email');
        t.string('password');
        t.field('user', { type: 'User' });
    },
});
