export interface Configuration {
    env: string;
    mode: string;
    database: string;
}

export default (): Configuration => ({
    env: process.env.NODE_ENV,
    mode: process.env.MODE,
    database: process.env.DATABASE_HOST
})