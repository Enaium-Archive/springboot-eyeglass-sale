export type OrderDto = {
    'DEFAULT': {
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly id: number, 
        readonly member: {readonly id: number}, 
        readonly commodity: {readonly id: number}, 
        readonly quantity?: number
    }
}