import baseConfig from '../../eslint.angular.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['src/app/**/*.html'],
    rules: {
      '@angular-eslint/template/i18n': [
        'error',
        { checkId: false, ignoreAttributes: ['aria-labelledby', 'status', 'tone', 'variant'] },
      ],
    },
  },
];
