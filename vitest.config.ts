import { defineConfig } from 'vitest/config';

/** Vitest 設定 */
export default defineConfig({
  test: {
    projects: [
      // `shared/` と `server/` のテスト環境を定義する
      {
        extends: true,
        test: {
          name: 'server',
          environment: 'node',
          include: ['./server/**/*.test.ts', './shared/**/*.test.ts'],
          benchmark: { include: ['./server/**/*.benchmark.ts', './shared/**/*.benchmark.ts'] }
        }
      },
      // `client/` のテスト環境を定義する : `happy-dom` を使用する
      {
        extends: true,
        test: {
          name: 'client',
          environment: 'happy-dom',
          include: ['./client/**/*.test.{ts,tsx}'],
          // セットアップファイルを指定する
          setupFiles: ['./vitest.setup.ts'],
          benchmark: {
            include: ['./client/**/*.benchmark.{ts,tsx}']
          }
        }
      }
    ],
    // 各テスト前にスパイを自動的にリセットする
    restoreMocks: true,
    // カバレッジレポート出力用の設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './.vitest/coverage',
      include: ['./client/**/*.{ts,tsx}', './server/**/*.ts', './shared/**/*.ts'],
      exclude: ['**/*.test.{ts,tsx}', '**/*.benchmark.{ts,tsx}', '**/*.d.ts']
    }
  }
});
