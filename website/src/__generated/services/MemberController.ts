import type { Executor } from '../';
import type { MemberInput } from '../model/static';

export class MemberController {
    
    constructor(private executor: Executor) {}
    
    async saveMember(options: MemberControllerOptions['saveMember']): Promise<void> {
        let _uri = '/members/';
        return (await this.executor({uri: _uri, method: 'PUT', body: options.body})) as void
    }
}

export type MemberControllerOptions = {
    'saveMember': {readonly body: MemberInput}
}