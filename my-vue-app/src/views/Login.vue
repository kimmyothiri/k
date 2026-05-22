<template>
  <div class="container">
    <div class="login-card">
      <h2>Login</h2>

      <form @submit.prevent="login">
        <div class="input-group">
          <label>Username</label>
          <input
            type="text"
            v-model="username"
            placeholder="Enter username"
          />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input
            type="password"
            v-model="password"
            placeholder="Enter password"
          />
        </div>

        <div class="forgot">
          <a href="#">Forgot Password?</a>
        </div>

        <button class="login-btn">
          Login
        </button>
      </form>

      <p class="social-text">or login with</p>

      <div class="social-icons">
        <div class="icon facebook">f</div>
        <div class="icon google">G</div>
        <div class="icon twitter">X</div>
      </div>

      <p class="register">
        Don't have an account?
        <a href="#">Register</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router"

const username = ref('')
const password = ref('')
const router = useRouter()

function login() {
  localStorage.setItem("user", username.value)
  router.push("/dashboard")
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    135deg,
    #6de3ff,
    #7d7cff,
    #ff3fd7
  );
}

.login-card {
  width: 340px;
  background: white;
  padding: 40px 30px;
  border-radius: 10px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}

.login-card h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.input-group {
  margin-bottom: 18px;
}

.input-group label {
  display: block;
  font-size: 13px;
  margin-bottom: 6px;
  color: #666;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 2px solid #ddd;
  outline: none;
}

.input-group input:focus {
  border-color: #8a5cff;
}

.forgot {
  text-align: right;
  margin-bottom: 20px;
}

.forgot a {
  font-size: 12px;
  color: #888;
  text-decoration: none;
}

.login-btn {
  width: 100%;
  padding: 12px;
  border: none;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;

  background: linear-gradient(
    90deg,
    #53d7ff,
    #ff4fd8
  );
}

.social-text {
  text-align: center;
  margin: 25px 0 15px;
  color: #777;
  font-size: 13px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-weight: bold;
  cursor: pointer;
}

.facebook {
  background: #1877f2;
}

.google {
  background: #db4437;
}

.twitter {
  background: #000;
}

.register {
  margin-top: 25px;
  text-align: center;
  font-size: 13px;
  color: #777;
}

.register a {
  color: #8a5cff;
  text-decoration: none;
}
</style>