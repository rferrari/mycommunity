# MyCommunity - Hive Frontend

A SkateHive project!
https://skatehive.app/

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and tailored for the Hive community.

## 🚧 Project Status: Under Construction 🚧

Feel free to fork, contribute, and make this project even better! Join us at the SkateHive community on [Hive](https://peakd.com/c/hive-173115) or connect with us on [Discord](https://discord.gg/gNzmZSEr5Y).

## 🛠 Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/yourprojectname.git
cd yourprojectname
```

### 2. Set Up Environment Variables

Copy the example environment file and customize it according to your setup:

```bash
cp .env.example .env
```

Edit your `.env` file with the following details:
- **App Setup:** Name and version of your app.
- **Community Setup:** Hive community tag.
- **Threads Post Parameters:** Customize your threads post parameters.
- **Frontend Specs:** Define frontend specifications.
- **Data Fetching Interval:** Set intervals for fetching data from the Hive API and refreshing live comments.
- **Available Themes:** Choose from `bluesky`, `hacker`, `forest` (or create your own!).

### 3. Install Dependencies

We recommend using `pnpm` for managing dependencies, but `yarn`, `npm`, or `bun` will also work:

```bash
pnpm install
```

### 4. Run the Development Server

Start the development server with your preferred package manager:

```bash
pnpm run dev
# or
yarn dev
# or
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view your project in action.

🎉 **CONGRATULATIONS! You've got your Hive frontend running. Keep on hiving!**

## 📝 Customization

You can start editing the frontend by modifying the `app/page.tsx` file. The changes will automatically reflect in your browser as you save the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 📚 Learn More

To deepen your understanding of Next.js, explore the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and APIs.
- [Learn Next.js](https://nextjs.org/learn) - An interactive tutorial to master Next.js.

For more details on the project or to contribute, check out the [Next.js GitHub repository](https://github.com/vercel/next.js/).

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is through [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform built by the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details on how to get your project live.

---

Thank you for contributing to the Hive community! Let's build something amazing together. 🌟
```
