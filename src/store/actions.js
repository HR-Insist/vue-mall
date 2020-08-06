export default {
  addProductToCart({
    state,
    commit
  }, payload) {
    // state.cartList.push(payload)
    // 判断是否已经添加过了
    const index = state.cartList.findIndex(item => item.iid === payload.iid)
    if (index === -1) {
      commit("pushProduct", payload)
    } else {
      commit('addProductCount', index)
    }
  }
}
