<template>
  <AppLayout>
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-5">
      <section class="rounded-lg border border-[var(--arqel-line)] bg-[var(--arqel-panel)] p-5">
        <div class="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div class="min-w-0">
            <div class="mb-2 flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                <Icon name="dollar" size="xs" />
                官方费率
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">单位：USD / 1M tokens</span>
            </div>
            <h1 class="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">模型广场</h1>
            <p class="mt-2 max-w-3xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              仅展示当前提供的模型和后端解析到的官方基准费率。实际扣费 = token 用量按对应费率计价后，再乘分组/用户倍率；渠道自定义定价、priority/flex、长上下文和区间计费按后端 BillingService 规则处理。
            </p>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:w-[560px]">
            <StatCell label="提供模型" :value="String(models.length)" />
            <StatCell label="供应商" :value="String(providers.length)" />
            <StatCell label="计价单位" value="USD / 1M" />
            <StatCell label="可计价" :value="String(pricedCount)" />
          </div>
        </div>
      </section>

      <section class="rounded-lg border border-[var(--arqel-line)] bg-[var(--arqel-panel)] p-4">
        <div class="grid gap-3 xl:grid-cols-[minmax(260px,1fr)_190px_170px_120px] xl:items-center">
          <div class="relative">
            <Icon
              name="search"
              size="md"
              class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
            <input
              v-model="searchQuery"
              type="text"
              class="input pl-10"
              placeholder="搜索模型、供应商或模式"
            />
          </div>

          <select v-model="providerFilter" class="input">
            <option value="">全部供应商</option>
            <option v-for="provider in providers" :key="provider" :value="provider">
              {{ providerLabel(provider) }}
            </option>
          </select>

          <select v-model="modeFilter" class="input">
            <option value="">全部模式</option>
            <option v-for="mode in modes" :key="mode" :value="mode">
              {{ mode }}
            </option>
          </select>

          <button class="btn btn-secondary justify-center" :disabled="loading" @click="loadPricing">
            <Icon name="refresh" size="md" :class="loading ? 'animate-spin' : ''" />
            刷新
          </button>
        </div>
      </section>

      <div
        v-if="pricingError"
        class="rounded-lg border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300"
      >
        {{ pricingError }}
      </div>

      <section class="min-h-[360px]">
        <div v-if="loading" class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="idx in 9"
            :key="idx"
            class="h-64 animate-pulse rounded-lg border border-[var(--arqel-line)] bg-[var(--arqel-panel)]"
          />
        </div>

        <div
          v-else-if="filteredModels.length === 0"
          class="rounded-lg border border-dashed border-[var(--arqel-line)] bg-[var(--arqel-panel)] px-6 py-16 text-center"
        >
          <Icon name="inbox" size="xl" class="mx-auto mb-3 text-gray-400" />
          <p class="text-sm text-gray-500 dark:text-gray-400">没有匹配的模型</p>
        </div>

        <div v-else class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="model in filteredModels"
            :key="model.name"
            class="flex min-h-[280px] flex-col rounded-lg border border-[var(--arqel-line)] bg-[var(--arqel-panel)] p-4 transition-colors hover:border-primary-300/70 dark:hover:border-primary-500/40"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="mb-2 flex flex-wrap items-center gap-2">
                  <span
                    :class="[
                      'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium uppercase',
                      platformBadgeClass(model.provider)
                    ]"
                  >
                    <PlatformIcon :platform="model.provider as GroupPlatform" size="xs" />
                    {{ providerLabel(model.provider) }}
                  </span>
                  <span class="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-dark-700 dark:text-gray-300">
                    {{ modeLabel(model.mode) }}
                  </span>
                </div>
                <h2 class="break-words text-sm font-semibold leading-5 text-gray-900 dark:text-white">
                  {{ model.name }}
                </h2>
                <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ model.family }}</div>
              </div>
            </div>

            <div v-if="model.aliases?.length || model.note" class="mt-3 space-y-2">
              <div v-if="model.aliases?.length" class="flex flex-wrap gap-1.5">
                <span
                  v-for="alias in model.aliases.slice(0, 3)"
                  :key="alias"
                  class="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-dark-700 dark:text-gray-300"
                >
                  {{ alias }}
                </span>
                <span
                  v-if="model.aliases.length > 3"
                  class="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:bg-dark-700 dark:text-gray-300"
                >
                  +{{ model.aliases.length - 3 }}
                </span>
              </div>
              <p v-if="model.note" class="text-xs leading-5 text-amber-700 dark:text-amber-300">
                {{ model.note }}
              </p>
            </div>

            <div class="mt-4 rounded-lg border border-[var(--arqel-line)]">
              <div class="grid grid-cols-[1fr_1fr] border-b border-[var(--arqel-line)] bg-[var(--arqel-panel-muted)] px-3 py-2 text-[11px] font-medium uppercase text-gray-500 dark:text-gray-400">
                <span>项目</span>
                <span class="text-right">官方费率</span>
              </div>
              <template v-if="modelPricing(model)?.found">
              <PriceRow
                label="输入 / 1M"
                :value="perMTok(modelPricing(model)?.input_price)"
              />
              <PriceRow
                label="输出 / 1M"
                :value="perMTok(modelPricing(model)?.output_price)"
              />
              <PriceRow
                v-if="modelPricing(model)?.cache_read_price"
                label="缓存读 / 1M"
                :value="perMTok(modelPricing(model)?.cache_read_price)"
              />
              <PriceRow
                v-if="modelPricing(model)?.cache_write_price"
                label="缓存写 / 1M"
                :value="perMTok(modelPricing(model)?.cache_write_price)"
              />
              <PriceRow
                v-if="modelPricing(model)?.image_output_price"
                label="图片输出 / 1M"
                :value="perMTok(modelPricing(model)?.image_output_price)"
              />
              </template>
              <div v-else class="px-3 py-6 text-center text-xs text-gray-500 dark:text-gray-400">
                后端没有返回可用官方费率
              </div>
            </div>

            <div class="mt-4 flex items-center justify-between gap-3 text-xs">
              <span class="text-gray-500 dark:text-gray-400">上下文</span>
              <span class="font-medium text-gray-700 dark:text-gray-200">{{ formatContext(model) }}</span>
            </div>

            <div class="mt-auto pt-4">
              <div class="flex flex-wrap gap-1.5">
                <CapabilityBadge v-for="capability in model.capabilities" :key="capability" :label="capabilityLabel(capability)" />
              </div>
              <div class="mt-3 text-xs text-gray-500 dark:text-gray-400">费率来自 BillingService 当前解析结果</div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import Icon from '@/components/icons/Icon.vue'
import PlatformIcon from '@/components/common/PlatformIcon.vue'
import modelPricingAPI from '@/api/modelPricing'
import type { UserModelPricing } from '@/api/modelPricing'
import { useAppStore } from '@/stores/app'
import { extractApiErrorMessage } from '@/utils/apiError'
import { platformBadgeClass } from '@/utils/platformColors'
import { MODEL_SQUARE_MODELS, type ModelSquareModel } from '@/constants/modelSquareCatalog'
import type { GroupPlatform } from '@/types'

const appStore = useAppStore()

const models = MODEL_SQUARE_MODELS
const pricingByModel = ref<Record<string, UserModelPricing>>({})
const loading = ref(false)
const pricingError = ref('')
const searchQuery = ref('')
const providerFilter = ref('')
const modeFilter = ref('')

const StatCell = defineComponent({
  props: {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h('div', { class: 'rounded-lg border border-[var(--arqel-line)] bg-[var(--arqel-panel-muted)] px-3 py-2' }, [
        h('div', { class: 'text-xs text-gray-500 dark:text-gray-400' }, props.label),
        h('div', { class: 'mt-1 text-lg font-semibold text-gray-900 dark:text-white' }, props.value),
      ])
  },
})

const PriceRow = defineComponent({
  props: {
    label: { type: String, required: true },
    value: { type: Number as PropType<number | null>, default: null },
  },
  setup(props) {
    const money = (value: number | null) => formatMoney(value)
    return () =>
      h('div', { class: 'grid grid-cols-[1fr_1fr] border-b border-[var(--arqel-line)] px-3 py-2 text-xs last:border-b-0' }, [
        h('span', { class: 'text-gray-500 dark:text-gray-400' }, props.label),
        h('span', { class: 'text-right font-semibold text-gray-900 dark:text-white' }, money(props.value)),
      ])
  },
})

const CapabilityBadge = defineComponent({
  props: {
    label: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h(
        'span',
        { class: 'rounded-md bg-primary-500/10 px-2 py-0.5 text-[11px] font-medium text-primary-700 dark:text-primary-300' },
        props.label,
      )
  },
})

const providers = computed(() => {
  return [...new Set(models.map((m) => m.provider))].sort((a, b) => a.localeCompare(b))
})

const modes = computed(() => {
  return [...new Set(models.map((m) => m.mode))].sort((a, b) => a.localeCompare(b))
})

const pricedCount = computed(() => models.filter((model) => pricingByModel.value[model.name]?.found).length)

const filteredModels = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const provider = providerFilter.value
  const mode = modeFilter.value
  return models
    .filter((model) => {
      if (provider && model.provider !== provider) return false
      if (mode && model.mode !== mode) return false
      if (!q) return true
      return (
        model.name.toLowerCase().includes(q) ||
        model.provider.toLowerCase().includes(q) ||
        model.family.toLowerCase().includes(q) ||
        model.mode.toLowerCase().includes(q) ||
        Boolean(model.note?.toLowerCase().includes(q)) ||
        Boolean(model.aliases?.some((alias) => alias.toLowerCase().includes(q)))
      )
    })
    .sort((a, b) => {
      if (a.provider !== b.provider) return a.provider.localeCompare(b.provider)
      return a.name.localeCompare(b.name)
    })
})

function modelPricing(model: ModelSquareModel): UserModelPricing | undefined {
  return pricingByModel.value[model.name]
}

function perMTok(pricePerToken?: number | null): number | null {
  return typeof pricePerToken === 'number' && pricePerToken > 0 ? pricePerToken * 1000000 : null
}

function formatMoney(value: number | null): string {
  if (!value || value <= 0) return '-'
  const formatted = value >= 1 ? value.toFixed(2) : value.toPrecision(2)
  return `$${formatted}`
}

function formatContext(model: ModelSquareModel): string {
  const input = model.contextWindow
  const output = model.maxOutputTokens
  if (!input && !output) return '-'
  if (input && output) return `${formatCompactNumber(input)} in / ${formatCompactNumber(output)} out`
  if (input) return formatCompactNumber(input)
  return `${formatCompactNumber(output || 0)} out`
}

function formatCompactNumber(value: number): string {
  return Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

function capabilityLabel(capability: ModelSquareModel['capabilities'][number]): string {
  const labels: Record<ModelSquareModel['capabilities'][number], string> = {
    vision: 'Vision',
    tools: 'Tools',
    cache: 'Cache',
    search: 'Search',
    schema: 'Schema',
    coding: 'Coding',
  }
  return labels[capability]
}

function providerLabel(provider: ModelSquareModel['provider']): string {
  const labels: Record<ModelSquareModel['provider'], string> = {
    anthropic: 'Claude',
    openai: 'OpenAI',
    gemini: 'Gemini',
  }
  return labels[provider]
}

function modeLabel(mode: ModelSquareModel['mode']): string {
  const labels: Record<ModelSquareModel['mode'], string> = {
    chat: 'Chat',
    reasoning: 'Reasoning',
    coding: 'Coding',
    image: 'Image',
  }
  return labels[mode]
}

async function loadPricing() {
  loading.value = true
  pricingError.value = ''
  try {
    const pricing = await modelPricingAPI.getModelPricing(models.map((model) => model.name))
    pricingByModel.value = pricing
  } catch (err: unknown) {
    const message = extractApiErrorMessage(err, '加载官方费率失败')
    pricingByModel.value = {}
    pricingError.value = message
    appStore.showError(message)
  } finally {
    loading.value = false
  }
}

onMounted(loadPricing)
</script>
