export const isProduction = process.env.NODE_ENV === "production";
export const port = process.env.PORT ? process.env.PORT : 8000;
export const publicFolder = process.env.STATIC_DIRECTORY;
export const host = `http://localhost:${port}`;