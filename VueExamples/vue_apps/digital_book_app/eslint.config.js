import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  {
    // 规则命名
    name: 'app/files-to-lint',
    // 匹配以下扩展名文件
    files: ['**/*.{js,mjs,jsx,vue}'],
    rules: {
      // 禁止使用未声明的变量
      'no-undef': 'error',
      // 禁止未使用的变量
      'no-unused-vars': 'warn',
      // 禁止使用 console 和 debugger
      //'no-console': 'warn',
      //'no-debugger': 'warn',
      // 禁止使用 var，推荐使用 let 和 const
      'no-var': 'warn',
      // 强制使用 === 和 !==，避免使用 == 和 !=
      'eqeqeq': ['error', 'always'],
      // 禁止多余分号
      'no-extra-semi': 'warn',
      // 强制函数中使用一致的return 语句
      'consistent-return': 'warn',
      // 强制使用驼峰命名
      'camelcase': 'warn',
      // 强制模版中的属性顺序
      'vue/attributes-order': 'warn',
      // 强制使用缩进为两个空格
      'vue/html-indent': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },

  // 忽略特定目录和文件
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
])
