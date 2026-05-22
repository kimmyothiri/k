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
        <a href="#">⚙️ Settings</a>
      </nav>

      <button class="logout" @click="logout">
        Logout
      </button>
    </aside>

    <!-- MAIN -->
    <main class="main">

      <!-- TOP BAR -->
      <header class="topbar">
        <input
          type="text"
          placeholder="Search food..."
        />

        <div class="user">
          👤 {{ user }}
        </div>
      </header>

      <!-- HERO -->
      <section class="hero">
        <h1>Delicious food delivered fast 🚀</h1>
        <p>Order your favorite meals anytime</p>
      </section>

      <!-- BODY -->
      <div class="dashboard-body">

        <!-- FOODS -->
        <section class="grid">
          <div
            class="card"
            v-for="food in foods"
            :key="food.id"
          >
            <h3>{{ food.name }}</h3>
            <p>${{ food.price }}</p>

            <button @click="addToCart(food)">
              Add to Cart 🛒
            </button>
          </div>
        </section>

        <!-- CART -->
        <section class="cart-box">

          <h3>🛒 Cart ({{ cartCount }})</h3>

          <p
            v-if="cart.length === 0"
            class="empty-cart"
          >
            Your cart is empty
          </p>

          <ul v-else>
            <li
              v-for="(item,index) in cart"
              :key="index"
            >
              {{ item.name }}
              <span>${{ item.price }}</span>
            </li>
          </ul>

          <button
            v-if="cart.length > 0"
            class="checkout-btn"
            @click="goToCheckout"
          >
            Proceed to Checkout 💳
          </button>

        </section>

      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const user = ref(
  localStorage.getItem("user") || "Guest"
)

function logout() {
  localStorage.removeItem("user")
  router.push("/login")
}

const foods = [
  {
    id: 1,
    name: "🍔 Burger",
    price: 5.99
  },
  {
    id: 2,
    name: "🍕 Pizza",
    price: 8.99
  },
  {
    id: 3,
    name: "🍜 Noodles",
    price: 4.99
  },
  {
    id: 4,
    name: "🥗 Salad",
    price: 3.99
  }
]

const cart = ref(
  JSON.parse(
    localStorage.getItem("cart") || "[]"
  )
)

function addToCart(food) {
  cart.value.push(food)
}

const cartCount = computed(() => {
  return cart.value.length
})

function goToCheckout() {
  router.push("/checkout")
}

watch(
  cart,
  () => {
    localStorage.setItem(
      "cart",
      JSON.stringify(cart.value)
    )
  },
  { deep: true }
)
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.app {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

/* SIDEBAR */

.sidebar {
  width: 230px;
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
  gap: 12px;
}

.sidebar a {
  text-decoration: none;
  color: #d1d5db;
  padding: 10px;
  border-radius: 8px;
}

.sidebar a:hover,
.sidebar .active {
  background: #374151;
  color: white;
}

.logout {
  margin-top: auto;
  padding: 12px;

  border: none;
  border-radius: 8px;

  background: #ef4444;
  color: white;

  cursor: pointer;
}

/* MAIN */

.main {
  flex: 1;
  background: #f3f4f6;
  padding: 20px;
}

/* TOPBAR */

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

.user {
  font-weight: bold;
}

/* HERO */

.hero {
  padding: 25px;
  border-radius: 12px;

  color: white;

  background: linear-gradient(
    90deg,
    #ff6b6b,
    #feca57
  );

  margin-bottom: 20px;
}

/* BODY */

.dashboard-body {
  display: flex;
  gap: 20px;
}

/* FOOD GRID */

.grid {
  flex: 2;

  display: grid;
  grid-template-columns:
    repeat(2, 1fr);

  gap: 15px;
}

.card {
  background: white;
  padding: 20px;

  border-radius: 12px;

  text-align: center;

  box-shadow:
    0 4px 12px rgba(0,0,0,.08);
}

.card button {
  margin-top: 10px;

  padding: 10px 15px;

  border: none;
  border-radius: 8px;

  background: #22c55e;
  color: white;

  cursor: pointer;
}

.card button:hover {
  background: #16a34a;
}

/* CART */

.cart-box {
  flex: 1;

  background: white;
  padding: 20px;

  border-radius: 12px;

  box-shadow:
    0 4px 12px rgba(0,0,0,.08);
}

.cart-box ul {
  list-style: none;
  padding: 0;

  margin-top: 15px;
}

.cart-box li {
  display: flex;
  justify-content: space-between;

  padding: 10px 0;

  border-bottom: 1px solid #eee;
}

.empty-cart {
  color: gray;
  margin-top: 10px;
}

/* CHECKOUT BUTTON */

.checkout-btn {
  width: 100%;

  margin-top: 20px;
  padding: 14px;

  border: none;
  border-radius: 10px;

  color: white;
  font-weight: bold;
  font-size: 15px;

  cursor: pointer;

  background: linear-gradient(
    135deg,
    #ff6b6b,
    #ff9f43
  );

  transition: 0.3s;
}

.checkout-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px
    rgba(255,107,107,.3);
}
</style>