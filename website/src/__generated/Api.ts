import type { Executor } from './';

import { MemberController, SessionController } from './services';

export class Api {
    
    readonly memberController: MemberController;
    
    readonly sessionController: SessionController;
    
    constructor(executor: Executor) {
        this.memberController = new MemberController(executor);
        this.sessionController = new SessionController(executor);
    }
}