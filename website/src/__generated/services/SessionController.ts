import type { Executor } from '../';
import type { MemberInput, Session } from '../model/static';

export class SessionController {
    
    constructor(private executor: Executor) {}
    
    async login(options: SessionControllerOptions['login']): Promise<
        Session
    > {
        let _uri = '/sessions/';
        return (await this.executor({uri: _uri, method: 'POST', body: options.body})) as Session
    }
}

export type SessionControllerOptions = {
    'login': {readonly body: MemberInput}
}