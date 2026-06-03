<template>
  <div class="register-container">
    <div class="register-card">
      <h2>Join 🍔 Foodie</h2>
      <p>Create an account to start ordering</p>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Full Name</label>
          <input v-model="name" type="text" placeholder="Enter your name" required />
        </div>

        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Create a password" required />
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <input v-model="confirmPassword" type="password" placeholder="Repeat password" required />
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <button type="submit" class="register-btn">Sign Up 🚀</button>
      </form>

      <div class="footer">
        Already have an account? 
        <router-link to="/login">Login here</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match!"
    return
  }

  // Simulate saving a user to a database
  const newUser = {
    name: name.value,
    email: email.value,
    password: password.value // In a real app, never store plain text passwords!
  }

  // Store user in localStorage so Login page can find it
  localStorage.setItem("registeredUser", JSON.stringify(newUser))
  
  alert("Registration successful! Please login.")
  router.push('/login')
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f3f4f6;
  font-family: Arial, sans-serif;
}

.register-card {
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h2 { margin-bottom: 10px; color: #111827; }
p { color: #6b7280; margin-bottom: 25px; }

.form-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 5px;
  color: #374151;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-sizing: border-box;
}

.register-btn {
  width: 100%;
  padding: 12px;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.error {
  color: #ef4444;
  font-size: 0.85rem;
  margin-bottom: 10px;
}

.footer {
  margin-top: 20px;
  font-size: 0.9rem;
}

.footer a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: bold;
}
</style>