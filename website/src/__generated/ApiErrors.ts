export type AllErrors = 
    {
        readonly family: "SESSION_ERROR",
        readonly code: "PASSWORD_NOT_MATCHED"
    } | 
    {
        readonly family: "SESSION_ERROR",
        readonly code: "USERNAME_NOT_FOUND"
    }
;

export type ApiErrors = {
    "commodityController": {
    },
    "imageController": {
    },
    "memberController": {
    },
    "sessionController": {
        "login": AllErrors & (
            {
                readonly family: 'SESSION_ERROR',
                readonly code: 'USERNAME_NOT_FOUND',
                readonly [key:string]: any
            } | 
            {
                readonly family: 'SESSION_ERROR',
                readonly code: 'PASSWORD_NOT_MATCHED',
                readonly [key:string]: any
            }
        )
    }
};
