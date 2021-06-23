export const validation = (schema, value) => {
    const options = {};
    return schema.validate(value, options);
}