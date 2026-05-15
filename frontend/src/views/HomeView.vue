<template>
  <!-- Custom Home Content: Full Page Mode -->
  <div v-if="homeContent" class="min-h-screen">
    <!-- iframe mode -->
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <!-- HTML mode - SECURITY: homeContent is admin-only setting, XSS risk is acceptable -->
    <div v-else v-html="homeContent"></div>
  </div>

  <!-- Default Home Page -->
  <div v-else class="home-shell" :class="{ 'home-shell-dark': isDark }">
    <header class="home-header">
      <nav class="home-nav" aria-label="Primary navigation">
        <router-link to="/" class="home-brand" aria-label="Arqel home">
          <span class="home-brand-mark">A</span>
          <span class="home-brand-name">{{ brandName }}</span>
        </router-link>

        <div class="home-nav-links">
          <a :href="tutorialUrl" target="_blank" rel="noopener noreferrer">
            {{ t('home.arqel.tutorial') }}
          </a>
          <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer">
            {{ t('home.docs') }}
          </a>
        </div>

        <div class="home-actions">
          <LocaleSwitcher />

          <button
            type="button"
            class="home-icon-button"
            @click="toggleTheme"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>

          <router-link
            :to="isAuthenticated ? dashboardPath : '/login'"
            class="home-login-button"
          >
            {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="home-main">
      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero-copy">
          <p class="home-kicker home-hero-element home-d-1">{{ t('home.arqel.eyebrow') }}</p>
          <h1 id="home-title" class="home-title home-hero-element home-d-2">{{ brandName }}</h1>
          <p class="home-subtitle home-hero-element home-d-3">{{ t('home.arqel.subtitle') }}</p>
          <p class="home-description home-hero-element home-d-4">{{ t('home.arqel.description') }}</p>

          <div class="home-hero-actions">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/login'"
              class="home-button home-button-primary home-hero-element home-d-4"
            >
              {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
              <Icon name="arrowRight" size="md" :stroke-width="2" />
            </router-link>
            <a
              :href="tutorialUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="home-button home-button-secondary home-hero-element home-d-5"
            >
              {{ t('home.arqel.tutorial') }}
            </a>
          </div>
        </div>

        <aside class="home-hero-visual" aria-hidden="true">
          <div class="home-terminal-card home-hero-element home-d-3">
            <div class="home-terminal-header">
              <div class="home-terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span class="home-terminal-title">quick start</span>
            </div>
            <div class="home-terminal-body">
              <div class="home-setup-step">
                <span class="home-setup-index">1</span>
                <div>
                  <strong>{{ t('home.arqel.quick.apiUrl.title') }}</strong>
                  <span>{{ t('home.arqel.quick.apiUrl.desc') }}</span>
                </div>
              </div>
              <div class="home-setup-step">
                <span class="home-setup-index">2</span>
                <div>
                  <strong>{{ t('home.arqel.quick.modelKey.title') }}</strong>
                  <span>{{ t('home.arqel.quick.modelKey.desc') }}</span>
                </div>
              </div>
              <div class="home-setup-step">
                <span class="home-setup-index">3</span>
                <div>
                  <strong>{{ t('home.arqel.quick.modelName.title') }}</strong>
                  <span>{{ t('home.arqel.quick.modelName.desc') }}</span>
                </div>
              </div>
              <div class="home-terminal-line terminal-muted">{{ t('home.arqel.quick.note') }}</div>
              <div class="home-terminal-line">
                <span class="terminal-ok">ready</span>
                <span class="terminal-json">{{ t('home.arqel.quick.ready') }}</span><span class="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section class="home-metrics home-reveal-target" aria-label="Arqel highlights">
        <div class="home-metric">
          <div class="home-metric-icon" aria-hidden="true">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <strong>1</strong>
          <span>{{ t('home.arqel.metrics.apiUrl') }}</span>
        </div>
        <div class="home-metric">
          <div class="home-metric-icon" aria-hidden="true">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>
          <strong>2</strong>
          <span>{{ t('home.arqel.metrics.configItems') }}</span>
        </div>
        <div class="home-metric">
          <div class="home-metric-icon" aria-hidden="true">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </div>
          <strong>?</strong>
          <span>{{ t('home.arqel.metrics.modelChoice') }}</span>
        </div>
      </section>

      <section class="home-story home-reveal-target" aria-label="Arqel beginner guide">
        <article class="home-story-row home-story-row-large home-reveal-target">
          <p class="home-story-index">01</p>
          <div class="home-reveal-text">
            <h2 class="home-reveal-title">{{ t('home.arqel.guide.prepare.title') }}</h2>
            <p class="home-reveal-body">{{ t('home.arqel.guide.prepare.desc') }}</p>
            <div class="home-responsibility home-responsibility-three">
              <span>{{ t('home.arqel.guide.prepare.points.apiUrl') }}</span>
              <span>{{ t('home.arqel.guide.prepare.points.modelKey') }}</span>
              <span>{{ t('home.arqel.guide.prepare.points.modelName') }}</span>
            </div>
          </div>
        </article>

        <article class="home-story-row home-reveal-target">
          <p class="home-story-index">02</p>
          <div class="home-reveal-text">
            <h2 class="home-reveal-title">{{ t('home.arqel.guide.models.title') }}</h2>
            <p class="home-reveal-body">{{ t('home.arqel.guide.models.desc') }}</p>
            <div class="home-model-strip" aria-label="Supported models">
              <span class="home-model-chip">
                <span class="home-model-icon home-model-icon-claude" aria-hidden="true"><svg role="img" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" /></svg></span>
                Claude
              </span>
              <span class="home-model-chip">
                <span class="home-model-icon home-model-icon-gpt" aria-hidden="true"><svg role="img" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" /></svg></span>
                GPT
              </span>
              <span class="home-model-chip">
                <span class="home-model-icon home-model-icon-gemini" aria-hidden="true"><svg role="img" viewBox="0 0 24 24" fill="currentColor" focusable="false"><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" /></svg></span>
                Gemini
              </span>
            </div>
          </div>
        </article>

        <article class="home-story-row home-reveal-target">
          <p class="home-story-index">03</p>
          <div class="home-reveal-text">
            <h2 class="home-reveal-title">{{ t('home.arqel.guide.cost.title') }}</h2>
            <p class="home-reveal-body">{{ t('home.arqel.guide.cost.desc') }}</p>
          </div>
        </article>

        <article class="home-story-row home-reveal-target">
          <p class="home-story-index">04</p>
          <div class="home-reveal-text">
            <h2 class="home-reveal-title">{{ t('home.arqel.guide.error.title') }}</h2>
            <p class="home-reveal-body">{{ t('home.arqel.guide.error.desc') }}</p>
            <div class="home-responsibility">
              <span>{{ t('home.arqel.guide.error.points.key') }}</span>
              <span>{{ t('home.arqel.guide.error.points.status') }}</span>
            </div>
          </div>
        </article>

        <article class="home-story-row home-reveal-target">
          <p class="home-story-index">05</p>
          <div class="home-reveal-text">
            <h2 class="home-reveal-title">{{ t('home.arqel.guide.official.title') }}</h2>
            <p class="home-reveal-body">{{ t('home.arqel.guide.official.desc') }}</p>
          </div>
        </article>
      </section>

      <section class="home-resource-flow home-reveal-target" aria-label="Arqel resources">
        <div class="home-resource-lead">
          <p class="home-kicker">{{ t('home.arqel.resources.beginner.label') }}</p>
          <h2>{{ t('home.arqel.resources.beginner.title') }}</h2>
          <p>{{ t('home.arqel.resources.beginner.desc') }}</p>
          <router-link :to="isAuthenticated ? '/keys' : '/login'" class="home-button home-button-primary home-resource-action">
            {{ isAuthenticated ? t('home.arqel.resources.beginner.authedAction') : t('home.arqel.resources.beginner.action') }}
            <Icon name="arrowRight" size="sm" :stroke-width="2" />
          </router-link>
        </div>

        <div class="home-resource-links">
          <article>
            <small>{{ t('home.arqel.resources.docs.label') }}</small>
            <h3>{{ t('home.arqel.resources.docs.title') }}</h3>
            <p>{{ t('home.arqel.resources.docs.desc') }}</p>
            <a :href="tutorialUrl" target="_blank" rel="noopener noreferrer" class="home-text-link">
              {{ t('home.arqel.resources.docs.action') }}
            </a>
          </article>

          <article>
            <small>{{ t('home.arqel.resources.community.label') }}</small>
            <h3>{{ t('home.arqel.resources.community.title') }}</h3>
            <p>{{ t('home.arqel.resources.community.desc') }}</p>
            <a v-if="contactHref" :href="contactHref" target="_blank" rel="noopener noreferrer" class="home-text-link">
              {{ t('home.arqel.resources.community.action') }}
            </a>
            <span v-else-if="contactText" class="home-resource-note">{{ contactText }}</span>
          </article>
        </div>
      </section>
    </main>

    <footer class="home-footer">
      <span>&copy; {{ currentYear }} {{ brandName }}</span>
      <a v-if="docUrl" :href="docUrl" target="_blank" rel="noopener noreferrer">
        {{ t('home.docs') }}
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import { initThemePreference, toggleThemePreference } from '@/utils/theme'

const { t } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

const brandName = 'Arqel'

const DEFAULT_DOC_URL = 'https://docs.arqel.net/'
const TUTORIAL_PATH = 'tools/'

// Site settings - directly from appStore (already initialized from injected config)
const docUrl = computed(() => appStore.cachedPublicSettings?.doc_url || appStore.docUrl || DEFAULT_DOC_URL)
const tutorialUrl = computed(() => new URL(TUTORIAL_PATH, docUrl.value || DEFAULT_DOC_URL).toString())
const contactText = computed(() => (appStore.cachedPublicSettings?.contact_info || appStore.contactInfo || '').trim())
const contactHref = computed(() => {
  const value = contactText.value
  if (!value) return ''
  if (/^https?:\/\//i.test(value) || /^mailto:/i.test(value) || /^tg:\/\//i.test(value)) return value
  if (/^@/.test(value)) return `https://t.me/${value.slice(1)}`
  return ''
})
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')

// Check if homeContent is a URL (for iframe display)
const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

// Theme
const isDark = ref(document.documentElement.classList.contains('dark'))

// Auth state
const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')

// Current year for footer
const currentYear = computed(() => new Date().getFullYear())
const revealObserver = ref<IntersectionObserver | null>(null)

// Toggle theme
function toggleTheme() {
  isDark.value = toggleThemePreference(isDark.value) === 'dark'
}

// Initialize theme
function initTheme() {
  isDark.value = initThemePreference() === 'dark'
}

function initRevealAnimations() {
  if (homeContent.value || !('IntersectionObserver' in window)) {
    document.querySelectorAll<HTMLElement>('.home-reveal-target').forEach((el) => {
      el.classList.add('is-visible', 'in-view')
    })
    return
  }

  revealObserver.value?.disconnect()
  revealObserver.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible', 'in-view')
          revealObserver.value?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  document.querySelectorAll<HTMLElement>('.home-reveal-target').forEach((el) => {
    revealObserver.value?.observe(el)
  })
}

onMounted(() => {
  initTheme()

  // Check auth state
  authStore.checkAuth()

  // Ensure public settings are loaded (will use cache if already loaded from injected config)
  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }

  nextTick(initRevealAnimations)
})

onBeforeUnmount(() => {
  revealObserver.value?.disconnect()
})
</script>

<style scoped>
.home-shell {
  --home-bg: #fbfbfc;
  --home-panel: #ffffff;
  --home-panel-muted: #f4f4f6;
  --home-text: #111113;
  --home-muted: #626670;
  --home-soft: #858995;
  --home-line: #e5e6ea;
  --home-line-strong: #d0d2d8;
  --home-accent: #6467f2;
  --home-accent-soft: rgba(100, 103, 242, 0.1);
  --home-shadow: 0 0 0 1px rgba(17, 17, 19, 0.06), 0 18px 48px -34px rgba(17, 17, 19, 0.25);
  --home-glow: rgba(100, 103, 242, 0.1);
  min-height: 100vh;
  overflow-x: hidden;
  background-color: var(--home-bg);
  background-image:
    radial-gradient(circle at 50% -10%, rgba(100, 103, 242, 0.14), transparent 38rem),
    linear-gradient(to right, rgba(17, 17, 19, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17, 17, 19, 0.025) 1px, transparent 1px);
  background-size: 100% 100%, 40px 40px, 40px 40px;
  color: var(--home-text);
}

.home-shell::before {
  position: fixed;
  inset: 0;
  z-index: 0;
  background: radial-gradient(circle at 85% 60%, var(--home-glow), transparent 35vw);
  animation: home-ambient-pulse 10s ease-in-out infinite alternate;
  content: '';
  pointer-events: none;
}

.home-shell > * {
  position: relative;
  z-index: 1;
}

.home-shell.home-shell-dark {
  --home-bg: #09090b;
  --home-panel: #111113;
  --home-panel-muted: #18181b;
  --home-text: #fafafa;
  --home-muted: #a1a1aa;
  --home-soft: #71717a;
  --home-line: #2f3037;
  --home-line-strong: #3d3d42;
  --home-accent: #6467f2;
  --home-accent-soft: rgba(100, 103, 242, 0.16);
  --home-shadow: 0 0 0 1px rgba(61, 61, 66, 0.86), 0 16px 44px -30px rgba(0, 0, 0, 0.9);
  --home-glow: rgba(167, 139, 250, 0.12);
  background-image:
    radial-gradient(circle at 50% -10%, rgba(100, 103, 242, 0.2), transparent 40rem),
    linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
}

.home-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid color-mix(in srgb, var(--home-line) 70%, transparent);
  background: color-mix(in srgb, var(--home-bg) 85%, transparent);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.home-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  max-width: 1120px;
  height: 56px;
  margin: 0 auto;
  padding: 0 24px;
}

.home-brand,
.home-nav-links,
.home-actions,
.home-button,
.home-icon-button,
.home-login-button,
.home-metrics,
.home-footer {
  display: flex;
  align-items: center;
}

.home-brand {
  gap: 10px;
  color: inherit;
  text-decoration: none;
}

.home-brand-mark {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid var(--home-line-strong);
  border-radius: 7px;
  background: var(--home-panel);
  color: var(--home-text);
  font-size: 16px;
  font-weight: 750;
  line-height: 1;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.home-brand:hover .home-brand-mark {
  border-color: var(--home-accent);
  background: var(--home-accent);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(100, 103, 242, 0.3);
  transform: rotate(9deg) scale(1.05);
}

.home-brand-name {
  color: var(--home-text);
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.home-nav-links {
  gap: 4px;
  color: var(--home-muted);
  font-size: 14px;
  font-weight: 500;
}

.home-nav-links a,
.home-footer a {
  border-radius: 6px;
  color: inherit;
  padding: 8px 10px;
  text-decoration: none;
  transition:
    background-color 0.18s ease,
    color 0.18s ease;
}

.home-nav-links a:hover,
.home-footer a:hover {
  background: var(--home-panel-muted);
  color: var(--home-text);
  text-shadow: 0 0 8px color-mix(in srgb, var(--home-text) 22%, transparent);
}

.home-actions {
  gap: 8px;
}

.home-actions :deep(button) {
  border-radius: 999px;
  color: var(--home-muted);
}

.home-actions :deep(button:hover) {
  background: var(--home-panel-muted);
  color: var(--home-text);
}

.home-actions :deep(.absolute) {
  border-color: var(--home-line-strong);
  background: var(--home-panel);
}

.home-icon-button,
.home-login-button,
.home-button {
  justify-content: center;
  border: 1px solid var(--home-line-strong);
  border-radius: 999px;
  text-decoration: none;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease;
}

.home-icon-button {
  width: 36px;
  height: 36px;
  background: transparent;
  color: var(--home-muted);
}

.home-login-button {
  min-height: 36px;
  padding: 0 14px;
  background: var(--home-panel);
  border-color: var(--home-line-strong);
  color: var(--home-text);
  font-size: 14px;
  font-weight: 600;
}

.home-icon-button:hover,
.home-button-secondary:hover {
  border-color: var(--home-line-strong);
  background: var(--home-panel-muted);
  color: var(--home-text);
}

.home-login-button:hover {
  background: var(--home-text);
  border-color: var(--home-text);
  color: var(--home-bg);
}

.home-button-primary:hover {
  box-shadow: 0 0 0 1px rgba(100, 103, 242, 0.42), 0 10px 28px -22px rgba(100, 103, 242, 0.48);
}

.home-main {
  max-width: 1120px;
  margin: 0 auto;
  padding: clamp(42px, 6vw, 72px) 24px 0;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(320px, 0.76fr);
  align-items: center;
  gap: clamp(36px, 7vw, 84px);
  min-height: 450px;
  padding-top: 0;
  text-align: left;
}

.home-hero-copy {
  max-width: 590px;
}

.home-hero-element {
  opacity: 0;
  animation: home-reveal-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.home-d-1 { animation-delay: 0.1s; }
.home-d-2 { animation-delay: 0.2s; }
.home-d-3 { animation-delay: 0.3s; }
.home-d-4 { animation-delay: 0.4s; }
.home-d-5 { animation-delay: 0.48s; }

.home-kicker {
  margin: 0 0 18px;
  color: var(--home-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.home-title {
  margin: 0;
  background: linear-gradient(to right, var(--home-text) 20%, #a78bfa 50%, var(--home-text) 80%);
  background-clip: text;
  background-size: 200% auto;
  color: transparent;
  font-size: clamp(44px, 5.8vw, 68px);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 0.98;
  -webkit-background-clip: text;
  animation: home-text-shine 5s linear infinite;
}

.home-title.home-hero-element {
  animation:
    home-reveal-up 0.8s 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards,
    home-text-shine 5s linear infinite;
}

.home-subtitle {
  max-width: 560px;
  margin: 18px 0 0;
  color: var(--home-text);
  font-size: clamp(22px, 3.1vw, 34px);
  font-weight: 750;
  letter-spacing: -0.045em;
  line-height: 1.12;
}

.home-description {
  max-width: 570px;
  margin: 18px 0 0;
  color: var(--home-muted);
  font-size: clamp(16px, 1.8vw, 18px);
  line-height: 1.7;
}

.home-hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 12px;
  margin-top: 30px;
}

.home-hero-visual {
  width: 100%;
  padding-top: clamp(10px, 3vw, 36px);
}

.home-terminal-card {
  overflow: hidden;
  width: min(100%, 420px);
  margin-left: auto;
  border: 1px solid var(--home-line-strong);
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.82);
  box-shadow: var(--home-shadow);
  backdrop-filter: blur(12px);
  transition:
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.home-terminal-card:hover {
  border-color: color-mix(in srgb, var(--home-accent) 38%, var(--home-line-strong));
  box-shadow: 0 0 0 1px rgba(100, 103, 242, 0.22), 0 18px 52px -34px rgba(100, 103, 242, 0.45);
}

.home-shell-dark .home-terminal-card {
  background: rgba(15, 23, 42, 0.6);
}

.home-terminal-header {
  display: grid;
  grid-template-columns: 58px 1fr 58px;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(30, 41, 59, 0.5);
  padding: 12px 14px;
}

.home-terminal-dots {
  display: flex;
  gap: 7px;
}

.home-terminal-dots span {
  width: 11px;
  height: 11px;
  border-radius: 999px;
}

.home-terminal-dots span:nth-child(1) {
  background: #ef4444;
}

.home-terminal-dots span:nth-child(2) {
  background: #eab308;
}

.home-terminal-dots span:nth-child(3) {
  background: #22c55e;
}

.home-terminal-title {
  color: #94a3b8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  font-weight: 650;
  text-align: center;
}

.home-terminal-body {
  display: grid;
  gap: 14px;
  padding: 24px 24px 28px;
  color: #cbd5e1;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
}


.home-setup-step {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
  opacity: 0;
  animation: home-code-fade-in 0.4s ease forwards;
}

.home-setup-step:nth-child(1) { animation-delay: 0.6s; }
.home-setup-step:nth-child(2) { animation-delay: 1s; }
.home-setup-step:nth-child(3) { animation-delay: 1.4s; }

.home-setup-index {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 1px solid rgba(100, 103, 242, 0.35);
  border-radius: 999px;
  background: rgba(100, 103, 242, 0.16);
  color: #d8d8ff;
  font-size: 12px;
  font-weight: 800;
}

.home-setup-step strong {
  display: block;
  color: #f8fafc;
  font-size: 13px;
  line-height: 1.35;
}

.home-setup-step span:not(.home-setup-index) {
  display: block;
  margin-top: 3px;
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.55;
}

.home-terminal-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: home-code-fade-in 0.4s ease forwards;
}

.home-terminal-line:nth-child(1) { animation-delay: 0.6s; }
.home-terminal-line:nth-child(2) { animation-delay: 1s; }
.home-terminal-line:nth-child(3) { animation-delay: 1.4s; }
.home-terminal-line:nth-child(4) { animation-delay: 1.9s; }

.terminal-muted {
  color: #64748b;
  font-style: italic;
}

.terminal-prompt,
.terminal-ok {
  color: #22c55e;
  font-weight: 750;
}

.terminal-ok {
  border-radius: 6px;
  background: rgba(34, 197, 94, 0.14);
  padding: 1px 7px;
}

.terminal-command {
  color: #38bdf8;
}

.terminal-flag {
  color: #a78bfa;
}

.terminal-url {
  color: #2dd4bf;
}

.terminal-json {
  color: #fbbf24;
}

.terminal-cursor {
  width: 8px;
  height: 15px;
  background: #fafafa;
  animation: home-terminal-blink 1s step-end infinite;
}

@keyframes home-terminal-blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

@keyframes home-reveal-up {
  0% {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

@keyframes home-text-shine {
  to { background-position: 200% center; }
}

@keyframes home-code-fade-in {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-button {
  gap: 9px;
  min-height: 42px;
  padding: 0 18px;
  font-size: 14px;
  font-weight: 700;
}

.home-button-primary {
  position: relative;
  overflow: hidden;
  background: var(--home-accent);
  border-color: var(--home-accent);
  color: #ffffff;
}

.home-button-primary::before {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.24), transparent);
  content: '';
  transform: skewX(-20deg);
  transition: left 0.5s ease;
}

.home-button-primary:hover::before {
  left: 150%;
}

.home-button-secondary {
  background: var(--home-panel);
  color: var(--home-text);
}

.home-shell-dark .home-button-secondary {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
}

.home-shell-dark .home-button-secondary:hover {
  border-color: #555555;
  background: rgba(255, 255, 255, 0.08);
}

.home-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 900px;
  margin: 64px auto 0;
}

.home-metric {
  position: relative;
  min-width: 0;
  border: 1px solid color-mix(in srgb, var(--home-line) 75%, transparent);
  border-radius: 20px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--home-panel) 82%, transparent), color-mix(in srgb, var(--home-panel-muted) 42%, transparent));
  padding: 36px 24px;
  text-align: center;
  backdrop-filter: blur(12px);
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.home-metric:hover {
  border-color: color-mix(in srgb, var(--home-accent) 34%, var(--home-line));
  background: linear-gradient(180deg, color-mix(in srgb, var(--home-panel) 94%, transparent), color-mix(in srgb, var(--home-panel-muted) 62%, transparent));
  box-shadow: 0 10px 26px -22px rgba(0, 0, 0, 0.22), 0 0 18px -14px rgba(100, 103, 242, 0.24);
}

.home-shell-dark .home-metric {
  border-color: rgba(255, 255, 255, 0.06);
  background: linear-gradient(180deg, rgba(24, 24, 27, 0.5), rgba(15, 15, 18, 0.2));
}

.home-shell-dark .home-metric:hover {
  border-color: rgba(100, 103, 242, 0.3);
  background: linear-gradient(180deg, rgba(30, 30, 36, 0.7), rgba(15, 15, 18, 0.4));
  box-shadow: 0 10px 26px -20px rgba(0, 0, 0, 0.7), 0 0 18px -12px rgba(100, 103, 242, 0.14);
}

.home-metric-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  color: var(--home-soft);
  transition:
    color 0.2s ease;
}

.home-metric-icon svg {
  width: 26px;
  height: 26px;
  stroke-width: 1.5;
}

.home-metric:hover .home-metric-icon {
  color: var(--home-accent);
}

.home-metric strong {
  display: block;
  color: var(--home-text);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 780;
  letter-spacing: -0.06em;
  line-height: 1;
}

.home-metric span {
  display: block;
  margin-top: 8px;
  color: var(--home-muted);
  font-size: 13px;
  font-weight: 550;
}

.home-story {
  position: relative;
  margin-top: clamp(72px, 11vw, 138px);
  border-top: 1px solid var(--home-line);
}

.home-story::before {
  position: absolute;
  top: -1px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--home-accent), transparent);
  content: '';
  opacity: 0;
  transition:
    opacity 0.6s ease,
    width 1.1s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-story.in-view::before {
  width: 100%;
  opacity: 1;
}

.home-story-row {
  position: relative;
  display: grid;
  grid-template-columns: 78px minmax(0, 1fr);
  gap: clamp(22px, 4vw, 56px);
  padding: clamp(44px, 7vw, 80px) 0;
  border-bottom: 1px solid var(--home-line);
  overflow: hidden;
}

.home-story-row::after {
  position: absolute;
  bottom: -1px;
  left: 78px;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--home-accent), transparent);
  content: '';
  opacity: 0.72;
  transition: width 0.45s ease;
}

.home-story-row.is-visible::after {
  width: calc(100% - 78px);
}

.home-story-row-large {
  padding-top: clamp(58px, 10vw, 116px);
}

.home-story-index {
  margin: 0;
  color: var(--home-soft);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  font-weight: 750;
  letter-spacing: 0.12em;
  transition: color 0.3s ease;
}

.home-story-row:hover .home-story-index {
  color: var(--home-accent);
}

.home-reveal-title,
.home-reveal-body,
.home-model-chip,
.home-responsibility span,
.home-resource-lead,
.home-resource-links article,
.home-metric {
  opacity: 0;
  will-change: opacity, transform, filter;
}

.home-story-row h2 {
  max-width: 760px;
  margin: 0;
  color: var(--home-text);
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 760;
  letter-spacing: -0.045em;
  line-height: 1.16;
}

.home-story-row p:not(.home-story-index) {
  max-width: 720px;
  margin: 16px 0 0;
  color: var(--home-muted);
  font-size: clamp(15px, 1.7vw, 17px);
  line-height: 1.8;
}

.home-model-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
}

.home-model-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--home-line);
  border-radius: 999px;
  background: color-mix(in srgb, var(--home-panel) 62%, transparent);
  color: var(--home-muted);
  padding: 6px 14px 6px 6px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  font-weight: 600;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.home-model-chip:hover {
  border-color: var(--home-soft);
  background: color-mix(in srgb, var(--home-panel-muted) 78%, transparent);
  color: var(--home-text);
}

.home-model-icon {
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 999px;
  color: #ffffff;
}

.home-model-icon svg {
  display: block;
  width: 16px;
  height: 16px;
  overflow: visible;
}

.home-model-icon-claude { background: #d97757; }
.home-model-icon-gpt { background: #10a37f; }
.home-model-icon-gemini { background: linear-gradient(135deg, #4285f4, #1a73e8); }
.home-model-icon-auto { background: linear-gradient(135deg, var(--home-accent), #8b5cf6); }

.home-responsibility {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  max-width: 680px;
  margin-top: 20px;
}

.home-responsibility-three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.home-responsibility span {
  border: 1px solid var(--home-line);
  border-radius: 12px;
  background: color-mix(in srgb, var(--home-panel) 62%, transparent);
  color: var(--home-muted);
  padding: 14px 16px;
  font-size: 13px;
  line-height: 1.5;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;
}

.home-responsibility span:hover {
  border-color: var(--home-soft);
  background: color-mix(in srgb, var(--home-panel-muted) 78%, transparent);
  color: var(--home-text);
}

.home-shell-dark .home-responsibility span {
  background: rgba(24, 24, 27, 0.4);
}

.home-shell-dark .home-responsibility span:hover {
  background: rgba(30, 30, 35, 0.8);
}

.home-resource-flow {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(300px, 0.95fr);
  gap: clamp(36px, 7vw, 88px);
  margin-top: clamp(84px, 12vw, 150px);
  padding-bottom: clamp(16px, 4vw, 48px);
}

.home-resource-lead h2 {
  max-width: 650px;
  margin: 0;
  color: var(--home-text);
  font-size: clamp(34px, 5.6vw, 64px);
  font-weight: 800;
  letter-spacing: -0.065em;
  line-height: 1;
}

.home-resource-lead > p:not(.home-kicker) {
  max-width: 600px;
  margin: 20px 0 0;
  color: var(--home-muted);
  font-size: clamp(16px, 2vw, 20px);
  line-height: 1.75;
}

.home-resource-links {
  display: grid;
  gap: 16px;
  align-self: end;
}

.home-resource-links article {
  border: 1px solid var(--home-line);
  border-radius: 18px;
  background: linear-gradient(180deg, var(--home-panel), color-mix(in srgb, var(--home-panel-muted) 80%, transparent));
  cursor: pointer;
  padding: 22px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.home-resource-links article:hover {
  border-color: var(--home-line-strong);
  box-shadow: 0 10px 28px -24px rgba(0, 0, 0, 0.32);
}

.home-resource-links small {
  color: var(--home-soft);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.home-resource-links h3 {
  margin: 12px 0 0;
  color: var(--home-text);
  font-size: 22px;
  font-weight: 740;
  letter-spacing: -0.045em;
}

.home-resource-links p {
  margin: 8px 0 0;
  color: var(--home-muted);
  font-size: 14px;
  line-height: 1.7;
}

.home-text-link,
.home-resource-note {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  color: var(--home-accent);
  font-size: 14px;
  font-weight: 750;
  text-decoration: none;
}

.home-resource-action {
  width: max-content;
  margin-top: 28px;
}

.home-text-link:hover {
  color: var(--home-text);
}

.home-resource-note {
  color: var(--home-muted);
  word-break: break-all;
}

.home-metrics.is-visible .home-metric,
.home-story-row.is-visible .home-reveal-title,
.home-story-row.is-visible .home-reveal-body,
.home-story-row.is-visible .home-model-chip,
.home-story-row.is-visible .home-responsibility span,
.home-resource-flow.is-visible .home-resource-lead,
.home-resource-flow.is-visible .home-resource-links article {
  animation: home-reveal-up 0.78s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.home-story-row.is-visible .home-reveal-body {
  animation-name: home-reveal-body-up;
  animation-duration: 0.9s;
}

.home-metrics.is-visible .home-metric:nth-child(1) { animation-delay: 0.05s; }
.home-metrics.is-visible .home-metric:nth-child(2) { animation-delay: 0.15s; }
.home-metrics.is-visible .home-metric:nth-child(3) { animation-delay: 0.25s; }
.home-story-row.is-visible .home-model-chip:nth-child(1) { animation-delay: 0.1s; }
.home-story-row.is-visible .home-model-chip:nth-child(2) { animation-delay: 0.18s; }
.home-story-row.is-visible .home-model-chip:nth-child(3) { animation-delay: 0.26s; }
.home-story-row.is-visible .home-model-chip:nth-child(4) { animation-delay: 0.34s; }
.home-story-row.is-visible .home-responsibility span:nth-child(1) { animation-delay: 0.14s; }
.home-story-row.is-visible .home-responsibility span:nth-child(2) { animation-delay: 0.24s; }
.home-story-row.is-visible .home-responsibility span:nth-child(3) { animation-delay: 0.34s; }
.home-resource-flow.is-visible .home-resource-lead { animation-delay: 0s; }
.home-resource-flow.is-visible .home-resource-links article:nth-child(1) { animation-delay: 0.14s; }
.home-resource-flow.is-visible .home-resource-links article:nth-child(2) { animation-delay: 0.26s; }

@keyframes home-reveal-body-up {
  0% {
    opacity: 0;
    clip-path: inset(0 0 100% 0);
    filter: blur(6px);
    transform: translateY(40px) scaleY(0.92);
  }
  100% {
    opacity: 1;
    clip-path: inset(0 0 0 0);
    filter: blur(0);
    transform: translateY(0) scaleY(1);
  }
}

@keyframes home-ambient-pulse {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.home-footer {
  justify-content: center;
  gap: 16px;
  margin-top: 64px;
  border-top: 1px solid var(--home-line);
  padding: 22px 24px;
  color: var(--home-muted);
  font-size: 13px;
}

@media (max-width: 980px) {
  .home-nav-links {
    display: none;
  }

  .home-story-row,
  .home-resource-flow {
    grid-template-columns: 1fr;
  }

  .home-story-row::after {
    left: 0;
  }

  .home-story-row.is-visible::after {
    width: 100%;
  }

  .home-story-row {
    gap: 14px;
  }

  .home-story-index {
    margin-bottom: 4px;
  }

  .home-resource-links {
    align-self: stretch;
  }

  .home-hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .home-hero-visual {
    padding-top: 0;
  }

  .home-terminal-card {
    margin-right: auto;
    margin-left: 0;
  }

}

@media (prefers-reduced-motion: reduce) {
  .home-shell,
  .home-shell::before,
  .home-hero-element,
  .home-reveal-text,
  .home-story-index,
  .home-resource-lead,
  .home-resource-links article,
  .home-metric,
  .home-reveal-title,
  .home-reveal-body,
  .home-model-chip,
  .home-responsibility span,
  .terminal-cursor,
  .home-title {
    animation: none !important;
  }

  .home-hero-element,
  .home-reveal-text,
  .home-story-index,
  .home-resource-lead,
  .home-resource-links article,
  .home-metric,
  .home-reveal-title,
  .home-reveal-body,
  .home-model-chip,
  .home-responsibility span {
    opacity: 1;
    clip-path: none;
    filter: none;
    transform: none;
  }
}

@media (max-width: 720px) {
  .home-nav {
    padding: 0 16px;
  }

  .home-actions {
    gap: 6px;
  }

  .home-main {
    padding-right: 16px;
    padding-left: 16px;
  }

  .home-hero {
    gap: 32px;
    padding-top: 12px;
  }

  .home-title {
    font-size: clamp(42px, 16vw, 60px);
  }

  .home-terminal-body {
    padding: 18px;
    font-size: 12px;
  }

  .home-metrics {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .home-responsibility,
  .home-responsibility-three {
    grid-template-columns: 1fr;
  }
}
</style>
