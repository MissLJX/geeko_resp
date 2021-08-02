const getters = {
    me: state => state.me,
    feed: state => state.feed,
    addresses: state => state.addresses,
    coupons: state => state.coupons,
    credits: state => state.credits,
    creditskip: state => state.creditskip,
/*    allPoints: state => state.allPoints,*/
    initialized: state => state.initialized,
    wishlist: state => state.wishlist,
    save: state => state.save,
    orderNotifications: state => state.orderNotifications,
    promotionNotifications: state => state.promotionNotifications,
    otherNotifications: state => state.otherNotifications,
    wishProducts: state => state.wishProducts,
    refreshProducts: state => state.refreshProducts,
    wishskip: state => state.wishskip,
    youlikeProducts: state => state.youlikeProducts,
    youlikeskip:state => state.youlikeskip,
    headerImage: state => state.headerImage,
    promotionNtSkip: state => state.promotionNtSkip,
    promotionNtLoaded: state => state.promotionNtLoaded,
    promotionNtFinished: state => state.promotionNtFinished,
    orderNtSkip: state => state.orderNtSkip,
    orderNtLoaded: state => state.orderNtLoaded,
    orderNtFinished: state => state.orderNtFinished,
    otherNtSkip: state => state.otherNtSkip,
    otherNtLoaded: state => state.otherNtLoaded,
    otherNtFinished: state => state.otherNtFinished,
    notificationCount: state => state.notificationCount,
    orderCountProcessing: state => state.orderCountProcessing,
    orderCountShipped: state => state.orderCountShipped,
    orderCountReceipt: state => state.orderCountReceipt,
    orderCountCanceled: state => state.orderCountCanceled,
    orderCountUnpaid: state => state.orderCountUnpaid,
    message: state => state.message,
    creditcards: state =>state.creditcards,
    mercadocreditcards: state => state.mercadocreditcards,
    trackOrder: state => state.trackOrder,
    trackOrderSkip: state => state.trackOrderSkip,

    expiredCoupons:state => state.expiredCoupons,
    expiredCouponsSkip:state => state.expiredCouponsSkip
}

export default getters;