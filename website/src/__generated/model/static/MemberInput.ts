import type { Gender } from '../enums';

export interface MemberInput {
    
    readonly gender?: Gender;
    
    readonly id?: number;
    
    readonly password?: string;
    
    readonly phone?: number;
    
    readonly username?: string;
}
