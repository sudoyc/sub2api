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
const geminiCaps: ModelSquareModel['capabilities'] = ['vision', 'tools', 'cache', 'search', 'schema']

export const MODEL_SQUARE_MODELS: ModelSquareModel[] = [
  { name: 'gpt-5.5', provider: 'openai', family: 'GPT-5.5', mode: 'reasoning', contextWindow: 1050000, maxOutputTokens: 128000, capabilities: openaiCaps },
  { name: 'gpt-5.4', provider: 'openai', family: 'GPT-5.4', mode: 'reasoning', contextWindow: 1050000, capabilities: openaiCaps },
  { name: 'gpt-5.4-mini', provider: 'openai', family: 'GPT-5.4', mode: 'coding', contextWindow: 400000, capabilities: openaiCaps },
  {
    name: 'gpt-5.3-codex',
    provider: 'openai',
    family: 'Codex',
    mode: 'coding',
    contextWindow: 272000,
    aliases: ['gpt-5.3', 'gpt-5.3-codex-low', 'gpt-5.3-codex-medium', 'gpt-5.3-codex-high', 'gpt-5.3-codex-xhigh'],
    capabilities: ['tools', 'cache', 'coding'],
  },
  { name: 'gpt-5.2', provider: 'openai', family: 'GPT-5.2', mode: 'reasoning', contextWindow: 272000, capabilities: openaiCaps },
  { name: 'gpt-5', provider: 'openai', family: 'GPT-5', mode: 'reasoning', capabilities: openaiCaps },
  { name: 'gpt-5-mini', provider: 'openai', family: 'GPT-5', mode: 'chat', capabilities: ['tools', 'cache', 'schema'] },
  { name: 'gpt-4.1', provider: 'openai', family: 'GPT-4.1', mode: 'chat', contextWindow: 1047576, capabilities: openaiCaps },
  { name: 'gpt-4.1-mini', provider: 'openai', family: 'GPT-4.1', mode: 'chat', contextWindow: 1047576, capabilities: openaiCaps },
  { name: 'gpt-4o', provider: 'openai', family: 'GPT-4o', mode: 'chat', capabilities: openaiCaps },
  { name: 'gpt-4o-mini', provider: 'openai', family: 'GPT-4o', mode: 'chat', capabilities: openaiCaps },

  { name: 'gemini-3.1-pro-preview', provider: 'gemini', family: 'Gemini 3.1', mode: 'reasoning', contextWindow: 1048576, aliases: ['gemini-3.1-pro-high', 'gemini-3.1-pro-low'], capabilities: ['vision', 'tools', 'cache', 'search', 'schema', 'coding'] },
  { name: 'gemini-3-pro-preview', provider: 'gemini', family: 'Gemini 3', mode: 'reasoning', contextWindow: 1048576, capabilities: ['vision', 'tools', 'cache', 'search', 'schema', 'coding'] },
  { name: 'gemini-3-flash-preview', provider: 'gemini', family: 'Gemini 3', mode: 'chat', contextWindow: 1048576, capabilities: geminiCaps },
  { name: 'gemini-2.5-pro', provider: 'gemini', family: 'Gemini 2.5', mode: 'reasoning', contextWindow: 1048576, capabilities: ['vision', 'tools', 'cache', 'search', 'schema', 'coding'] },
  { name: 'gemini-2.5-flash', provider: 'gemini', family: 'Gemini 2.5', mode: 'chat', contextWindow: 1048576, capabilities: geminiCaps },
  { name: 'gemini-2.5-flash-lite', provider: 'gemini', family: 'Gemini 2.5', mode: 'chat', contextWindow: 1048576, capabilities: geminiCaps },
]
