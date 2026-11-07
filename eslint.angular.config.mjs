import nx from '@nx/eslint-plugin';
import angular from 'angular-eslint';
import baseConfig from './eslint.config.mjs';

export default [
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  ...baseConfig,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        [
          { type: 'element', prefix: 'mf', style: 'kebab-case' },
          { type: 'attribute', prefix: 'mf', style: 'camelCase' },
        ],
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'mf', style: 'camelCase' },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
      '@angular-eslint/prefer-signals': 'error',
    },
  },
  ...angular.configs.templateAccessibility.map((config) => ({ ...config, files: ['**/*.html'] })),
];
