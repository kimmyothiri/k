<template>
  <div class="app">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <h2 class="logo">🍔 Foodie</h2>

      <nav>
        <a href="#" class="active">🏠 Home</a>
        <a href="#">🍕 Foods</a>
        <a href="#">🛒 Orders</a>
        <a href="#">❤️ Favorites</a>
         <button class="checkout-btn" @click="goToCheckout">
  Go to Checkout 💳
</button>
        <a href="#">⚙️ Settings</a>
      </nav>

      <button class="logout" @click="logout">
        Logout
      </button>
     
    </aside>

    <!-- MAIN CONTENT -->
    <main class="main">

      <!-- TOP BAR -->
      <header class="topbar">
        <input type="text" placeholder="Search food..." />
        <div class="user">
          👤 {{ user }}
        </div>
      </header>

      <!-- HERO -->
      <section class="hero">
        <h1>Delicious food delivered fast 🚀</h1>
        <p>Order your favorite meals anytime</p>
      </section>

      <!-- DASHBOARD BODY: Side-by-Side Content -->
      <div class="dashboard-body">
        <!-- FOOD CARDS -->
        <section class="grid">
          <div class="card" v-for="food in foods" :key="food.id">
            <h3>{{ food.name }}</h3>
            <p>${{ food.price }}</p>

            <button @click="addToCart(food)">
              Add to Cart 🛒
            </button>
          </div>
        </section>

        <!-- CART BOX -->
        <section class="cart-box">
          <h3>🛒 Cart ({{ cartCount }})</h3>
          <p v-if="cart.length === 0" class="empty-cart">Your cart is empty</p>
          <ul v-else>
            <li v-for="(item, index) in cart" :key="index">
              {{ item.name }} - ${{ item.price }}
            </li>
          </ul>
        </section>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue" // 👈 Fixed: Added watch here!
import { useRouter } from "vue-router"

// Router setup (Make sure vue-router is installed in your project!)
const router = useRouter()
const user = ref(localStorage.getItem("user") || "Guest")

function logout() {
  localStorage.removeItem("user")
  // Safe fallback if router isn't fully configured yet
  if (router) {
    router.push("/login")
  } 
  
  
  else if (router){
    router.push("/checkout")
  }
}

const foods = [
  { id: 1, name: "🍔 Burger", price: 5.99 },
  { id: 2, name: "🍕 Pizza", price: 8.99 },
  { id: 3, name: "🍜 Noodles", price: 4.99 },
  { id: 4, name: "🥗 Salad", price: 3.99 }
]

// Bonus Tip: Initialize cart from localStorage so items stay when refreshing!
const cart = ref(JSON.竞争力 || JSON.parse(localStorage.getItem("cart")) || [])

function addToCart(food) {
  cart.value.push(food)
}

const cartCount = computed(() => cart.value.length)

function goToCheckout() {
  if (router) {
    router.push("/checkout")
  } else {
    window.location.href = "/checkout"
  }
}

watch(cart, () => {
  localStorage.setItem("cart", JSON.stringify(cart.value))
}, { deep: true })
</script>

<style scoped>
/* Keeping all your original styles, plus adding layout optimization */
.app {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 220px;
  background: #111827;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.logo {
  margin-bottom: 30px;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar a {
  color: #ccc;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;
}

.sidebar a.active,
.sidebar a:hover {
  background: #374151;
  color: white;
}

.logout {
  margin-top: auto;
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
}

.main {
  flex: 1;
  padding: 20px;
  background: #f3f4f6;
  overflow-y: auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.topbar input {
  width: 60%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.hero {
  background: linear-gradient(90deg, #ff6b6b, #feca57);
  padding: 20px;
  border-radius: 10px;
  color: white;
  margin-bottom: 20px;
}

/* Flex layout to align menu and cart beautifully */
.dashboard-body {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.grid {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.card button {
  margin-top: 10px;
  padding: 8px 15px;
  border: none;
  background: #22c55e;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
}

.card button:hover {
  background: #16a34a;
}

.cart-box {
  flex: 1;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.cart-box ul {
  padding-left: 20px;
  margin-top: 10px;
}

.cart-box li {
  margin-bottom: 8px;
}

.empty-cart {
  color: #888;
  font-style: italic;
  margin-top: 10px;
}
</style>