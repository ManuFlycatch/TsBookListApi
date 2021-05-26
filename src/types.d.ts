declare namespace Express {
    export interface Request {
        userInfo?:Record<string,any>
        user? : Record<string,any>
    }
}