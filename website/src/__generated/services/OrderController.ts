import type { Executor } from '../';
import type { OrderDto } from '../model/dto';
import type { Page } from '../model/static';

export class OrderController {
    
    constructor(private executor: Executor) {}
    
    async getOrders(options: OrderControllerOptions['getOrders']): Promise<
        Page<OrderDto['DEFAULT']>
    > {
        let _uri = '/orders/';
        let _separator = _uri.indexOf('?') === -1 ? '?' : '&';
        let _value: any = undefined;
        _value = options.page;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'page='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.size;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'size='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<OrderDto['DEFAULT']>
    }
}

export type OrderControllerOptions = {
    'getOrders': {readonly page?: number, readonly size?: number}
}