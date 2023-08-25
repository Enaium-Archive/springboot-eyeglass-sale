import type { ImageInput } from './';

export interface CommodityInput {
    
    readonly description?: string;
    
    readonly id?: number;
    
    readonly image: ImageInput;
    
    readonly maximumPrescription?: number;
    
    readonly minimumPrescription?: number;
    
    readonly name?: string;
    
    readonly price?: number;
}
