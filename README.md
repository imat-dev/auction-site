# Auction System - Frontend
The Auction System is an intuitive online platform that facilitates the dynamic listing and bidding of items. Users can effortlessly list auction items, set starting prices, and define auction durations. Bidders, in turn, engage in real-time competitive bidding, ensuring they always stay above the last highest bid. This platform exemplifies a seamless integration of user experience and robust functionality. This project was developed as part of my technical assessment for Jitera.


---

# Table of Contents

- [Tech Stack](#tech-stack)
- [Running the Auction Site](#prerequisite-for-running-the-auction-system)
- [Auction Site Architecture Overview](#steps-for-running-the-auction-system)
- [CI/CD with Vercel for Deployment](#cicd-with-vercel-for-deployment)

---
# **Tech Stack**:

The Front-End of the Auction System is built using the following technologies:

-   **React**: Core UI-building library.
-   **NextJS**: Framework that brings server-side rendering to React.
-   **Redux**: Predictable state management for the app.
-   **Tailwind**: Utility-first CSS framework for custom designs.
-   **Axios**: Promise-based HTTP client for easy data fetching.
-   **Joi**: Object schema validation to ensure data consistency.
-   **ShadCN**: Beautifully designed components built with Radix UI and Tailwind CSS.

---


# **Running the Auction Site**:

  
Steps for Running the Auction System

1.  **Node.js and npm**: Ensure Node.js and npm (Node Package Manager) are installed. If not, you can download and install them from the [official Node.js website](https://nodejs.org/).
2. First, clone the project repository:

```bash

git clone [repository_url]

```

2. Navigate to the directory containing the project.

3. Install all the necessary Node.js dependencies by running:

```bash

$ npm install

```

7.  **Environment Variables Setup**:

- Locate `.env.sample` in the project directory.

- Rename it to `.env.local` using: `$ mv .env.sample .env.local`.

- Edit `.env.local` to ensure all variables match your local setup. 
---
8.  **Start the Application**: To launch the app in development mode, run the following command:

```bash

$  npm  run  dev

```
Your website is ready to view in: http://localhost:8090/

---

## Auction Site Architecture Overview  

### 1. **Framework**:

Built on Next.js, the frontend offers a simple user interface that allows users to view, create, and bid on auction items. It communicates directly with the backend through API calls, and authenticates users ensuring secure access.

**Repository**: The backend codebase is available at [https://github.com/imat-dev/auction-system](https://github.com/imat-dev/auction-system).

### 2. **Library**:

1.  **Redux**:
    -   Storing public auction details, which is polled every 2 seconds when you're on the public auction page.
    -   Managing user balance.
    -   Handling UI actions such as displaying and hiding modals.
2.  **NextAuth**:
    -   Responsible for storing sessions on both server and client side.
3.  **Joi**:
    -   Validates user inputs across all forms in the application.
4.  **Tailwind**:
    -   Enables rapid creation of simple layouts.
5.  **Axios**:
    -   Manages all HTTP transactions.
6.  **ShadCN**:
    -   Provides reusable components to accelerate development.
  
### 3. **SiteMap**:

-   `/`: Login page.
-   `/register`: User registration page.
-   `/auction`: Public auction page displaying all published auctions.
-   `/my-items`: Shows all auction items of the authenticated user, available for publishing.
-   **Modals**:
    -   **Deposit**: Add funds.
    -   **Create Item**: Add a new auction item.
    -   **Bid**: Place bids on auction items.

--- 


## CI/CD with Vercel for Deployment

### **Introduction**

[Vercel](https://vercel.com/) is a cloud platform optimized for frontend frameworks, especially Next.js. It provides features such as automatic HTTPS, continuous deployment from Git, and serverless functions.

### **Deployment Process**

#### 1. **Connecting Your Repository to Vercel**
- Push your Next.js project to a Git provider (e.g., GitHub, GitLab, or Bitbucket).
- [Sign up or log in to Vercel](https://vercel.com/).
- Select "Import Project" and link your Git repository.
- Vercel will auto-detect the Next.js project and configure the build settings.

#### 2. **Automatic Deployments**
- Every push to your repository triggers a deployment.
- Each deployment gets a unique URL.
- Pushes to the default branch (usually `main` or `master`) will reflect on the production domain (if configured).

#### 3. **Preview Deployments**
- For each pull request in your repository, Vercel auto-deploys the changes.
- A unique preview URL is generated for that PR to test and share the changes before merging.

#### 4. **Custom Domains**
- In your Vercel project's settings, you can configure custom domains.
- Vercel will handle SSL for your domain.

To ensure a seamless CI/CD flow, ensure any required environment variables or settings are correctly set up in your Vercel project settings.