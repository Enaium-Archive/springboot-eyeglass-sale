export type AllErrors = 
    {
        readonly family: "COMMODITY_ERROR",
        readonly code: "COMMODITY_NOT_FOUND"
    } | 
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
    "categoryController": {
    },
    "commodityController": {
        "getCommodity": AllErrors & (
            {
                readonly family: 'COMMODITY_ERROR',
                readonly code: 'COMMODITY_NOT_FOUND',
                readonly [key:string]: any
            }
        )
    },
    "imageController": {
    },
    "memberController": {
    },
    "orderController": {
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
