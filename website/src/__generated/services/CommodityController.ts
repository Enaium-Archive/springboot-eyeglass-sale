import type { Executor } from '../';
import type { CommodityDto } from '../model/dto';
import type { CommodityInput, Page } from '../model/static';

export class CommodityController {
    
    constructor(private executor: Executor) {}
    
    async getCommodities(options: CommodityControllerOptions['getCommodities']): Promise<
        Page<CommodityDto['CommodityController/DEFAULT']>
    > {
        let _uri = '/commodities/';
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
        _value = options.minimumPrescription;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'minimumPrescription='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        _value = options.maximumPrescription;
        if (_value !== undefined && _value !== null) {
            _uri += _separator
            _uri += 'maximumPrescription='
            _uri += encodeURIComponent(_value);
            _separator = '&';
        }
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<CommodityDto['CommodityController/DEFAULT']>
    }
    
    async getCommodity(options: CommodityControllerOptions['getCommodity']): Promise<
        CommodityDto['CommodityController/DEFAULT']
    > {
        let _uri = '/commodities/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'GET'})) as CommodityDto['CommodityController/DEFAULT']
    }
    
    async removeCommodity(options: CommodityControllerOptions['removeCommodity']): Promise<void> {
        let _uri = '/commodities/';
        _uri += encodeURIComponent(options.id);
        _uri += '/';
        return (await this.executor({uri: _uri, method: 'DELETE'})) as void
    }
    
    async saveCommodity(options: CommodityControllerOptions['saveCommodity']): Promise<void> {
        let _uri = '/commodities/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
}

export type CommodityControllerOptions = {
    'getCommodities': {
        readonly page?: number, 
        readonly size?: number, 
        readonly minimumPrescription?: number, 
        readonly maximumPrescription?: number
    },
    'getCommodity': {readonly id: number},
    'removeCommodity': {readonly id: number},
    'saveCommodity': {readonly body: CommodityInput}
}