# Welcome to the Unit Test of Typescript with Jest

I will take note some of **basic steps** to setup an environment for testing.

- Install escential packages:
  - npm install --save-dev @types/jest @types/node jest ts-jest @shelf/jest-mongodb
- Write a jest.config.js file for setting the test up
  - Add `preset: '@shelf/jest-mongodb'` for testing MongoDB
- Add `test: jest` into `script` section of package.json
- Create `jest-mongodb-config.js` file for testing MongoDB
- coverage: I dont know what it is....
  - https://medium.com/@admin_86118/testing-typescript-node-with-jest-6bf5db18119c
  - https://medium.com/swlh/typescript-unit-testing-with-test-coverage-2cc0cc6f3fd1
