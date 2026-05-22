<template>
  <div class="orders-container">
    <div class="header-section">
      <h1>📜 Order History</h1>
      <button class="back-btn" @click="goHome">🏠 Back to Menu</button>
    </div>

    <div v-if="orders.length === 0" class="empty-orders">
      <p>You haven't placed any orders yet.</p>
    </div>

    <div v-else v-for="order in reversedOrders" :key="order.id" class="order-card">
      <div class="order-header">
        <h3>Order #{{ order.id }}</h3>
        <span class="order-date">📅 {{ order.date }}</span>
      </div>

      <ul class="items-list">
        <li v-for="item in order.items" :key="item.id">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-qty">× {{ item.qty }}</span>
        </li>
      </ul>

      <div class="order-footer">
        <strong>Total Amount: <span class="price">${{ order.total.toFixed(2) }}</span></strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const orders = ref(JSON.parse(localStorage.getItem("orders") || "[]"))

const reversedOrders = computed(() => {
  return [...orders.value].reverse()
})

function goHome() {
  router.push("/dashboard")
}
</script>

<style scoped>
.orders-container { max-width: 700px; margin: 30px auto; padding: 20px; font-family: Arial, sans-serif; }
.header-section { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px; margin-bottom: 25px; }
.back-btn { background: #111827; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.empty-orders { text-align: center; padding: 40px; color: #6b7280; background: white; border-radius: 10px; }
.order-card { background: white; margin-bottom: 20px; padding: 20px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid #22c55e; }
.order-header { display: flex; justify-content: space-between; padding-bottom: 10px; border-bottom: 1px dashed #e5e7eb; }
.items-list { list-style: none; padding: 0; margin: 15px 0; }
.items-list li { display: flex; justify-content: space-between; padding: 6px 0; }
.price { color: #22c55e; }
</style>