import type { Executor } from '../';
import type { CategoryDto } from '../model/dto';
import type { CategoryInput } from '../model/static';

export class CategoryController {
    
    constructor(private executor: Executor) {}
    
    async getCategories(): Promise<
        ReadonlyArray<CategoryDto['DEFAULT']>
    > {
        let _uri = '/categories/';
        return (await this.executor({uri: _uri, method: 'GET'})) as ReadonlyArray<CategoryDto['DEFAULT']>
    }
    
    async removeCategory(options: CategoryControllerOptions['removeCategory']): Promise<void> {
        let _uri = '/categories/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'DELETE'})) as void
    }
    
    async saveCategory(options: CategoryControllerOptions['saveCategory']): Promise<void> {
        let _uri = '/categories/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as void
    }
}

export type CategoryControllerOptions = {
    'getCategories': {},
    'removeCategory': {readonly id: number},
    'saveCategory': {readonly body: CategoryInput}
}