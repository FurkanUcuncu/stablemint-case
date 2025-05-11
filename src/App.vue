<template>
  <PaymentWidget @close="() => console.log('close with custom emit')" :apiKey="apiKey" />
</template>

<script setup lang="ts">
import PaymentWidget from "./components/templates/PaymentWidget.ce.vue";

const apiKey = import.meta.env.VITE_FIXER_API_KEY;
</script>
