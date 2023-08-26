import type { CommodityInput } from './';

export interface OrderInput {
    
    readonly commodity: CommodityInput;
    
    readonly id?: number;
    
    readonly memberId?: number;
    
    readonly prescription?: number;
    
    readonly quantity?: number;
}
