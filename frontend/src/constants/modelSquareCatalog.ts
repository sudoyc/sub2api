export interface ModelSquareModel {
  name: string
  provider: 'openai' | 'anthropic' | 'gemini'
  family: string
  mode: 'chat' | 'reasoning' | 'coding' | 'image'
  contextWindow?: number
  maxOutputTokens?: number
  aliases?: string[]
  note?: string
  capabilities: Array<'vision' | 'tools' | 'cache' | 'search' | 'schema' | 'coding'>
}

const openaiCaps: ModelSquareModel['capabilities'] = ['vision', 'tools', 'cache', 'search', 'schema', 'coding']
const anthropicCaps: ModelSquareModel['capabilities'] = ['vision', 'tools', 'cache', 'search', 'schema', 'coding']

export const MODEL_SQUARE_MODELS: ModelSquareModel[] = [
  {
    name: 'claude-opus-4-7',
    provider: 'anthropic',
    family: 'Claude Opus 4.7',
    mode: 'reasoning',
    contextWindow: 1000000,
    maxOutputTokens: 128000,
    note: '当前 key 已返回该模型，但实测调用返回 502，暂不视为稳定可用。',
    capabilities: anthropicCaps,
  },
  {
    name: 'claude-opus-4-6',
    provider: 'anthropic',
    family: 'Claude Opus 4.6',
    mode: 'reasoning',
    contextWindow: 1000000,
    maxOutputTokens: 128000,
    note: '当前 key 实测可调用。',
    capabilities: anthropicCaps,
  },
  {
    name: 'claude-sonnet-4-6',
    provider: 'anthropic',
    family: 'Claude Sonnet 4.6',
    mode: 'reasoning',
    contextWindow: 1000000,
    maxOutputTokens: 64000,
    note: '当前 key 已返回该模型，但实测调用返回 503（可用账号耗尽）。',
    capabilities: anthropicCaps,
  },
  {
    name: 'claude-haiku-4-5-20251001',
    provider: 'anthropic',
    family: 'Claude Haiku 4.5',
    mode: 'chat',
    contextWindow: 200000,
    maxOutputTokens: 64000,
    aliases: ['claude-haiku-4-5'],
    note: '当前 key 实际返回的是 Haiku 4.5；实测调用返回 503（可用账号耗尽）。',
    capabilities: anthropicCaps,
  },
  {
    name: 'gpt-5.5',
    provider: 'openai',
    family: 'GPT-5.5',
    mode: 'reasoning',
    maxOutputTokens: 128000,
    note: '不按百万上下文展示；上下文能力以当前账号/渠道实际规格为准。',
    capabilities: openaiCaps,
  },
  { name: 'gpt-5.4', provider: 'openai', family: 'GPT-5.4', mode: 'reasoning', contextWindow: 1050000, maxOutputTokens: 128000, aliases: ['gpt-5.4-2026-03-05'], capabilities: openaiCaps },
  { name: 'gpt-5.4-mini', provider: 'openai', family: 'GPT-5.4 Mini', mode: 'coding', contextWindow: 400000, maxOutputTokens: 128000, capabilities: openaiCaps },
  {
    name: 'gpt-5.3-codex',
    provider: 'openai',
    family: 'GPT-5.3 Codex',
    mode: 'coding',
    contextWindow: 272000,
    maxOutputTokens: 128000,
    aliases: ['gpt-5.3'],
    capabilities: ['tools', 'cache', 'coding'],
  },
  {
    name: 'gpt-5.2',
    provider: 'openai',
    family: 'GPT-5.2',
    mode: 'reasoning',
    contextWindow: 272000,
    maxOutputTokens: 128000,
    aliases: ['gpt-5.2-2025-12-11', 'gpt-5.2-chat-latest'],
    capabilities: openaiCaps,
  },
  {
    name: 'gpt-5.2-pro',
    provider: 'openai',
    family: 'GPT-5.2 Pro',
    mode: 'reasoning',
    contextWindow: 272000,
    maxOutputTokens: 128000,
    aliases: ['gpt-5.2-pro-2025-12-11'],
    capabilities: openaiCaps,
  },
]
