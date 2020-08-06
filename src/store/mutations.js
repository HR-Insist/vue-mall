export default mutations = {
  addProductCount(state, payload) {
    state.cartList[payload].count++
  },
  pushProduct(state, payload) {
    payload.count = 1
    state.cartList.push(payload)
  }
}
