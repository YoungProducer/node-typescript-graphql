import { objectType } from 'nexus';

export const SignUpPayload = objectType({
    name: 'SignUpPayload',
    definition(t) {
        t.string('email');
        t.string('userName');
        t.string('id');
    },
});

export const SignInPayload = objectType({
    name: 'SignInPayload',
    definition(t) {
        t.string('id');
        t.string('email');
        t.string('userName');
    },
});

export const RefreshPayload = objectType({
    name: 'RefreshPayload',
    definition(t) {
        t.string('id');
        t.string('email');
        t.string('userName');
    },
});

export const Protected = objectType({
    name: 'Protected',
    definition(t) {
        t.string('data');
    },
});
