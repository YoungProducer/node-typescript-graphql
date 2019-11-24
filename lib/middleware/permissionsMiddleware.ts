
export const permissionsMiddlware = async (resolve: any, root: any, args: any, context: any, info: any) => {
    console.log(args);
    const result = await resolve(root, args, context, info);
    return result;
};
