# Playwright TypeScript Project

This project is a testing framework built using Playwright and TypeScript. It provides a structured way to write and execute end-to-end tests for web applications.

## Project Structure

```
playwright-ts-project
├── src
│   ├── tests
│   │   └── example.spec.ts
│   └── helpers
│       └── utils.ts
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd playwright-ts-project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the tests:**
   ```
   npx playwright test
   ```

## Usage

- The test files are located in the `src/tests` directory. You can create new test files following the naming convention `*.spec.ts`.
- Utility functions can be added to `src/helpers/utils.ts` for reuse across tests.

## Configuration

- The Playwright configuration can be found in `playwright.config.ts`. You can customize the test directory, timeout values, and browser options as needed.
- TypeScript configuration is managed in `tsconfig.json`.

## Tests

### Playwright
Ejecuta los tests de Playwright:
```bash
npx playwright test
```

## Contributing

Feel free to submit issues or pull requests to improve the project.