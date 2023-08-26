import type { Executor } from '../';
import type { OrderDto } from '../model/dto';
import type { OrderInput, Page } from '../model/static';

export class OrderController {
    
    constructor(private executor: Executor) {}
    
    async createOrder(options: OrderControllerOptions['createOrder']): Promise<void> {
        let _uri = '/orders/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as void
    }
    
    async getMonthlyCount(): Promise<number> {
        let _uri = '/orders/monthly-count/';
        return (await this.executor({uri: _uri, method: 'GET'})) as number
    }
    
    async getOrders(options: OrderControllerOptions['getOrders']): Promise<
        Page<OrderDto['OrderController/DEFAULT']>
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
        _value = options.member;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'member='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<OrderDto['OrderController/DEFAULT']>
    }
    
    async getQuarterlyCount(): Promise<number> {
        let _uri = '/orders/quarterly-count/';
        return (await this.executor({uri: _uri, method: 'GET'})) as number
    }
    
    async removeOrder(options: OrderControllerOptions['removeOrder']): Promise<void> {
        let _uri = '/orders/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'DELETE'})) as void
    }
}

export type OrderControllerOptions = {
    'createOrder': {readonly body: OrderInput},
    'getMonthlyCount': {},
    'getOrders': {
        readonly page?: number, 
        readonly size?: number, 
        readonly member?: number
    },
    'getQuarterlyCount': {},
    'removeOrder': {readonly id: number}
}