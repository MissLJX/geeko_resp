// ToTal Order Status
export const TOTAL_STATUS_UNPAID = 0;       //未付款订单
export const TOTAL_STATUS_PROCCESSING = 1;      //仓库正在打包与包含废弃状态paid一起存在的订单
export const TOTAL_STATUS_SHIPPED = 2;      //运送中的订单
export const TOTAL_STATUS_CANCELED = 3;     //已取消订单
export const TOTAL_STATUS_REVIEW = 4;        //已完成订单

//Order Package Status
export const PACKAGE_STATUS_PROCESSING = 0;     //订单与包裹的状态同为processing状态
export const PACKAGE_STATUS_PACKED = 1;     // Shipped状态订单中已打包完成
export const PACKAGE_STATUS_IN_TRANSITE = 2;        //Shipped状态订单中 已经发货正在运输
export const PACKAGE_STATUS_DELIVERED = 3;      //Shipped状态订单中 订单被签收
export const PACKAGE_STATUS_CANCELED = 4;       //被取消的包裹
