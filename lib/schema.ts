import { makePrismaSchema } from 'nexus-prisma';
import * as path from 'path';

import * as allTypes from './resolvers';
import { prisma } from '../prisma/generated/prisma-client';
import datamodelInfo from '../prisma/generated/nexus-prisma';

export const schema = makePrismaSchema({
    types: allTypes,
    prisma: {
        datamodelInfo,
        client: prisma,
    },

    outputs: {
        schema: path.join(__dirname, '../prisma/generated/schema.graphql'),
        typegen: path.join(__dirname, '../prisma/generated/nexus.ts'),
    },

    nonNullDefaults: {
        input: false,
        output: false,
    },

    typegenAutoConfig: {
        sources: [
            {
                source: path.join(__dirname, './types/prisma.ts'),
                alias: 'types',
            },
        ],
        contextType: 'types.Context',
    },
});
