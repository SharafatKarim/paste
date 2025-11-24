# Paste - Modern Code Sharing Platform

A minimal, distraction-free, and feature-rich pastebin clone built with modern web technologies. Share code snippets and text with syntax highlighting, markdown support, and instant sharing capabilities.

## ✨ Features

-   **Rich Text & Markdown Editor**: Write in Markdown with a powerful Lexical-based editor or paste raw code.
-   **Syntax Highlighting**: Support for over 15+ programming languages including JavaScript, Python, Rust, Go, and more.
-   **Instant Sharing**: Generate unique, short URLs for every paste.
-   **QR Code Generation**: Automatically generate QR codes for mobile sharing.
-   **Dark/Light Mode**: Fully responsive design with automatic theme detection and manual toggle.
-   **View Source**: Toggle between rendered Markdown preview and raw source code with copy functionality.
-   **Privacy Focused**: No user tracking, simple and transparent data policy.
-   **Responsive Design**: Built mobile-first for a seamless experience on any device.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Markdown**: [Lexical](https://lexical.dev/) & [React Markdown](https://github.com/remarkjs/react-markdown)
-   **Syntax Highlighting**: [Shiki](https://shiki.style/) via `shadcn-io/code-block`

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

-   Node.js 18+ installed
-   npm or pnpm installed
-   A Firebase project created

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/paste.git
    cd paste
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Configure Environment Variables**

    Copy the example environment file:

    ```bash
    cp .env.example .env.local
    ```

    Open `.env.local` and fill in your Firebase configuration keys. You can find these in your Firebase Console under Project Settings > General > Your Apps.

    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                # Next.js App Router pages
│   ├── [slug]/         # Dynamic route for viewing pastes
│   ├── privacy/        # Privacy policy page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page (Editor)
├── components/         # React components
│   ├── editor/         # Lexical editor components
│   ├── ui/             # shadcn/ui primitives
│   ├── Editor.tsx      # Main editor logic
│   ├── PasteViewer.tsx # Paste display logic
│   └── ...
├── lib/                # Utilities
│   ├── firebase.ts     # Firebase initialization
│   └── firestore-utils.ts # Database operations
└── ...
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Sharafat Karim](https://github.com/SharafatKarim)
