import {
  request
} from './axios';

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid,
    }
  })
}
// 获取推荐数据
export function getRecommend() {
  return request({
    url: '/recommend'
  })
}
// 商品信息类
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
    this.nowPrice = itemInfo.highNowPrice
  }
}
// 店家信息类
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}
// 商品参数信息类
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.disclaimer = rule.disclaimer
    this.sizes = rule.tables;
  }
}
