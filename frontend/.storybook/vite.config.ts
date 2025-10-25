import { mergeConfig } from 'vite'
import viteConfig from '../vite.config'

export default mergeConfig(viteConfig, {
  // Add any Storybook-specific Vite config here
})
