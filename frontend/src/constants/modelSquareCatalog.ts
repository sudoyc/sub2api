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

export const MODEL_SQUARE_MODELS: ModelSquareModel[] = [
  { name: 'gpt-5.5', provider: 'openai', family: 'GPT-5.5', mode: 'reasoning', contextWindow: 1050000, maxOutputTokens: 128000, capabilities: openaiCaps },
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
