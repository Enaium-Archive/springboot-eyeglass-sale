export type CommodityDto = {
    'CommodityController/DEFAULT': {
        readonly id: number, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly name: string, 
        readonly price: number, 
        readonly minimumPrescription: number, 
        readonly maximumPrescription: number, 
        readonly description: string, 
        readonly image: {readonly id: number}
    }
}