<script setup lang="ts">
import { ref, computed, onUnmounted, watch } from 'vue'
import { Secret, Token } from '@crmackey/fernet'

const message = ref('')
const encrypted = ref('')
const encryptedTime = ref<Date>()
const decrypted = ref('')

const secret = new Secret("cw_0x689RpI-jtRR7oE8h_eQsKImvJapLeSbXpwF4e4=");

const ttl = ref<number>(0)
const error = ref<string>()

const currentTime = ref(new Date())

const interval = setInterval(()=> {
  currentTime.value = new Date()
}, 1000)

const ttlExpires = computed(()=> ttl.value && encryptedTime.value ? new Date(encryptedTime.value.getTime() + (ttl.value * 1000)): undefined)
const isExpired = computed(()=> ttlExpires.value ? currentTime.value > ttlExpires.value: false)

const encrypt = ()=> {
  const token = new Token({secret});
  encrypted.value = message.value ? token.encode(message.value): ''
  encryptedTime.value = new Date()
}

const decrypt = ()=> {
  if (!encrypted.value) return ''
  const decryptToken = new Token({ secret, ttl: ttl.value ?? 0 })
  
  try {
    decrypted.value = decryptToken.decode(encrypted.value)
    error.value = undefined
    return decrypted.value
  } catch(err: any){
    error.value = err.message as any
  }
  
}

watch(ttl, (curTTL)=> {
  if (curTTL){
    decrypted.value = ''
  }
  error.value = undefined
})

watch(message, (msg)=> {
  encrypted.value = ''
  encryptedTime.value = undefined
  decrypted.value = ''
  error.value = undefined
})

watch(isExpired, (expired)=> {
  if (expired){
    decrypted.value = ''
  }
})


const reset = ()=> {
  message.value = ''
  ttl.value = 0
  error.value = undefined
  encryptedTime.value = undefined
  encrypted.value = ''
}


onUnmounted(()=> clearInterval(interval))

</script>

<template>

  <div class="card">
    <label for="message">Message to encrypt:</label>
    <br/>
    <input v-model="message" id="message" @keyup.enter="encrypt" />
    <br />

    <div class="d-flex">

      <button @click="encrypt">Encrypt Message</button>
      <button @click="reset">Reset</button>
    </div>

    <div>
      <label for="encrypted">Encrypted:</label>
      <textarea v-model="encrypted" id="encrypted" readonly></textarea>
    </div>

    <div class="d-flex">

      <button @click="decrypt">Decrypt Message</button>
      <div title="time to live in seconds, message cannot be decrypted after TTL expires">
        <span style="margin-right: 0.5rem;">TTL (seconds):</span>
        <input v-model.number="ttl" type="number" style="width: 2.5rem;">
      </div>
    </div>

    <div style="margin: 1rem 0 1rem 0;" v-if="encryptedTime">
      <i>encrypted time: {{ encryptedTime?.toLocaleString() }}</i>
      <div v-if="ttl">
        <div><i>current time: {{ currentTime.toLocaleString() }}</i></div>
        <div :class="isExpired ? 'expired': 'expires'" v-if="ttlExpires">
          <i>message {{ isExpired ? 'expired': 'expires' }} at: {{ ttlExpires.toLocaleString() }}</i>
        </div>
      </div>
    </div>

    <div>
      <label for="decrypted">Decrypted:</label>
      <textarea v-model="decrypted" id="decrypted" readonly></textarea>
    </div>

    <div class="error" v-if="error">Error - {{ error }}</div>
  </div>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
