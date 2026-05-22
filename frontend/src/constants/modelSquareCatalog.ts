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
    capabilities: anthropicCaps,
  },
  {
    name: 'claude-opus-4-6',
    provider: 'anthropic',
    family: 'Claude Opus 4.6',
    mode: 'reasoning',
    contextWindow: 1000000,
    maxOutputTokens: 128000,
    capabilities: anthropicCaps,
  },
  {
    name: 'claude-sonnet-4-6',
    provider: 'anthropic',
    family: 'Claude Sonnet 4.6',
    mode: 'reasoning',
    contextWindow: 200000,
    maxOutputTokens: 64000,
    capabilities: anthropicCaps,
  },
  {
    name: 'claude-haiku-4-6',
    provider: 'anthropic',
    family: 'Claude Haiku 4.6',
    mode: 'chat',
    capabilities: anthropicCaps,
  },
  { name: 'gpt-5.5', provider: 'openai', family: 'GPT-5.5', mode: 'reasoning', contextWindow: 1050000, maxOutputTokens: 128000, capabilities: openaiCaps },
  { name: 'gpt-5.4', provider: 'openai', family: 'GPT-5.4', mode: 'reasoning', contextWindow: 1050000, maxOutputTokens: 128000, capabilities: openaiCaps },
  { name: 'gpt-5.4-mini', provider: 'openai', family: 'GPT-5.4 Mini', mode: 'coding', contextWindow: 400000, maxOutputTokens: 128000, capabilities: openaiCaps },
  {
    name: 'gpt-5.3-codex',
    provider: 'openai',
    family: 'Codex',
    mode: 'coding',
    contextWindow: 272000,
    maxOutputTokens: 128000,
    aliases: ['gpt-5.3'],
    capabilities: ['tools', 'cache', 'coding'],
  },
  { name: 'gpt-5.2', provider: 'openai', family: 'GPT-5.2', mode: 'reasoning', contextWindow: 272000, maxOutputTokens: 128000, capabilities: openaiCaps },
]
