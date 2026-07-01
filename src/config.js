import config from '../user_config.json'

export default config

export const products = config.products || []

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`
}
