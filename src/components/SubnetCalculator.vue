<template>
  <div class="calculator">
    <h2>Калькулятор подсетей</h2>

    <div class="input-group">
      <label>IP-адрес:</label>
      <input
        v-model="ipInput"
        type="text"
        placeholder="192.168.1.150"
        @keyup.enter="calculate"
        :class="{ invalid: !isIpValid(ipInput) && ipInput }"
      />
    </div>

    <div class="input-group">
      <label>Маска подсети:</label>
      <select v-model="selectedMask">
        <option v-for="opt in subnetOptions" :key="opt.cidr" :value="opt.mask">
          {{ opt.label }}
        </option>
      </select>
    </div>

    <button type="button" :disabled="!isIpValid(ipInput)" @click="calculate" class="btn-calculate">Рассчитать</button>
    <div v-if="result" class="result">
      <p><strong>IP:</strong> {{ ipInput }}</p>
      <p><strong>Маска:</strong> {{ selectedMask }}</p>
      <p><strong>Адрес сети:</strong> {{ result?.network }}</p>
      <p><strong>Доступных адресов:</strong> {{ result?.hosts }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { subnetOptions } from '@/utils/subnetMasks.js';
import { isIpValid, getNetworkAddress, getAddressesCount } from '@/utils/ipUtils.js';

const ipInput = ref('');
const selectedMask = ref(subnetOptions[24].mask); // по умолчанию /24
const result = ref<{ network: string; hosts: number } | null>(null);
const calculate = () => {
  if (!isIpValid(ipInput.value)) return;

  const network = getNetworkAddress(ipInput.value, selectedMask.value);
  const hosts = getAddressesCount(selectedMask.value);

  result.value = { network, hosts };
};
</script>

<style scoped>
.calculator {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.input-group input.invalid {
  border-color: red;
}

.btn-calculate {
  width: 100%;
  padding: 0.75rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-calculate:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.result {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 4px;
}
</style>
