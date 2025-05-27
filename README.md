# Drift Style - Sports Jackets Ecommerce

Welcome to **Drift Style**! An ecommerce platform designed to offer you the best sports jackets, combining style and functionality.

---

## **Main Features**

- **Modern Design**: Built with React and Vite for a fast and smooth user experience.
- **Custom Styles**: Responsive and modern design using Panda CSS.
- **Smooth Animations**: Powered by `framer-motion` for dynamic UI effects.
- **Product Management**: Display of products with images, descriptions, and prices.
- **Notifications**: Uses `react-toastify` for clear and effective user messages.
- **Shopping Cart**: Integrated cart functionality for managing user purchases.

---

![image](https://github.com/user-attachments/assets/6c389e2a-de20-49e6-9f4b-524a64f0a334)

## **Live Demo on Vercel**
https://ecommerce-react-drift-style.vercel.app/

---

## **Tech Stack**

- **Frontend**:
  - React
  - React Router DOM
  - Panda CSS
  - Framer Motion
  - React Icons

- **Backend**:
  - Firebase (Authentication, Database)

- **Development Tools**:
  - Vite
  - ESLint

---

## **Installation**

1. Clone this repository:
   ```bash
   git clone https://github.com/Nicokevo/EcommerceReact.git
   cd EcommerceReact
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## **Available Scripts**

You can run the following commands in the project:

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the app for production.
- **`npm run preview`**: Preview the production build.
- **`npm run panda`**: Compile Panda CSS styles.
- **`npm run panda:watch`**: Watch and compile Panda CSS styles on changes.

---

## **Features**

- Responsive design for desktop and mobile
- Product catalog with categories and offers
- Shopping cart with persistent state
- Dark mode toggle
- End-to-end testing with Playwright
- Unit and integration testing with Jest
- Accessible and user-friendly UI

---

## **Project Structure**

```
EcommerceReact/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── styles/
│   └── App.jsx / App.tsx
├── styled-system/
│   └── styles.css
├── test/
│   └── playwright-ts-project/
├── package.json
└── README.md
```

---

## **Testing**

### End-to-End (Playwright)

- Go to the Playwright project directory:
  ```bash
  cd test/playwright-ts-project
  ```
- Run Playwright tests:
  ```bash
  npx playwright test
  ```
- View the HTML report:
  ```bash
  npx playwright show-report
  ```

### Unit/Integration (Jest)

- Run all Jest tests:
  ```bash
  npm run test
  ```
- Run tests with coverage:
  ```bash
  npm run test:coverage
  ```

---

## **Accessibility**

- The UI is designed to be accessible and keyboard-friendly.
- Automated accessibility checks are included in the Playwright test suite.

---

## **Contributing**

Contributions are welcome! Please open an issue or submit a pull request.
