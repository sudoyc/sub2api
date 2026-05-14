<template>
  <div class="auth-shell relative flex min-h-screen items-center justify-center overflow-hidden p-4">
    <!-- Background -->
    <div class="auth-bg absolute inset-0"></div>

    <!-- Decorative Elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- Gradient Orbs -->
      <div
        class="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-primary-400/20 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-500/15 blur-3xl"
      ></div>
      <div
        class="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-300/10 blur-3xl"
      ></div>

      <!-- Grid Pattern -->
      <div
        class="auth-grid absolute inset-0 bg-[size:64px_64px]"
      ></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="mb-8 text-center">
        <!-- Custom Logo or Default Logo -->
        <template v-if="settingsLoaded">
          <div v-if="settingsLoaded" class="auth-brand-mark mb-4 inline-flex h-16 w-16">
            <img v-if="siteLogo" :src="siteLogo" alt="Logo" class="h-full w-full object-contain" />
            <span v-else class="arqel-default-mark text-3xl" aria-hidden="true">A</span>
          </div>
          <h1 class="text-gradient mb-2 text-3xl font-bold">
            {{ siteName }}
          </h1>
          <p class="text-sm text-[var(--arqel-muted)]">
            {{ siteSubtitle }}
          </p>
        </template>
      </div>

      <!-- Card Container -->
      <div class="card-glass rounded-2xl p-8 shadow-glass">
        <slot />
      </div>

      <!-- Footer Links -->
      <div class="mt-6 text-center text-sm">
        <slot name="footer" />
      </div>

      <!-- Copyright -->
      <div class="mt-8 text-center text-xs text-[var(--arqel-soft)]">
        &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'Arqel')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'Subscription to API Conversion Platform')
const settingsLoaded = computed(() => appStore.publicSettingsLoaded)

const currentYear = computed(() => new Date().getFullYear())

onMounted(() => {
  appStore.fetchPublicSettings()
})
</script>

<style scoped>
.auth-shell {
  background: var(--arqel-bg);
  color: var(--arqel-text);
}

.auth-bg {
  background:
    radial-gradient(circle at 50% -16%, rgba(100, 103, 242, 0.14), transparent 30rem),
    var(--arqel-bg);
}

.auth-grid {
  background-image:
    linear-gradient(rgba(100, 103, 242, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 103, 242, 0.035) 1px, transparent 1px);
}

.auth-brand-mark {
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--arqel-line-strong);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--arqel-panel) 86%, var(--arqel-accent-softer));
  box-shadow: var(--arqel-shadow);
}

.text-gradient {
  color: var(--arqel-text);
}
</style>
