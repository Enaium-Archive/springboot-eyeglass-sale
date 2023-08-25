import type { Executor } from '../';
import type { MemberDto } from '../model/dto';
import type { MemberInput, Page } from '../model/static';

export class MemberController {
    
    constructor(private executor: Executor) {}
    
    async getMembers(options: MemberControllerOptions['getMembers']): Promise<
        Page<MemberDto['MemberController/DEFAULT']>
    > {
        let _uri = '/members/';
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
        return (await this.executor({uri: _uri, method: 'GET'})) as Page<MemberDto['MemberController/DEFAULT']>
    }
    
    async saveMember(options: MemberControllerOptions['saveMember']): Promise<void> {
        let _uri = '/members/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
}

export type MemberControllerOptions = {
    'getMembers': {readonly page?: number, readonly size?: number},
    'saveMember': {readonly body: MemberInput}
}