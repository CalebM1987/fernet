<script setup lang="ts">
import { ref, computed } from 'vue'
import { Secret, Token } from '@crmackey/fernet'

const message = ref('')
const encrypted = ref('')

const secret = new Secret("cw_0x689RpI-jtRR7oE8h_eQsKImvJapLeSbXpwF4e4=");
const token = new Token({secret});

const encrypt = ()=> encrypted.value = message.value ? token.encode(message.value): ''

const reset = ()=> {
  message.value = ''
  encrypted.value = ''
}


</script>

<template>

  <div class="card">
    <label for="message">Message to encrypt:</label>
    <br/>
    <input v-model="message" id="message" @keyup.enter="encrypt" />
    <br />

    <div style="display: flex; justify-content: space-between;">

      <button @click="encrypt">Encrypt Message</button>
      <button @click="reset">Reset</button>
    </div>

    <div>
      <label for="encrypted">Encrypted:</label>
      <textarea v-model="encrypted" id="encrypted" readonly></textarea>
    </div>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
