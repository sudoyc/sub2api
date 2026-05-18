<template>
  <!-- Custom Home Content: Full Page Mode -->
  <div v-if="homeContent" class="min-h-screen">
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
    <header class="home-header home-hero-element home-d-0">
      <nav class="home-nav" aria-label="Primary navigation">
        <router-link to="/" class="home-brand" aria-label="Arqel home">
          <span class="home-brand-mark">A</span>
          <span class="home-brand-name">{{ brandName }}</span>
        </router-link>

        <div class="home-nav-links">
          <a href="#models">{{ t('home.arqel.nav.models') }}</a>
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

          <router-link :to="isAuthenticated ? dashboardPath : '/login'" class="home-login-button">
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
              :href="docsHomeUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="home-button home-button-secondary home-hero-element home-d-4"
            >
              {{ t('home.arqel.docsEntry') }}
            </a>
          </div>
        </div>

        <aside class="home-hero-visual" aria-label="Arqel Python SDK example">
          <div class="home-code-rise">
            <div class="home-code-motion">
              <div class="home-code-tilt">
                <div class="home-code-card">
                  <div class="home-code-header">
                    <div class="home-code-dots"><span></span><span></span><span></span></div>
                    <span class="home-code-title">app.py - OpenAI SDK</span>
                  </div>
                  <div class="home-code-body">
                    <div class="home-code-line home-code-d-2"><span class="syntax-keyword">from</span> openai <span class="syntax-keyword">import</span> OpenAI</div>
                    <div class="home-code-spacer"></div>
                    <div class="home-code-line home-code-d-3"><span class="syntax-comment"># {{ t('home.arqel.code.comment') }}</span></div>
                    <div class="home-code-line home-code-d-4">client = <span class="syntax-func">OpenAI</span>(</div>
                    <div class="home-code-line home-code-d-5">&nbsp;&nbsp;base_url=<span class="syntax-string">"https://api.arqel.net/v1"</span>,</div>
                    <div class="home-code-line home-code-d-6">&nbsp;&nbsp;api_key=<span class="syntax-string">"arq-sk-xxxxxxxxxxxxxxxx"</span>,</div>
                    <div class="home-code-line home-code-d-7">)</div>
                    <div class="home-code-spacer"></div>
                    <div class="home-code-line home-code-d-8">response = client.chat.completions.<span class="syntax-func">create</span>(</div>
                    <div class="home-code-line home-code-d-9">&nbsp;&nbsp;model=<span class="syntax-string">"gpt-5.5"</span>,</div>
                    <div class="home-code-line home-code-d-10">&nbsp;&nbsp;messages=[{<span class="syntax-string">"role"</span>: <span class="syntax-string">"user"</span>, <span class="syntax-string">"content"</span>: <span class="syntax-string">"Hello, Arqel!"</span>}],</div>
                    <div class="home-code-line home-code-d-11">)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>

      <section class="home-section" aria-labelledby="clients-title">
        <div class="home-section-heading home-scroll-reveal">
          <h2 id="clients-title" class="home-section-title">{{ t('home.arqel.clients.title') }}</h2>
          <p class="home-section-desc">{{ t('home.arqel.clients.desc') }}</p>
        </div>

        <div class="home-client-grid">
          <article v-for="client in clients" :key="client.key" class="home-agent-card home-scroll-reveal">
            <div class="home-agent-visual" :class="`home-agent-visual-${client.key}`">
              <img class="home-agent-image" :src="client.image" :alt="`${client.name} interface`" loading="lazy" />
            </div>
            <div class="home-agent-content">
              <h3>{{ client.name }}</h3>
              <p>{{ client.desc }}</p>
              <a :href="client.docUrl" target="_blank" rel="noopener noreferrer" class="home-doc-link">
                {{ t('home.arqel.clients.docAction') }} <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="models" class="home-section home-capabilities" aria-labelledby="models-title">
        <div class="home-capability-grid">
          <div>
            <div class="home-section-heading home-section-heading-compact home-scroll-reveal">
              <h2 id="models-title" class="home-section-title">{{ t('home.arqel.models.title') }}</h2>
              <p class="home-section-desc">{{ t('home.arqel.models.desc') }}</p>
            </div>

            <div class="home-model-list home-scroll-reveal-group">
              <article v-for="model in modelGroups" :key="model.key" class="home-model-group home-group-child">
                <h3>
                  <span class="home-model-icon" :class="`home-model-icon-${model.key}`" aria-hidden="true">
                    <svg v-if="model.key === 'claude'" viewBox="0 0 24 24" fill="currentColor"><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" /></svg>
                    <svg v-else-if="model.key === 'gpt'" viewBox="0 0 24 24" fill="currentColor"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" /></svg>
                    <svg v-else viewBox="0 0 24 24" fill="currentColor"><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" /></svg>
                  </span>
                  {{ model.name }}
                </h3>
                <p>{{ model.models }}</p>
              </article>
            </div>
          </div>

          <div>
            <div class="home-section-heading home-section-heading-compact home-scroll-reveal">
              <h2 class="home-section-title">{{ t('home.arqel.capabilities.title') }}</h2>
              <p class="home-section-desc">{{ t('home.arqel.capabilities.desc') }}</p>
            </div>

            <div class="home-feature-grid home-scroll-reveal-group">
              <article v-for="feature in features" :key="feature.key" class="home-feature-item home-group-child">
                <h3>{{ feature.title }}</h3>
                <p>{{ feature.desc }}</p>
              </article>
              <article class="home-community-card home-group-child">
                <h3>{{ t('home.arqel.community.title') }}</h3>
                <p>{{ t('home.arqel.community.desc') }}</p>
                <span>{{ t('home.arqel.community.placeholder') }}</span>
              </article>
            </div>
          </div>
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

const docUrl = computed(() => appStore.cachedPublicSettings?.doc_url || appStore.docUrl || DEFAULT_DOC_URL)
const docsHomeUrl = computed(() => new URL('/', docUrl.value || DEFAULT_DOC_URL).toString())
const tutorialUrl = computed(() => new URL(TUTORIAL_PATH, docUrl.value || DEFAULT_DOC_URL).toString())
const docsUrl = (path: string) => new URL(path.replace(/^\//, ''), docsHomeUrl.value).toString()
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')

const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isDark = ref(document.documentElement.classList.contains('dark'))

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => isAdmin.value ? '/admin/dashboard' : '/dashboard')
const currentYear = computed(() => new Date().getFullYear())
const revealObserver = ref<IntersectionObserver | null>(null)

const clients = computed(() => [
  {
    key: 'claudeCode',
    name: 'Claude Code',
    desc: t('home.arqel.clients.items.claudeCode'),
    docUrl: docsUrl('/tools/agents/claude-code'),
    image: '/images/arqel-agents/claude-code.webp',
  },
  {
    key: 'cursor',
    name: 'Cursor',
    desc: t('home.arqel.clients.items.cursor'),
    docUrl: docsUrl('/tools/agents/cursor'),
    image: '/images/arqel-agents/cursor.webp',
  },
  {
    key: 'geminiCli',
    name: 'Gemini CLI',
    desc: t('home.arqel.clients.items.geminiCli'),
    docUrl: docsUrl('/tools/agents/gemini-cli'),
    image: '/images/arqel-agents/gemini.webp',
  },
  {
    key: 'opencode',
    name: 'OpenCode',
    desc: t('home.arqel.clients.items.opencode'),
    docUrl: docsUrl('/tools/cc-switch/provider'),
    image: '/images/arqel-agents/opencode.webp',
  },
  {
    key: 'codex',
    name: 'Codex',
    desc: t('home.arqel.clients.items.codex'),
    docUrl: docsUrl('/tools/agents/codex-cli'),
    image: '/images/arqel-agents/codex.webp',
  },
  {
    key: 'hermes',
    name: 'Hermes Agent',
    desc: t('home.arqel.clients.items.hermes'),
    docUrl: docsUrl('/tools/agents/hermes'),
    image: '/images/arqel-agents/hermes.webp',
  },
])

const modelGroups = computed(() => [
  { key: 'claude', name: 'Claude', models: t('home.arqel.models.items.claude') },
  { key: 'gpt', name: 'GPT / OpenAI-compatible', models: t('home.arqel.models.items.gpt') },
  { key: 'gemini', name: 'Gemini', models: t('home.arqel.models.items.gemini') },
])

const features = computed(() => [
  { key: 'credentials', title: t('home.arqel.capabilities.items.credentials.title'), desc: t('home.arqel.capabilities.items.credentials.desc') },
  { key: 'logs', title: t('home.arqel.capabilities.items.logs.title'), desc: t('home.arqel.capabilities.items.logs.desc') },
  { key: 'routing', title: t('home.arqel.capabilities.items.routing.title'), desc: t('home.arqel.capabilities.items.routing.desc') },
  { key: 'usage', title: t('home.arqel.capabilities.items.usage.title'), desc: t('home.arqel.capabilities.items.usage.desc') },
])

function toggleTheme() {
  isDark.value = toggleThemePreference(isDark.value) === 'dark'
}

function initTheme() {
  isDark.value = initThemePreference() === 'dark'
}

function initRevealAnimations() {
  if (homeContent.value || !('IntersectionObserver' in window)) {
    document.querySelectorAll<HTMLElement>('.home-scroll-reveal, .home-scroll-reveal-group').forEach((el) => {
      el.classList.add('is-visible')
    })
    return
  }

  revealObserver.value?.disconnect()
  revealObserver.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.value?.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    }
  )

  document.querySelectorAll<HTMLElement>('.home-scroll-reveal, .home-scroll-reveal-group').forEach((el) => {
    revealObserver.value?.observe(el)
  })
}

onMounted(() => {
  initTheme()
  authStore.checkAuth()

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
  --home-bg: #f8f9fd;
  --home-panel: #ffffff;
  --home-panel-muted: #f0f3fb;
  --home-panel-tint: #f7f8ff;
  --home-text: #111827;
  --home-muted: #5f6677;
  --home-soft: #7d8597;
  --home-line: #e0e5f0;
  --home-line-strong: #c9d1e2;
  --home-accent: #5b5ef0;
  --home-accent-hover: #4f52df;
  --home-accent-soft: rgba(91, 94, 240, 0.1);
  --home-accent-glow: rgba(91, 94, 240, 0.22);
  --home-card-top-line: rgba(91, 94, 240, 0.42);
  --home-control-bg: rgba(255, 255, 255, 0.78);
  --home-control-hover-bg: rgba(91, 94, 240, 0.08);
  --home-agent-content-bg: linear-gradient(180deg, #ffffff 0%, #f7f8ff 100%);
  --home-model-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(245, 247, 255, 0.86)), rgba(255, 255, 255, 0.76);
  --home-model-hover-bg: linear-gradient(135deg, rgba(91, 94, 240, 0.12), rgba(255, 255, 255, 0.94) 52%, rgba(242, 245, 255, 0.92));
  --home-feature-border: rgba(91, 94, 240, 0.18);
  --home-community-bg: linear-gradient(135deg, rgba(91, 94, 240, 0.1), rgba(255, 255, 255, 0.9) 48%, rgba(240, 244, 255, 0.82));
  --home-community-pill-border: rgba(91, 94, 240, 0.3);
  --home-community-pill-text: #656eea;
  --home-visual-divider: rgba(17, 24, 39, 0.08);
  --home-shadow: 0 0 0 1px rgba(17, 24, 39, 0.045), 0 22px 52px -34px rgba(43, 52, 86, 0.34);
  min-height: 100vh;
  overflow-x: hidden;
  background-color: var(--home-bg);
  background-image:
    radial-gradient(circle at 50% -10%, rgba(100, 103, 242, 0.14), transparent 45rem),
    linear-gradient(to right, rgba(17, 17, 19, 0.025) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17, 17, 19, 0.025) 1px, transparent 1px);
  background-size: 100% 100%, 32px 32px, 32px 32px;
  color: var(--home-text);
}

.home-shell.home-shell-dark {
  --home-bg: #09090b;
  --home-panel: #111114;
  --home-panel-muted: #18181b;
  --home-text: #fafafa;
  --home-muted: #a1a1aa;
  --home-soft: #71717a;
  --home-line: #27272a;
  --home-line-strong: #3f3f46;
  --home-accent: #6467f2;
  --home-accent-hover: #7b7ef4;
  --home-accent-soft: rgba(100, 103, 242, 0.16);
  --home-accent-glow: rgba(100, 103, 242, 0.25);
  --home-card-top-line: rgba(100, 103, 242, 0.7);
  --home-control-bg: rgba(255, 255, 255, 0.03);
  --home-control-hover-bg: rgba(255, 255, 255, 0.08);
  --home-agent-content-bg: linear-gradient(180deg, var(--home-panel) 0%, rgba(15, 15, 18, 0.8) 100%);
  --home-model-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015)), rgba(24, 24, 27, 0.4);
  --home-model-hover-bg: linear-gradient(135deg, rgba(100, 103, 242, 0.16), rgba(255, 255, 255, 0.025) 54%, rgba(30, 30, 35, 0.86));
  --home-feature-border: rgba(255, 255, 255, 0.06);
  --home-community-bg: linear-gradient(135deg, rgba(100, 103, 242, 0.14), rgba(255, 255, 255, 0.025) 48%, rgba(24, 24, 27, 0.52));
  --home-community-pill-border: rgba(255, 255, 255, 0.16);
  --home-community-pill-text: rgba(255, 255, 255, 0.5);
  --home-visual-divider: rgba(255, 255, 255, 0.03);
  --home-shadow: 0 0 0 1px rgba(61, 61, 66, 0.4) inset, 0 24px 54px -20px rgba(0, 0, 0, 0.9);
  background-image:
    radial-gradient(circle at 50% -10%, rgba(100, 103, 242, 0.25), transparent 45rem),
    linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
}

.home-header {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid color-mix(in srgb, var(--home-line) 70%, transparent);
  background: color-mix(in srgb, var(--home-bg) 78%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.home-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  max-width: 1160px;
  height: 60px;
  margin: 0 auto;
  padding: 0 24px;
}

.home-brand,
.home-nav-links,
.home-actions,
.home-button,
.home-icon-button,
.home-login-button,
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
  font-weight: 800;
  line-height: 1;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.home-brand:hover .home-brand-mark {
  border-color: var(--home-accent);
  background: var(--home-accent);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(100, 103, 242, 0.4);
  transform: rotate(9deg) scale(1.05);
}

.home-brand-name {
  color: var(--home-text);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.home-nav-links {
  gap: 8px;
  color: var(--home-muted);
  font-size: 14px;
  font-weight: 500;
}

.home-nav-links a,
.home-footer a {
  border-radius: 6px;
  color: inherit;
  padding: 6px 12px;
  text-decoration: none;
  transition: background-color 0.18s ease, color 0.18s ease;
}

.home-nav-links a:hover,
.home-footer a:hover {
  background: var(--home-panel-muted);
  color: var(--home-text);
}

.home-actions { gap: 8px; }

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
  transition: all 0.3s ease;
}

.home-icon-button {
  width: 36px;
  height: 36px;
  background: transparent;
  color: var(--home-muted);
}

.home-login-button {
  min-height: 36px;
  padding: 0 16px;
  background: var(--home-control-bg);
  color: var(--home-text);
  font-size: 14px;
  font-weight: 600;
}

.home-icon-button:hover,
.home-button-secondary:hover,
.home-login-button:hover {
  border-color: var(--home-line-strong);
  background: var(--home-control-hover-bg);
  color: var(--home-text);
}

.home-main {
  max-width: 1160px;
  margin: 0 auto;
  padding: 0 24px;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(400px, 1fr);
  align-items: center;
  gap: 64px;
  padding: 120px 0 80px;
}

.home-hero-copy { max-width: 590px; }

.home-hero-element {
  opacity: 0;
  filter: blur(12px);
  transform: translateY(40px);
  animation: home-reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.home-d-0 { animation-delay: 0s; }
.home-d-1 { animation-delay: 0.1s; }
.home-d-2 { animation-delay: 0.18s; }
.home-d-3 { animation-delay: 0.3s; }
.home-d-4 { animation-delay: 0.44s; }

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
  margin: 0 0 24px;
  background: linear-gradient(to right, var(--home-text) 20%, #a78bfa 50%, var(--home-text) 80%);
  background-clip: text;
  background-size: 200% auto;
  color: transparent;
  font-size: clamp(56px, 8vw, 96px);
  font-weight: 820;
  letter-spacing: -0.075em;
  line-height: 0.92;
  -webkit-background-clip: text;
  animation: home-reveal-up 0.9s 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards, home-text-shine 5s linear infinite;
}

.home-subtitle {
  max-width: 560px;
  margin: 0 0 18px;
  color: var(--home-text);
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 760;
  letter-spacing: -0.045em;
  line-height: 1.12;
}

.home-description {
  max-width: 570px;
  margin: 0;
  color: var(--home-muted);
  font-size: clamp(16px, 1.8vw, 18px);
  line-height: 1.7;
}

.home-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 36px;
}

.home-button {
  position: relative;
  overflow: hidden;
  gap: 9px;
  min-height: 42px;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 700;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
}

.home-button-primary {
  background: var(--home-accent);
  border-color: var(--home-accent);
  color: #ffffff;
  box-shadow: 0 0 15px rgba(100, 103, 242, 0.3);
}

.home-button-primary::before {
  position: absolute;
  top: 0;
  left: -100%;
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  content: '';
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}

.home-button-primary:hover {
  box-shadow: 0 0 0 1px rgba(100, 103, 242, 0.42), 0 12px 28px -10px rgba(100, 103, 242, 0.6);
}

.home-button-primary:hover::before { left: 150%; }

.home-button-secondary {
  background: var(--home-control-bg);
  color: var(--home-text);
  backdrop-filter: blur(10px);
}

.home-hero-visual {
  position: relative;
  perspective: 1000px;
}

.home-code-rise {
  position: relative;
  z-index: 1;
}

.home-code-motion {
  position: relative;
  opacity: 0;
  transform: translateY(96px);
  transform-origin: 50% 65%;
  animation: home-code-card-rise 1.05s 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: opacity, transform;
}

.home-code-motion::before {
  position: absolute;
  inset: -20px;
  z-index: 0;
  background: radial-gradient(circle at 50% 50%, rgba(100, 103, 242, 0.4), transparent 60%);
  content: '';
  filter: blur(40px);
  opacity: 0.6;
}

.home-code-tilt {
  position: relative;
  z-index: 1;
  transform: rotateY(-4deg) rotateX(2deg);
  transition: transform 0.5s ease;
  transform-style: preserve-3d;
}

.home-code-rise:hover .home-code-tilt {
  transform: rotateY(0deg) rotateX(0deg) translateY(-5px);
}

.home-code-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  background: rgba(13, 13, 15, 0.85);
  box-shadow: var(--home-shadow);
  backdrop-filter: blur(20px);
  transition: box-shadow 0.5s ease, border-color 0.5s ease;
}

.home-code-rise:hover .home-code-card {
  border-color: rgba(100, 103, 242, 0.4);
  box-shadow: 0 0 0 1px rgba(100, 103, 242, 0.2) inset, 0 32px 64px -20px rgba(0, 0, 0, 0.9), 0 0 40px -10px rgba(100, 103, 242, 0.25);
}

.home-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.03);
  padding: 14px 18px;
}

.home-code-dots { display: flex; gap: 8px; }
.home-code-dots span { width: 12px; height: 12px; border-radius: 50%; }
.home-code-dots span:nth-child(1) { background: #ef4444; }
.home-code-dots span:nth-child(2) { background: #eab308; }
.home-code-dots span:nth-child(3) { background: #22c55e; }

.home-code-title {
  color: #64748b;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}

.home-code-body {
  overflow-x: auto;
  padding: 24px;
  color: #e2e8f0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13.5px;
  line-height: 1.7;
}

.home-code-line {
  opacity: 0;
  filter: blur(8px);
  transform: translateY(16px);
  animation: home-code-rise 0.62s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.home-code-spacer {
  height: 14px;
}

.home-code-d-2 { animation-delay: 1.08s; }
.home-code-d-3 { animation-delay: 1.18s; }
.home-code-d-4 { animation-delay: 1.28s; }
.home-code-d-5 { animation-delay: 1.38s; }
.home-code-d-6 { animation-delay: 1.48s; }
.home-code-d-7 { animation-delay: 1.58s; }
.home-code-d-8 { animation-delay: 1.7s; }
.home-code-d-9 { animation-delay: 1.8s; }
.home-code-d-10 { animation-delay: 1.9s; }
.home-code-d-11 { animation-delay: 2s; }

.syntax-keyword { color: #c678dd; }
.syntax-string { color: #98c379; }
.syntax-comment { color: #5c6370; font-style: italic; }
.syntax-func { color: #61afef; }

.home-section {
  padding: 80px 0;
}

.home-section-title {
  margin: 0 0 16px;
  color: var(--home-text);
  font-size: clamp(28px, 3.2vw, 36px);
  font-weight: 760;
  letter-spacing: -0.04em;
  line-height: 1.14;
}

.home-section-desc {
  max-width: 640px;
  margin: 0 0 48px;
  color: var(--home-muted);
  font-size: clamp(15px, 1.7vw, 17px);
  line-height: 1.7;
}

.home-section-heading-compact .home-section-desc {
  margin-bottom: 28px;
}

.home-client-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.home-agent-card {
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  border: 1px solid var(--home-line);
  border-radius: 20px;
  background: var(--home-panel);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-agent-card::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--home-card-top-line), transparent);
  content: '';
  opacity: 0;
  transition: opacity 0.3s ease;
}

.home-agent-card:hover {
  border-color: rgba(100, 103, 242, 0.5);
  box-shadow: 0 18px 44px -24px rgba(43, 52, 86, 0.42), 0 0 24px -8px var(--home-accent-glow);
  transform: translateY(-6px);
}

.home-agent-card:hover::before {
  opacity: 1;
}

.home-agent-visual {
  position: relative;
  display: flex;
  overflow: hidden;
  height: 140px;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--home-visual-divider);
  background: #0d0d0f;
}

.home-agent-image {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.home-agent-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.home-agent-visual::after {
  position: absolute;
  width: 60px;
  height: 60px;
  background: var(--home-accent);
  content: '';
  filter: blur(40px);
  opacity: 0.2;
  transition: all 0.5s ease;
}

.home-agent-card:hover .home-agent-visual::after {
  opacity: 0.4;
  transform: scale(1.5);
}

.home-agent-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  background: var(--home-agent-content-bg);
  padding: 24px;
}

.home-agent-content h3 {
  margin: 0 0 10px;
  color: var(--home-text);
  font-size: 19px;
  font-weight: 650;
}

.home-agent-content p {
  flex: 1;
  margin: 0 0 24px;
  color: var(--home-muted);
  font-size: 14px;
  line-height: 1.65;
}

.home-doc-link {
  display: inline-flex;
  align-items: center;
  color: var(--home-muted);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
}

.home-doc-link span {
  margin-left: 4px;
  transition: transform 0.3s ease;
}

.home-agent-card:hover .home-doc-link { color: var(--home-accent-hover); }
.home-agent-card:hover .home-doc-link span { transform: translateX(4px); }

.home-capabilities {
  border-top: 1px solid var(--home-line);
  padding-top: 100px;
}

.home-capability-grid {
  display: grid;
  grid-template-columns: 380px minmax(0, 1fr);
  gap: 80px;
}

.home-model-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.home-model-group {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--home-line);
  border-radius: 14px;
  background: var(--home-model-bg);
  padding: 20px 24px;
  transition: border-color 0.35s ease, background 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
}

.home-model-group::before {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--home-card-top-line), transparent);
  content: '';
  opacity: 0.45;
}

.home-model-group::after {
  position: absolute;
  inset: -40% -20% auto auto;
  width: 180px;
  height: 180px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(100, 103, 242, 0.26), transparent 68%);
  content: '';
  opacity: 0;
  transform: translate3d(24px, -24px, 0) scale(0.78);
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.home-model-group:hover {
  border-color: color-mix(in srgb, var(--home-accent) 34%, var(--home-line));
  background: var(--home-model-hover-bg);
  box-shadow: 0 18px 44px -28px rgba(43, 52, 86, 0.4), 0 0 32px -18px var(--home-accent-glow);
  transform: translateY(-3px);
}

.home-model-group:hover::after {
  opacity: 1;
  transform: translate3d(0, 0, 0) scale(1);
}

.home-model-group h3 {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 12px;
  color: var(--home-text);
  font-size: 15px;
}

.home-model-group p {
  position: relative;
  z-index: 1;
  margin: 0;
  color: var(--home-muted);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 13px;
  line-height: 1.8;
  white-space: pre-line;
}

.home-model-icon {
  display: inline-flex;
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 10px currentColor);
}

.home-model-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.home-model-icon-claude { color: #d97757; }
.home-model-icon-gpt { color: #10a37f; }
.home-model-icon-gemini { color: #4285f4; }

.home-feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 32px;
}

.home-feature-item {
  border-left: 2px solid var(--home-feature-border);
  padding-left: 20px;
  position: relative;
  transition: border-color 0.3s;
}

.home-feature-item::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -2px;
  width: 2px;
  background: linear-gradient(180deg, transparent, var(--home-accent), transparent);
  content: '';
  opacity: 0;
  transform: scaleY(0.35);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.home-feature-item:hover {
  border-color: color-mix(in srgb, var(--home-accent) 32%, var(--home-feature-border));
}

.home-feature-item:hover::before {
  opacity: 1;
  transform: scaleY(1);
}

.home-feature-item h3 {
  margin: 0 0 12px;
  color: var(--home-text);
  font-size: 16px;
}

.home-feature-item p {
  margin: 0;
  color: var(--home-muted);
  font-size: 14px;
  line-height: 1.7;
}

.home-feature-grid .home-feature-item h3 {
  min-height: 22px;
}

.home-community-card {
  position: relative;
  display: grid;
  overflow: hidden;
  grid-column: 2;
  gap: 0;
  margin-top: -2px;
  margin-left: auto;
  border: 1px solid var(--home-line);
  border-radius: 18px;
  background: var(--home-community-bg);
  padding: 20px;
  max-width: 420px;
  box-shadow: 0 18px 42px -28px rgba(43, 52, 86, 0.45);
}

.home-community-card::before {
  position: absolute;
  top: 0;
  right: 24px;
  left: 24px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(100, 103, 242, 0.75), transparent);
  content: '';
}

.home-community-card::after {
  position: absolute;
  right: -56px;
  bottom: -72px;
  width: 180px;
  height: 180px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(100, 103, 242, 0.24), transparent 68%);
  content: '';
}

.home-community-card h3,
.home-community-card p,
.home-community-card span {
  position: relative;
  z-index: 1;
}

.home-community-card h3 {
  margin: 0 0 8px;
  color: var(--home-text);
  font-size: 16px;
}

.home-community-card p {
  margin: 0 0 12px;
  color: var(--home-muted);
  font-size: 14px;
  line-height: 1.7;
}

.home-community-card span {
  display: inline-flex;
  border: 1px dashed var(--home-community-pill-border);
  border-radius: 999px;
  padding: 6px 10px;
  color: var(--home-community-pill-text);
  font-size: 12px;
}

.home-scroll-reveal {
  opacity: 0;
  filter: blur(12px);
  transform: translateY(52px);
  transition: opacity 0.96s cubic-bezier(0.16, 1, 0.3, 1), transform 0.96s cubic-bezier(0.16, 1, 0.3, 1), filter 0.96s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-scroll-reveal.is-visible {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}

.home-scroll-reveal-group .home-group-child {
  opacity: 0;
  filter: blur(12px);
  transform: translateY(52px);
  transition: opacity 0.96s cubic-bezier(0.16, 1, 0.3, 1), transform 0.96s cubic-bezier(0.16, 1, 0.3, 1), filter 0.96s cubic-bezier(0.16, 1, 0.3, 1);
}

.home-scroll-reveal-group.is-visible .home-group-child {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}

.home-scroll-reveal-group.is-visible .home-group-child:nth-child(1) { transition-delay: 0.08s; }
.home-scroll-reveal-group.is-visible .home-group-child:nth-child(2) { transition-delay: 0.2s; }
.home-scroll-reveal-group.is-visible .home-group-child:nth-child(3) { transition-delay: 0.32s; }
.home-scroll-reveal-group.is-visible .home-group-child:nth-child(4) { transition-delay: 0.44s; }
.home-scroll-reveal-group.is-visible .home-group-child:nth-child(5) { transition-delay: 0.56s; }

.home-footer {
  justify-content: center;
  gap: 16px;
  border-top: 1px solid var(--home-line);
  padding: 40px 24px;
  color: var(--home-muted);
  font-size: 14px;
}

@keyframes home-reveal-up {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

@keyframes home-text-shine {
  to { background-position: 200% center; }
}

@keyframes home-code-rise {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

@keyframes home-code-card-rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .home-hero,
  .home-capability-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }

  .home-hero {
    padding: 80px 0 40px;
  }

  .home-client-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .home-code-tilt {
    transform: none;
  }

  .home-code-rise:hover .home-code-tilt {
    transform: translateY(-5px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-shell,
  .home-hero-element,
  .home-title,
  .home-code-motion,
  .home-code-tilt,
  .home-agent-card,
  .home-scroll-reveal,
  .home-scroll-reveal-group .home-group-child {
    animation: none !important;
    transition: none !important;
  }

  .home-hero-element,
  .home-code-motion,
  .home-scroll-reveal,
  .home-scroll-reveal-group .home-group-child {
    opacity: 1;
    filter: none;
    transform: none;
  }
}

@media (max-width: 720px) {
  .home-nav {
    padding: 0 16px;
  }

  .home-nav-links {
    display: none;
  }

  .home-main {
    padding-right: 16px;
    padding-left: 16px;
  }

  .home-hero {
    padding-top: 64px;
  }

  .home-title {
    font-size: clamp(56px, 18vw, 78px);
  }

  .home-client-grid,
  .home-feature-grid {
    grid-template-columns: 1fr;
  }

  .home-hero-actions {
    gap: 12px;
  }

  .home-button {
    flex: 1 1 auto;
  }

  .home-code-body {
    padding: 18px;
    font-size: 12px;
  }

  .home-section,
  .home-capabilities {
    padding: 60px 0;
  }
}
</style>
