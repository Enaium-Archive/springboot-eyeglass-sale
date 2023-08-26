export type CommodityDto = {
    'CommodityController/DEFAULT': {
        readonly id: number, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly name: string, 
        readonly price: number, 
        readonly minimumPrescription: number, 
        readonly maximumPrescription: number, 
        readonly view: number, 
        readonly description: string, 
        readonly image: {readonly id: number}, 
        readonly category: {
            readonly id: number, 
            readonly name: string
        }
    }
}