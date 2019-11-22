import { objectType } from 'nexus';

export const SignUpPayload = objectType({
    name: 'SignUpPayload',
    definition(t) {
        t.string('email');
        t.string('password');
        t.field('user', { type: 'User' });
    },
});
