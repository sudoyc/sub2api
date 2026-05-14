<template>
  <div v-if="!isDesktopViewport" class="space-y-3">
    <template v-if="isLoadingState">
      <div v-for="i in 5" :key="i" class="arqel-mobile-row rounded-lg border p-4">
        <div class="space-y-3">
            <div v-for="column in dataColumns" :key="column.key" class="flex justify-between">
              <div class="skeleton h-4 w-20"></div>
              <div class="skeleton h-4 w-32"></div>
            </div>
          <div v-if="hasActionsColumn" class="border-t border-[var(--arqel-line)] pt-3">
            <div class="skeleton h-8 w-full"></div>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="!data || data.length === 0">
      <div class="arqel-mobile-row rounded-lg border p-12 text-center">
        <slot name="empty">
          <div class="flex flex-col items-center">
            <Icon
              name="inbox"
              size="xl"
              class="mb-4 h-12 w-12 text-gray-400 dark:text-dark-500"
            />
            <p class="text-lg font-medium text-gray-900 dark:text-gray-100">
              {{ t('empty.noData') }}
            </p>
          </div>
        </slot>
      </div>
    </template>

    <template v-else>
      <div
        v-for="(row, index) in sortedData"
        :key="resolveRowKey(row, index)"
        class="arqel-mobile-row rounded-lg border p-4"
      >
        <div class="space-y-3">
          <div
            v-for="column in dataColumns"
            :key="column.key"
            class="flex items-start justify-between gap-4"
          >
            <span class="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-dark-400">
              {{ column.label }}
            </span>
            <div class="text-right text-sm text-gray-900 dark:text-gray-100">
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]" :expanded="actionsExpanded">
                {{ column.formatter ? column.formatter(row[column.key], row) : row[column.key] }}
              </slot>
            </div>
          </div>
          <div v-if="hasActionsColumn" class="border-t border-[var(--arqel-line)] pt-3">
            <slot name="cell-actions" :row="row" :value="row['actions']" :expanded="actionsExpanded"></slot>
          </div>
        </div>
      </div>
    </template>
  </div>

  <div v-else class="data-table-desktop">
    <div
      ref="tableWrapperRef"
      class="table-wrapper"
      :style="tableWrapperStyle"
      :class="{
        'actions-expanded': actionsExpanded,
        'is-scrollable': isScrollable
      }"
    >
      <table class="w-full min-w-max divide-y divide-[var(--arqel-line)]">
      <thead class="table-header">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="column.key"
            scope="col"
            :class="[
              'sticky-header-cell py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-dark-400',
              getAdaptivePaddingClass(),
              { 'cursor-pointer hover:bg-[var(--arqel-panel-raised)]': column.sortable },
              getStickyColumnClass(column, index),
              column.class
            ]"
            @click="column.sortable && handleSort(column.key)"
          >
            <slot
              :name="`header-${column.key}`"
              :column="column"
              :sort-key="sortKey"
              :sort-order="sortOrder"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable" class="text-gray-400 dark:text-dark-500">
                  <svg
                    v-if="sortKey === column.key"
                    class="h-4 w-4"
                    :class="{ 'rotate-180 transform': sortOrder === 'desc' }"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg v-else class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </span>
              </div>
            </slot>
          </th>
        </tr>
      </thead>
      <tbody class="table-body divide-y divide-[var(--arqel-line)]">
        <!-- Loading skeleton -->
        <tr v-if="isLoadingState" v-for="i in 5" :key="i">
          <td v-for="column in columns" :key="column.key" :class="['whitespace-nowrap py-4', getAdaptivePaddingClass()]">
            <div class="animate-pulse">
              <div class="skeleton h-4 w-3/4"></div>
            </div>
          </td>
        </tr>

        <!-- Data rows (virtual scroll) -->
        <template v-else-if="!isEmptyState">
          <tr v-if="virtualPaddingTop > 0" aria-hidden="true">
            <td :colspan="columns.length"
                :style="{ height: virtualPaddingTop + 'px', padding: 0, border: 'none' }">
            </td>
          </tr>
          <tr
            v-for="virtualRow in virtualItems"
            :key="resolveRowKey(sortedData[virtualRow.index], virtualRow.index)"
            :data-row-id="resolveRowKey(sortedData[virtualRow.index], virtualRow.index)"
            :data-index="virtualRow.index"
            :ref="measureElement"
            class="arqel-table-row"
          >
            <td
              v-for="(column, colIndex) in columns"
              :key="column.key"
              :class="[
                'whitespace-nowrap py-4 text-sm text-gray-900 dark:text-gray-100',
                getAdaptivePaddingClass(),
                getStickyColumnClass(column, colIndex),
                column.class
              ]"
            >
              <slot :name="`cell-${column.key}`"
                    :row="sortedData[virtualRow.index]"
                    :value="sortedData[virtualRow.index][column.key]"
                    :expanded="actionsExpanded">
                {{ column.formatter
                   ? column.formatter(sortedData[virtualRow.index][column.key], sortedData[virtualRow.index])
                   : sortedData[virtualRow.index][column.key] }}
              </slot>
            </td>
          </tr>
          <tr v-if="virtualPaddingBottom > 0" aria-hidden="true">
            <td :colspan="columns.length"
                :style="{ height: virtualPaddingBottom + 'px', padding: 0, border: 'none' }">
            </td>
          </tr>
        </template>
      </tbody>
      </table>
    </div>

    <div v-if="showDesktopEmptyState" class="table-empty-layer" aria-live="polite">
      <div class="table-empty-state">
        <slot name="empty">
          <div class="flex flex-col items-center">
            <Icon
              name="inbox"
              size="xl"
              class="mb-4 h-12 w-12 text-gray-400 dark:text-dark-500"
            />
            <p class="text-lg font-medium text-gray-900 dark:text-gray-100">
              {{ t('empty.noData') }}
            </p>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useVirtualizer } from '@tanstack/vue-virtual'
import { useI18n } from 'vue-i18n'
import type { Column } from './types'
import Icon from '@/components/icons/Icon.vue'

const { t } = useI18n()

const desktopViewportQuery = '(min-width: 768px)'
const isDesktopViewport = ref(
  typeof window === 'undefined' ? true : window.matchMedia(desktopViewportQuery).matches
)

const emit = defineEmits<{
  sort: [key: string, order: 'asc' | 'desc']
}>()

// 表格容器引用
const tableWrapperRef = ref<HTMLElement | null>(null)
const isScrollable = ref(false)

// 检查是否可滚动
const checkScrollable = () => {
  if (tableWrapperRef.value) {
    isScrollable.value = tableWrapperRef.value.scrollWidth > tableWrapperRef.value.clientWidth
  } else {
    isScrollable.value = false
  }
}

// 监听尺寸变化
let resizeObserver: ResizeObserver | null = null
let resizeHandler: (() => void) | null = null
let desktopViewportMediaQuery: MediaQueryList | null = null
let desktopViewportListener: ((event: MediaQueryListEvent) => void) | null = null
let tableMetricsFrame: number | null = null

const cancelScheduledTableMetrics = () => {
  if (tableMetricsFrame !== null && typeof window !== 'undefined') {
    window.cancelAnimationFrame(tableMetricsFrame)
  }
  tableMetricsFrame = null
}

const scheduleTableMetrics = () => {
  if (typeof window === 'undefined') {
    checkScrollable()
    return
  }
  cancelScheduledTableMetrics()
  tableMetricsFrame = window.requestAnimationFrame(() => {
    tableMetricsFrame = null
    checkScrollable()
  })
}

const detachDesktopTableTracking = () => {
  cancelScheduledTableMetrics()
  resizeObserver?.disconnect()
  resizeObserver = null
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
}

const attachDesktopTableTracking = () => {
  scheduleTableMetrics()
  if (tableWrapperRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      scheduleTableMetrics()
    })
    resizeObserver.observe(tableWrapperRef.value)
  } else {
    // 降级方案：不支持 ResizeObserver 时使用 window resize
    resizeHandler = () => {
      scheduleTableMetrics()
    }
    window.addEventListener('resize', resizeHandler)
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    desktopViewportMediaQuery = window.matchMedia(desktopViewportQuery)
    isDesktopViewport.value = desktopViewportMediaQuery.matches
    desktopViewportListener = (event: MediaQueryListEvent) => {
      isDesktopViewport.value = event.matches
    }
    if (typeof desktopViewportMediaQuery.addEventListener === 'function') {
      desktopViewportMediaQuery.addEventListener('change', desktopViewportListener)
    } else {
      desktopViewportMediaQuery.addListener(desktopViewportListener)
    }
  }
})

onUnmounted(() => {
  detachDesktopTableTracking()
  if (desktopViewportMediaQuery && desktopViewportListener) {
    if (typeof desktopViewportMediaQuery.removeEventListener === 'function') {
      desktopViewportMediaQuery.removeEventListener('change', desktopViewportListener)
    } else {
      desktopViewportMediaQuery.removeListener(desktopViewportListener)
    }
    desktopViewportListener = null
  }
  desktopViewportMediaQuery = null
})

interface Props {
  columns: Column[]
  data: any[]
  loading?: boolean
  initialLoading?: boolean
  stickyFirstColumn?: boolean
  stickyActionsColumn?: boolean
  expandableActions?: boolean
  actionsCount?: number // 操作按钮总数，用于判断是否需要展开功能
  rowKey?: string | ((row: any) => string | number)
  /**
   * Default sort configuration (only applied when there is no persisted sort state)
   */
  defaultSortKey?: string
  defaultSortOrder?: 'asc' | 'desc'
  /**
   * Persist sort state (key + order) to localStorage using this key.
   * If provided, DataTable will load the stored sort state on mount.
   */
  sortStorageKey?: string
  /**
   * Enable server-side sorting mode. When true, clicking sort headers
   * will emit 'sort' events instead of performing client-side sorting.
   */
  serverSideSort?: boolean
  /** Estimated row height in px for the virtualizer (default 56) */
  estimateRowHeight?: number
  /** Number of rows to render beyond the visible area (default 5) */
  overscan?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  initialLoading: false,
  stickyFirstColumn: true,
  stickyActionsColumn: true,
  expandableActions: true,
  defaultSortOrder: 'asc',
  serverSideSort: false
})

const actionsExpanded = computed(() => props.expandableActions && (props.actionsCount ?? 0) > 4)

const sortKey = ref<string>('')
const sortOrder = ref<'asc' | 'desc'>('asc')
type PersistedSortState = {
  key: string
  order: 'asc' | 'desc'
}

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base'
})

const getSortableKeys = () => {
  const keys = new Set<string>()
  for (const col of props.columns) {
    if (col.sortable) keys.add(col.key)
  }
  return keys
}

const normalizeSortKey = (candidate: string) => {
  if (!candidate) return ''
  const sortableKeys = getSortableKeys()
  return sortableKeys.has(candidate) ? candidate : ''
}

const normalizeSortOrder = (candidate: any): 'asc' | 'desc' => {
  return candidate === 'desc' ? 'desc' : 'asc'
}

const readPersistedSortState = (): PersistedSortState | null => {
  if (!props.sortStorageKey) return null
  try {
    const raw = localStorage.getItem(props.sortStorageKey)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<PersistedSortState>
    const key = normalizeSortKey(typeof parsed.key === 'string' ? parsed.key : '')
    if (!key) return null
    return { key, order: normalizeSortOrder(parsed.order) }
  } catch (e) {
    console.error('[DataTable] Failed to read persisted sort state:', e)
    return null
  }
}

const writePersistedSortState = (state: PersistedSortState) => {
  if (!props.sortStorageKey) return
  try {
    localStorage.setItem(props.sortStorageKey, JSON.stringify(state))
  } catch (e) {
    console.error('[DataTable] Failed to persist sort state:', e)
  }
}

const resolveInitialSortState = (): PersistedSortState | null => {
  const persisted = readPersistedSortState()
  if (persisted) return persisted

  const key = normalizeSortKey(props.defaultSortKey || '')
  if (!key) return null
  return { key, order: normalizeSortOrder(props.defaultSortOrder) }
}

const applySortState = (state: PersistedSortState | null) => {
  if (!state) return
  sortKey.value = state.key
  sortOrder.value = state.order
}

const isNullishOrEmpty = (value: any) => value === null || value === undefined || value === ''

const toFiniteNumberOrNull = (value: any): number | null => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : null
  if (typeof value === 'boolean') return value ? 1 : 0
  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) return null
    const n = Number(trimmed)
    return Number.isFinite(n) ? n : null
  }
  return null
}

const toSortableString = (value: any): string => {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (value instanceof Date) return value.toISOString()
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

const compareSortValues = (a: any, b: any): number => {
  const aEmpty = isNullishOrEmpty(a)
  const bEmpty = isNullishOrEmpty(b)
  if (aEmpty && bEmpty) return 0
  if (aEmpty) return 1
  if (bEmpty) return -1

  const aNum = toFiniteNumberOrNull(a)
  const bNum = toFiniteNumberOrNull(b)
  if (aNum !== null && bNum !== null) {
    if (aNum === bNum) return 0
    return aNum < bNum ? -1 : 1
  }

  const aStr = toSortableString(a)
  const bStr = toSortableString(b)
  const res = collator.compare(aStr, bStr)
  if (res === 0) return 0
  return res < 0 ? -1 : 1
}
const resolveRowKey = (row: any, index: number) => {
  if (typeof props.rowKey === 'function') {
    const key = props.rowKey(row)
    return key ?? index
  }
  if (typeof props.rowKey === 'string' && props.rowKey) {
    const key = row?.[props.rowKey]
    return key ?? index
  }
  const key = row?.id
  return key ?? index
}

const dataColumns = computed(() => props.columns.filter((column) => column.key !== 'actions'))
const isLoadingState = computed(() => props.loading || props.initialLoading)
const isEmptyState = computed(() => !props.data || props.data.length === 0)
const showDesktopEmptyState = computed(() => !isLoadingState.value && isEmptyState.value)
const tableWrapperStyle = computed(() => {
  const actionsCount = props.actionsCount ?? 3
  const width = Math.min(Math.max(actionsCount * 2.5, 8), 18)
  return { '--actions-col-width': `${width}rem` }
})
const columnsSignature = computed(() =>
  props.columns.map((column) => `${column.key}:${column.sortable ? '1' : '0'}`).join('|')
)

watch(
  isDesktopViewport,
  async (isDesktop) => {
    detachDesktopTableTracking()
    if (!isDesktop) return
    await nextTick()
    attachDesktopTableTracking()
  },
  { immediate: true, flush: 'post' }
)

// 数据/列变化时重新检查滚动状态
watch(
  [() => props.data.length, columnsSignature],
  async () => {
    await nextTick()
    scheduleTableMetrics()
  },
  { flush: 'post' }
)

const handleSort = (key: string) => {
  let newOrder: 'asc' | 'desc' = 'asc'
  if (sortKey.value === key) {
    newOrder = sortOrder.value === 'asc' ? 'desc' : 'asc'
  }

  if (props.serverSideSort) {
    // Server-side sort mode: emit event and update internal state for UI feedback
    sortKey.value = key
    sortOrder.value = newOrder
    emit('sort', key, newOrder)
  } else {
    // Client-side sort mode: just update internal state
    sortKey.value = key
    sortOrder.value = newOrder
  }
}

const sortedData = computed(() => {
  // Server-side sort mode: return data as-is (server handles sorting)
  if (props.serverSideSort || !sortKey.value || !props.data) return props.data

  const key = sortKey.value
  const order = sortOrder.value

  // Stable sort (tie-break with original index) to avoid jitter when values are equal.
  return props.data
    .map((row, index) => ({ row, index }))
    .sort((a, b) => {
      const cmp = compareSortValues(a.row?.[key], b.row?.[key])
      if (cmp !== 0) return order === 'asc' ? cmp : -cmp
      return a.index - b.index
    })
    .map(item => item.row)
})

// --- Virtual scrolling ---
const rowVirtualizer = useVirtualizer(computed(() => ({
  count: isDesktopViewport.value ? (sortedData.value?.length ?? 0) : 0,
  getScrollElement: () => tableWrapperRef.value,
  estimateSize: () => props.estimateRowHeight ?? 56,
  overscan: props.overscan ?? 5,
})))

const virtualItems = computed(() => rowVirtualizer.value.getVirtualItems())

const virtualPaddingTop = computed(() => {
  const items = virtualItems.value
  return items.length > 0 ? items[0].start : 0
})

const virtualPaddingBottom = computed(() => {
  const items = virtualItems.value
  if (items.length === 0) return 0
  return rowVirtualizer.value.getTotalSize() - items[items.length - 1].end
})

const measureElement = (el: any) => {
  if (el) {
    rowVirtualizer.value.measureElement(el as Element)
  }
}

const hasActionsColumn = computed(() => {
  return props.columns.some(column => column.key === 'actions')
})

const hasSelectColumn = computed(() => {
  return props.columns.length > 0 && props.columns[0].key === 'select'
})

// 生成固定列的 CSS 类
const getStickyColumnClass = (column: Column, index: number) => {
  const classes: string[] = []

  if (props.stickyFirstColumn) {
    // 如果第一列是勾选列，固定前两列（勾选+名称）
    if (hasSelectColumn.value) {
      if (index === 0) {
        classes.push('sticky-col sticky-col-left-first')
      } else if (index === 1) {
        classes.push('sticky-col sticky-col-left-second')
      }
    } else {
      // 否则只固定第一列
      if (index === 0) {
        classes.push('sticky-col sticky-col-left')
      }
    }
  }

  // 操作列固定（最后一列）
  if (props.stickyActionsColumn && column.key === 'actions') {
    classes.push('sticky-col sticky-col-right')
  }

  return classes.join(' ')
}

// 根据列数自适应调整内边距
const getAdaptivePaddingClass = () => {
  const columnCount = props.columns.length

  // 列数越多，内边距越小
  if (columnCount >= 10) {
    return 'px-2' // 8px
  } else if (columnCount >= 7) {
    return 'px-3' // 12px
  } else if (columnCount >= 5) {
    return 'px-4' // 16px
  } else {
    return 'px-6' // 24px (原始值)
  }
}

// Init + keep persisted sort state consistent with current columns
const didInitSort = ref(false)

onMounted(() => {
  const initial = resolveInitialSortState()
  applySortState(initial)
  didInitSort.value = true
})

watch(
  columnsSignature,
  () => {
    // If current sort key is no longer sortable/visible, fall back to default/persisted.
    const normalized = normalizeSortKey(sortKey.value)
    if (!sortKey.value) {
      const initial = resolveInitialSortState()
      applySortState(initial)
      return
    }

    if (!normalized) {
      const fallback = resolveInitialSortState()
      if (fallback) {
        applySortState(fallback)
      } else {
        sortKey.value = ''
        sortOrder.value = 'asc'
      }
    }
  },
  { flush: 'post' }
)

watch(
  [sortKey, sortOrder],
  ([nextKey, nextOrder]) => {
    if (!didInitSort.value) return
    if (!props.sortStorageKey) return
    const key = normalizeSortKey(nextKey)
    if (!key) return
    writePersistedSortState({ key, order: normalizeSortOrder(nextOrder) })
  },
  { flush: 'post' }
)

defineExpose({
  virtualizer: rowVirtualizer,
  sortedData,
  resolveRowKey,
  tableWrapperEl: tableWrapperRef,
})
</script>

<style scoped>
.data-table-desktop {
  position: relative;
  display: flex;
  flex: 1;
  min-height: 0;
  background: var(--arqel-panel);
}

/* 表格横向滚动 */
.table-wrapper {
  --select-col-width: 52px; /* 勾选列宽度：px-6 (24px*2) + checkbox (16px) */
  position: relative;
  overflow-x: auto;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  isolation: isolate;
  background: var(--arqel-panel);
}

/* 表头容器，确保在滚动时覆盖表体内容 */
.table-wrapper .table-header {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--arqel-panel-muted);
}

/* 表体保持在表头下方 */
.table-body {
  position: relative;
  z-index: 0;
}

.table-empty-layer {
  position: absolute;
  inset: 3.25rem 0 0 0;
  z-index: 30;
  display: flex;
  min-height: 14rem;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
  pointer-events: none;
}

.table-empty-state {
  max-width: min(28rem, calc(100% - 3rem));
  margin-inline: auto;
  pointer-events: auto;
}

/* 所有表头单元格固定在顶部 */
.sticky-header-cell {
  position: sticky;
  top: 0;
  z-index: 210; /* 必须高于所有表体内容 */
  background: var(--arqel-panel-muted);
}

/* Sticky 列基础样式 */
.sticky-col {
  position: sticky;
  z-index: 20; /* 表体固定列 */
}

/* 单列固定（无勾选列时） */
.sticky-col-left {
  left: 0;
}

/* 双列固定（有勾选列时）：第一列（勾选） */
.sticky-col-left-first {
  left: 0;
}

/* 双列固定（有勾选列时）：第二列（名称） */
.sticky-col-left-second {
  left: var(--select-col-width);
}

/* 操作列固定 */
.sticky-col-right {
  right: 0;
  min-width: var(--actions-col-width, 8rem);
}

.actions-expanded .sticky-col-right {
  min-width: var(--actions-col-width, 12rem);
}

/* 表头 sticky 列 - 需要比普通表头单元格更高的 z-index */
.sticky-header-cell.sticky-col {
  z-index: 220; /* 高于普通表头单元格和表体固定列 */
}

/* 表体 sticky 列背景 */
tbody .sticky-col,
.arqel-mobile-row {
  background: var(--arqel-panel);
  border-color: var(--arqel-line);
}

.arqel-table-row {
  background: var(--arqel-panel);
  transition: background-color 0.15s ease;
}

/* hover 状态保持 */
.arqel-table-row:hover,
tbody tr:hover .sticky-col {
  background: color-mix(in srgb, var(--arqel-panel-muted) 78%, var(--arqel-accent-softer));
}

/* 阴影只在可滚动时显示 */
/* 单列固定右侧阴影 */
.is-scrollable .sticky-col-left::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 10px;
  transform: translateX(100%);
  background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
  pointer-events: none;
}

/* 双列固定：只在第二列显示阴影 */
.is-scrollable .sticky-col-left-second::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 10px;
  transform: translateX(100%);
  background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
  pointer-events: none;
}

/* 操作列左侧阴影 */
.is-scrollable .sticky-col-right::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 10px;
  transform: translateX(-100%);
  background: linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent);
  pointer-events: none;
}

/* 暗色模式阴影 */
.dark .is-scrollable .sticky-col-left::after,
.dark .is-scrollable .sticky-col-left-second::after {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.2), transparent);
}

.dark .is-scrollable .sticky-col-right::before {
  background: linear-gradient(to left, rgba(0, 0, 0, 0.2), transparent);
}
</style>

<style>
/* Keep wide tables discoverable by showing a persistent horizontal scrollbar. */
.table-wrapper {
  scrollbar-width: auto !important;
}

.table-wrapper::-webkit-scrollbar {
  height: 12px !important;
  width: 12px !important;
  display: block !important;
  background-color: transparent !important;
}

.table-wrapper::-webkit-scrollbar-track {
  background-color: color-mix(in srgb, var(--arqel-line) 40%, transparent) !important;
  border-radius: 6px !important;
  margin: 0 4px !important;
}
.dark .table-wrapper::-webkit-scrollbar-track {
  background-color: color-mix(in srgb, var(--arqel-line) 55%, transparent) !important;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background-color: color-mix(in srgb, var(--arqel-muted) 72%, transparent) !important;
  border-radius: 6px !important;
  border: 2px solid transparent !important;
  background-clip: padding-box !important;
  -webkit-appearance: none !important;
}
.table-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: color-mix(in srgb, var(--arqel-muted) 88%, transparent) !important;
}

.dark .table-wrapper::-webkit-scrollbar-thumb {
  background-color: color-mix(in srgb, var(--arqel-muted) 76%, transparent) !important;
}
.dark .table-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: color-mix(in srgb, var(--arqel-muted) 92%, transparent) !important;
}

@supports (-moz-appearance:none) {
  .table-wrapper {
    scrollbar-width: thin !important;
    scrollbar-color: var(--arqel-muted) color-mix(in srgb, var(--arqel-line) 40%, transparent) !important;
  }
  .dark .table-wrapper {
    scrollbar-color: var(--arqel-muted) color-mix(in srgb, var(--arqel-line) 55%, transparent) !important;
  }
}
</style>
