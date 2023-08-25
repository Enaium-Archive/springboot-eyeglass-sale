import type { Executor } from './';

import { CommodityController, ImageController, MemberController, OrderController, SessionController } from './services';

export class Api {
    
    readonly commodityController: CommodityController;
    
    readonly imageController: ImageController;
    
    readonly memberController: MemberController;
    
    readonly orderController: OrderController;
    
    readonly sessionController: SessionController;
    
    constructor(executor: Executor) {
        this.commodityController = new CommodityController(executor);
        this.imageController = new ImageController(executor);
        this.memberController = new MemberController(executor);
        this.orderController = new OrderController(executor);
        this.sessionController = new SessionController(executor);
    }
}