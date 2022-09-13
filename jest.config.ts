import type { Config } from '@jest/types'

/* eslint-disable */
const config: Config.InitialOptions = {
  displayName: 'fernet',
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/packages/fernet',
};

export default config