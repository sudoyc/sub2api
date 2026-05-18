<template>
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    :aria-label="label"
  >
    <defs>
      <linearGradient id="arqel-logo-mark" x1="12" y1="8" x2="52" y2="56" gradientUnits="userSpaceOnUse">
        <stop stop-color="#8B8DF8" />
        <stop offset="0.52" stop-color="#6467F2" />
        <stop offset="1" stop-color="#4F52D7" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#arqel-logo-mark)" />
    <path
      d="M31.99 14.5 47.4 49.5h-8.2l-2.46-6.19H26.9l2.45-6.63h4.84l-4.53-11.44-9.47 24.26H12.6L27.98 14.5h4.01Z"
      fill="#fff"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: 'Arqel'
})
</script>
