// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type AggregateToken {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createToken(data: TokenCreateInput!): Token!
  updateToken(data: TokenUpdateInput!, where: TokenWhereUniqueInput!): Token
  updateManyTokens(data: TokenUpdateManyMutationInput!, where: TokenWhereInput): BatchPayload!
  upsertToken(where: TokenWhereUniqueInput!, create: TokenCreateInput!, update: TokenUpdateInput!): Token!
  deleteToken(where: TokenWhereUniqueInput!): Token
  deleteManyTokens(where: TokenWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  token(where: TokenWhereUniqueInput!): Token
  tokens(where: TokenWhereInput, orderBy: TokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Token]!
  tokensConnection(where: TokenWhereInput, orderBy: TokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TokenConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

enum Role {
  ADMIN
  DEFAULT_USER
}

type Subscription {
  token(where: TokenSubscriptionWhereInput): TokenSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type Token {
  id: ID!
  token: String!
  loginId: String!
  user: User!
}

type TokenConnection {
  pageInfo: PageInfo!
  edges: [TokenEdge]!
  aggregate: AggregateToken!
}

input TokenCreateInput {
  id: ID
  token: String!
  loginId: String!
  user: UserCreateOneWithoutRefreshTokensInput!
}

input TokenCreateManyWithoutUserInput {
  create: [TokenCreateWithoutUserInput!]
  connect: [TokenWhereUniqueInput!]
}

input TokenCreateWithoutUserInput {
  id: ID
  token: String!
  loginId: String!
}

type TokenEdge {
  node: Token!
  cursor: String!
}

enum TokenOrderByInput {
  id_ASC
  id_DESC
  token_ASC
  token_DESC
  loginId_ASC
  loginId_DESC
}

type TokenPreviousValues {
  id: ID!
  token: String!
  loginId: String!
}

input TokenScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  loginId: String
  loginId_not: String
  loginId_in: [String!]
  loginId_not_in: [String!]
  loginId_lt: String
  loginId_lte: String
  loginId_gt: String
  loginId_gte: String
  loginId_contains: String
  loginId_not_contains: String
  loginId_starts_with: String
  loginId_not_starts_with: String
  loginId_ends_with: String
  loginId_not_ends_with: String
  AND: [TokenScalarWhereInput!]
  OR: [TokenScalarWhereInput!]
  NOT: [TokenScalarWhereInput!]
}

type TokenSubscriptionPayload {
  mutation: MutationType!
  node: Token
  updatedFields: [String!]
  previousValues: TokenPreviousValues
}

input TokenSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: TokenWhereInput
  AND: [TokenSubscriptionWhereInput!]
}

input TokenUpdateInput {
  token: String
  loginId: String
  user: UserUpdateOneRequiredWithoutRefreshTokensInput
}

input TokenUpdateManyDataInput {
  token: String
  loginId: String
}

input TokenUpdateManyMutationInput {
  token: String
  loginId: String
}

input TokenUpdateManyWithoutUserInput {
  create: [TokenCreateWithoutUserInput!]
  delete: [TokenWhereUniqueInput!]
  connect: [TokenWhereUniqueInput!]
  set: [TokenWhereUniqueInput!]
  disconnect: [TokenWhereUniqueInput!]
  update: [TokenUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [TokenUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [TokenScalarWhereInput!]
  updateMany: [TokenUpdateManyWithWhereNestedInput!]
}

input TokenUpdateManyWithWhereNestedInput {
  where: TokenScalarWhereInput!
  data: TokenUpdateManyDataInput!
}

input TokenUpdateWithoutUserDataInput {
  token: String
  loginId: String
}

input TokenUpdateWithWhereUniqueWithoutUserInput {
  where: TokenWhereUniqueInput!
  data: TokenUpdateWithoutUserDataInput!
}

input TokenUpsertWithWhereUniqueWithoutUserInput {
  where: TokenWhereUniqueInput!
  update: TokenUpdateWithoutUserDataInput!
  create: TokenCreateWithoutUserInput!
}

input TokenWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  token: String
  token_not: String
  token_in: [String!]
  token_not_in: [String!]
  token_lt: String
  token_lte: String
  token_gt: String
  token_gte: String
  token_contains: String
  token_not_contains: String
  token_starts_with: String
  token_not_starts_with: String
  token_ends_with: String
  token_not_ends_with: String
  loginId: String
  loginId_not: String
  loginId_in: [String!]
  loginId_not_in: [String!]
  loginId_lt: String
  loginId_lte: String
  loginId_gt: String
  loginId_gte: String
  loginId_contains: String
  loginId_not_contains: String
  loginId_starts_with: String
  loginId_not_starts_with: String
  loginId_ends_with: String
  loginId_not_ends_with: String
  user: UserWhereInput
  AND: [TokenWhereInput!]
}

input TokenWhereUniqueInput {
  id: ID
  token: String
  loginId: String
}

type User {
  id: ID!
  userName: String
  email: String!
  password: String!
  role: Role!
  refreshTokens(where: TokenWhereInput, orderBy: TokenOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Token!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  userName: String
  email: String!
  password: String!
  role: Role!
  refreshTokens: TokenCreateManyWithoutUserInput
}

input UserCreateOneWithoutRefreshTokensInput {
  create: UserCreateWithoutRefreshTokensInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutRefreshTokensInput {
  id: ID
  userName: String
  email: String!
  password: String!
  role: Role!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  userName_ASC
  userName_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  role_ASC
  role_DESC
}

type UserPreviousValues {
  id: ID!
  userName: String
  email: String!
  password: String!
  role: Role!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  userName: String
  email: String
  password: String
  role: Role
  refreshTokens: TokenUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  userName: String
  email: String
  password: String
  role: Role
}

input UserUpdateOneRequiredWithoutRefreshTokensInput {
  create: UserCreateWithoutRefreshTokensInput
  update: UserUpdateWithoutRefreshTokensDataInput
  upsert: UserUpsertWithoutRefreshTokensInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutRefreshTokensDataInput {
  userName: String
  email: String
  password: String
  role: Role
}

input UserUpsertWithoutRefreshTokensInput {
  update: UserUpdateWithoutRefreshTokensDataInput!
  create: UserCreateWithoutRefreshTokensInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  userName: String
  userName_not: String
  userName_in: [String!]
  userName_not_in: [String!]
  userName_lt: String
  userName_lte: String
  userName_gt: String
  userName_gte: String
  userName_contains: String
  userName_not_contains: String
  userName_starts_with: String
  userName_not_starts_with: String
  userName_ends_with: String
  userName_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  refreshTokens_some: TokenWhereInput
  AND: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  userName: String
  email: String
}
`