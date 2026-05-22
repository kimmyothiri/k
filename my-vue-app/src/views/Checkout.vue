<template>
  <div class="checkout-page">

    <!-- HEADER -->
    <header class="header">
      <h1>💳 Checkout</h1>
      <p>Review your order before payment</p>
    </header>

    <!-- CONTENT -->
    <div class="container">

      <!-- LEFT: CART ITEMS -->
      <div class="cart-box">

        <h2>🛒 Your Items</h2>

        <div v-if="cart.length === 0" class="empty">
          Your cart is empty 😢
        </div>

        <div v-for="item in cart" :key="item.id" class="item">
          <div>
            <h3>{{ item.name }}</h3>
            <p>$ {{ item.price }} × {{ item.qty || 1 }}</p>
          </div>

          <div class="price">
            ${{ (item.price * (item.qty || 1)).toFixed(2) }}
          </div>
        </div>

      </div>

      <!-- RIGHT: SUMMARY -->
      <div class="summary">

        <h2>📦 Order Summary</h2>

        <div class="row">
          <span>Subtotal</span>
          <span>${{ total.toFixed(2) }}</span>
        </div>

        <div class="row">
          <span>Delivery</span>
          <span>$2.00</span>
        </div>

        <div class="row total">
          <span>Total</span>
          <span>${{ (total + 2).toFixed(2) }}</span>
        </div>

        <button class="pay-btn" @click="placeOrder">
          Place Order 🚀
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const cart = ref(JSON.parse(localStorage.getItem("cart") || "[]"))

const total = computed(() =>
  cart.value.reduce((sum, item) => {
    return sum + item.price * (item.qty || 1)
  }, 0)
)

function placeOrder() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]")

  orders.push({
    id: Date.now(),
    items: cart.value,
    total: total.value + 2,
    date: new Date().toLocaleString()
  })

  localStorage.setItem("orders", JSON.stringify(orders))
  localStorage.removeItem("cart")

  router.push("/orders")
}
</script>

<style scoped>
.checkout-page {
  font-family: Arial;
  background: #f3f4f6;
  min-height: 100vh;
  padding: 20px;
}

/* HEADER */
.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  margin-bottom: 5px;
}

/* LAYOUT */
.container {
  display: flex;
  gap: 20px;
}

/* CART */
.cart-box {
  flex: 2;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.price {
  font-weight: bold;
}

/* SUMMARY */
.summary {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  height: fit-content;
  box-shadow: 0 5px 15px rgba(0,0,0,0.08);
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.total {
  font-weight: bold;
  font-size: 18px;
}

.pay-btn {
  width: 100%;
  margin-top: 20px;
  padding: 12px;
  background: linear-gradient(90deg, #ff6b6b, #feca57);
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
}

.pay-btn:hover {
  opacity: 0.9;
}

.empty {
  color: #888;
  padding: 20px;
}
</style>