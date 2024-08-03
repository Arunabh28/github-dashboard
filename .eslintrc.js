module.exports = {
    extends: [
      'react-app',
      'react-app/jest',
    ],
    rules: {
      'no-restricted-globals': [
        'error',
        {
          name: 'self',
          message: 'Use of self in service worker context is not allowed.',
        },
      ],
    },
  };
  