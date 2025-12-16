import { vi } from 'vitest'

// This global mock should apply to all tests in the workspace
vi.mock('package-a/utils/helper', () => ({
  helperFunction: vi.fn(() => 'mocked value')
}))

console.log('✓ Root setupFiles executed: global vi.mock registered')
