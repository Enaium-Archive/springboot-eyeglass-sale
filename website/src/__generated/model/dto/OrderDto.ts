export type OrderDto = {
    'OrderController/DEFAULT': {
        readonly id: number, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly quantity?: number, 
        readonly prescription?: number, 
        readonly commodity: {
            readonly id: number, 
            readonly name: string, 
            readonly price: number
        }
    }
}