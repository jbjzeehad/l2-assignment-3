# Library Management System

#### • GitHub Repository : https://github.com/jbjzeehad/l2-assignment-3

#### • Live Deployment : https://librarymanagementsystem-eosin.vercel.app/

#### • Video Explanation : https://drive.google.com/file/d/1UNSXVK4LNsnymvp0ark6UzwKzYtp3PM-/view?usp=sharing

## 1. Features

- Create, update, delete and fetch books.
- Borrow books with quantity and due date.
- Automatic availability management.
- Borrow summary.
- Filtering, sorting and pagination for books.

## 2. Technologies

- Nodejs
- Expressjs
- TypeScript
- Mongoose
- MongoDB

## 3. Project Setup

### • Install dependencies

```
- $ npm init -y
- $ tsc --init
- $ npm install express mongoose cors
- $ npm install express mongoose cors
```

```
- $ npm i --save-dev @types/express
- $ npm i --save-dev @types/cors
- $ npm i ts-node-dev dotenv
- $ npm i --save-dev typescript
```

### • Update file

#### / tsconfig.json

```
- "rootDir": "./src"
- "outDir": "./dist"
```

#### / .env

```
+ NODE_ENV = development
+ PORT = ****
+ DATABASE_URL = ****
```

#### / .gitignore

```
node_modules
package-lock.json
.env
.vercel
```

#### / vercel.json

```
{
  "version": 2,
  "builds": [
    {
      "src": "dist/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/server.js"
    }
  ]
}
```

### • Folder structure

```
└─ src
|  └─ app
|  |  └─ config
|  |  |  └─ index.ts
|  |  └─ controllers
|  |  |  └─ books.controller.ts
|  |  |  └─ borrowBook.controller.ts
|  |  └─ interfaces
|  |  |  └─ books.interface.ts
|  |  |  └─ borrowBook.interface.ts
|  |  └─ models
|  |  |  └─ books.model.ts
|  |  |  └─ borrowBook.model.ts
|  |  └─ routes
|  |     └─ books.route.ts
|  |     └─ borrowBook.routes.ts
|  └─ app.ts
|  └─ server.ts
└─ .env
└─ .gitignore
└─ package.json
└─ README.md
└─ tsconfig.json
```

### • Run the App

```
- $ tsc
- $ npm run dev
```

## 4. API Endpoints

#### • Test API endpoint using postman

- POST /api/books → Create a book.
- GET /api/books → Get all books (filter/sort)
- GET /api/books/:bookId → Get single book.
- PUT /api/books/:bookId → Update book.
- DELETE /api/books/:bookId → Delete book.
- POST /api/borrow → Borrow a book.
- GET /api/borrow → Borrow summary.
