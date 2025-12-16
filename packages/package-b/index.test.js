import { describe, it, expect } from 'vitest'
import { useHelper } from './index.js'

describe('Deep import mock test', () => {
  it('should use the mocked value from root setupFiles', () => {
    const result = useHelper()
    
    // BUG: This test will FAIL because the global vi.mock in root setupFiles
    // is not applied to workspace deep imports (package-a/utils/helper)
    // Expected: 'mocked value'
    // Actual: 'original value from helper'
    expect(result).toBe('mocked value')
  })
})
