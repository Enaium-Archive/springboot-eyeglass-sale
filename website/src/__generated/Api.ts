import type { Executor } from './';

import { CommodityController, ImageController, MemberController, SessionController } from './services';

export class Api {
    
    readonly commodityController: CommodityController;
    
    readonly imageController: ImageController;
    
    readonly memberController: MemberController;
    
    readonly sessionController: SessionController;
    
    constructor(executor: Executor) {
        this.commodityController = new CommodityController(executor);
        this.imageController = new ImageController(executor);
        this.memberController = new MemberController(executor);
        this.sessionController = new SessionController(executor);
    }
}