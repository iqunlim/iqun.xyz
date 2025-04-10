# Next.js Blog Website

This is a simple blog web application built using Next.js. It was created as a learning project to explore and implement key web development concepts, including:

    Basic CRUD operations

    API validation using Zod

    Understanding and working with the Next.js framework

# Learning Goals

1.  Basic CRUD Operations

    Implemented Create, Read, Update, and Delete functionality for blog posts.

    Users can:

        Create new blog posts

        View a list of existing posts

        Edit and update posts

        Delete posts

2.  API Validation with Zod

    All API routes use Zod for input validation and type safety.

    Ensures only valid data is processed and helps catch errors early.

3.  Working with Next.js

    Explored the Next.js App Router and File-Based Routing

    Utilized an existing image API from another project for image uplaoding

    Utilized Server and Client Components where appropriate

    Employed Server Actions and Custom React Hooks for interactivity

4.  Continuous Integration / Continuous Deployment

    Explored using dockerhub and a custom webhook to achieve CI/CD

# Tech Stack

    Framework: Next.js (App Router)

    Validation: Zod

    Styling: Tailwind CSS

    Database: PostgreSQL

    Language: TypeScript

# Features

    🔐 Form validation with Zod

    🧾 List, edit, and delete blog posts

    🧑‍💻 Server-side and client-side rendering with Next.js

    🔁 Fully typed API routes

# Installation

1: Clone the repo

git clone https://github.com/iqunlim/iqun.xyz

2: Install dependencies

npm install

3a: Start the dev server

npm run dev

3b: Build for standalone deployment

npm run build

3c: Build docker container from local dockerfile

docker build -t <tag>:latest .

# License

This software is licensed under the GNU General Public License v3.
