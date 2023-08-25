import type { Gender } from '../enums';

export type MemberDto = {
    'MemberController/DEFAULT': {
        readonly id: number, 
        readonly createdTime: string, 
        readonly modifiedTime: string, 
        readonly username: string, 
        readonly phone?: string, 
        readonly gender?: Gender
    }
}