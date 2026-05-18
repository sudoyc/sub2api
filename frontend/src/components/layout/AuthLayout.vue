<template>
  <div class="auth-shell flex min-h-screen items-center justify-center overflow-hidden p-4">

    <!-- Content Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="mb-8 text-center">
        <!-- Custom Logo or Default Logo -->
        <template v-if="settingsLoaded">
          <div v-if="settingsLoaded" class="auth-brand-mark mb-4 inline-flex h-16 w-16">
            <img v-if="siteLogo" :src="siteLogo" alt="Logo" class="h-full w-full object-contain" />
            <ArqelLogo v-else class="h-full w-full" aria-hidden="true" />
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
      <div class="card-glass auth-card rounded-2xl p-8">
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
import ArqelLogo from '@/components/common/ArqelLogo.vue'
import { sanitizeUrl } from '@/utils/url'
import { normalizePublicSiteSubtitle } from '@/utils/publicBrand'

const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'Arqel')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => normalizePublicSiteSubtitle(appStore.cachedPublicSettings?.site_subtitle))
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

.auth-brand-mark {
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--arqel-line-strong);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--arqel-panel) 86%, var(--arqel-accent-softer));
  box-shadow: none;
}

.auth-card {
  box-shadow: none;
  backdrop-filter: none;
}

.text-gradient {
  color: var(--arqel-text);
}
</style>
