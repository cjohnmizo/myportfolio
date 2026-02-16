# Hacker Portfolio Template

A high-performance, cyberpunk-themed portfolio template built with Next.js, Tailwind CSS, and Framer Motion. This template is designed to be easily customizable via a single configuration file.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/hacker-portfolio.git
    cd hacker-portfolio
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ⚙️ Customization

All dynamic content is managed through a central configuration file located at `src/data/config.ts`.

### 1. Update Profile Information
Open `src/data/config.ts` and modify the `profile` object:
```typescript
profile: {
    name: "Your Name",
    shortName: "YOUR_HANDLE", // Used in Navbar
    title: "Your Title",
    email: "your.email@example.com",
    // ...
}
```

### 2. Update Sections
-   **Hero**: Edit `config.hero` to change the typewriter strings and CTA buttons.
-   **About**: Edit `config.about` to update your bio and stats.
-   **Skills**: Edit `config.skills` to list your technical skills.
-   **Services**: Edit `config.services` to list your offered services.
-   **Projects**: Edit `config.projects` to showcase your work.
-   **Contact**: Edit `config.contact` to update contact details.

### 3. Icons
The template uses `lucide-react` for icons. You can import new icons in `src/data/config.ts` and use them in your configuration objects.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Font**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)

## 📦 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
