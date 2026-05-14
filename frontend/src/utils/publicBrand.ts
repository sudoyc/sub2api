export const DEFAULT_PUBLIC_SITE_NAME = 'Arqel'
export const DEFAULT_PUBLIC_SITE_SUBTITLE = 'AI API Gateway'

export function normalizePublicSiteName(name?: string | null): string {
  const trimmed = typeof name === 'string' ? name.trim() : ''
  if (!trimmed || trimmed.toLowerCase() === 'sub2api') return DEFAULT_PUBLIC_SITE_NAME
  return trimmed
}

export function normalizePublicSiteSubtitle(subtitle?: string | null): string {
  const trimmed = typeof subtitle === 'string' ? subtitle.trim() : ''
  if (!trimmed || trimmed.toLowerCase() === 'subscription to api conversion platform') {
    return DEFAULT_PUBLIC_SITE_SUBTITLE
  }
  return trimmed
}
