import type { Executor } from '../';
import type { MultipartFile } from '../model/static';

export class ImageController {
    
    constructor(private executor: Executor) {}
    
    async getImage(options: ImageControllerOptions['getImage']): Promise<void> {
        let _uri = '/images/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'GET'})) as void
    }
    
    async uploadImage(options: ImageControllerOptions['uploadImage']): Promise<number> {
        let _uri = '/images/';
        return (await this.executor({uri: _uri, method: 'POST'})) as number
    }
}

export type ImageControllerOptions = {
    'getImage': {readonly id: number},
    'uploadImage': {readonly file: MultipartFile}
}