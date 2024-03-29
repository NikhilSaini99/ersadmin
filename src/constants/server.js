
const PRODUCTION_ENV = 'production'
export function isProduction() {
    return process.env.NODE_ENV === PRODUCTION_ENV;
}
// export const LOCAL_SERVER_HOST = 'http://13.234.232.171:8000'
export const LOCAL_SERVER_HOST = 'http://102.36.181.13:8000'
export const EC2_SERVER_HOST = 'http://102.36.181.13:8000'
export const NODE_ENV = process.env.NODE_ENV;
export const HOST = isProduction() ? EC2_SERVER_HOST : LOCAL_SERVER_HOST;
export const API_HOST = `${HOST}/api`;

//http://102.36.181.13:8000