# Minimal Reproduction for vitest#9259

This repository reproduces the issue where global `vi.mock` in root `setupFiles` is not executed for workspace deep imports in a pnpm workspace.

**Issue**: https://github.com/vitest-dev/vitest/issues/9259

## Problem

When using a pnpm workspace with Vitest:
- A global `vi.mock` is defined in the root `setupFiles` (`vitest.setup.js`)
- The mock targets a deep import from a workspace package (`package-a/utils/helper`)
- Tests in another workspace package (`package-b`) import and use this deep import
- **Expected**: The mock should be applied globally
- **Actual**: The mock is NOT applied; the original implementation is used instead

## Structure

```
.
├── vitest.setup.js          # Root setupFiles with global vi.mock
├── vitest.config.js         # Vitest config referencing setupFiles
├── pnpm-workspace.yaml      # PNPM workspace definition
├── packages/
│   ├── package-a/
│   │   ├── index.js         # Main export
│   │   └── utils/
│   │       └── helper.js    # Module being mocked (deep import)
│   └── package-b/
│       ├── index.js         # Uses deep import from package-a
│       └── index.test.js    # Test that expects mock to work
```

## Reproduction Steps

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the test:
   ```bash
   pnpm test
   ```

3. **Expected behavior**: Test passes with mocked value
   
4. **Actual behavior**: Test FAILS because `vi.mock` in root setupFiles is not applied to the deep import

## Expected Output

The test should pass with the mocked value `'mocked value'`.

## Actual Output

The test fails because it receives the original value `'original value from helper'` instead of the mocked value.
