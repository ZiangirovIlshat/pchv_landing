const cart = {
    namespaced: true,

    state: {
        items: []
    },

    getters: {
        cartItems: (state) => state.items,
        totalItems: (state) => state.items.reduce((total, item) => total + item.count, 0),
        totalPrice: (state) => state.items.reduce((total, item) => total + item.price * item.count, 0),
        isProductInCart: (state) => (productCode) => {
            return state.items.some(item => item.code === productCode);
        },
    },
  
    mutations: {
        ADD_TO_CART(state, product) {
            const existingProduct = state.items.find(item => item.code === product.code);
            if (existingProduct) {
                existingProduct.count += product.count;
            } else {
                state.items.push({ ...product });
            }
        },

        REMOVE_FROM_CART(state, productCode) {
            state.items = state.items.filter(item => item.code !== productCode);
        },

        UPDATE_ITEM_COUNT(state, { productCode, count }) {
            const item = state.items.find(cartItem => cartItem.code === productCode);

            if (item) {
                item.count = count;
            }
        },

        CLEAR_CART(state) {
            state.items = [];
        }
    },

    actions: {
        addToCart({ commit }, product) {
            commit("ADD_TO_CART", product);
        },

        removeFromCart({ commit }, productCode) {
            commit("REMOVE_FROM_CART", productCode);
        },

        updateItemCount({ commit }, { productCode, count }) {
            commit("UPDATE_ITEM_COUNT", { productCode, count });
        },

        clearCart({ commit }) {
            commit("CLEAR_CART");
        }
    }
}

export default cart;