# Inventory Application

A small Express.js inventory management application that demonstrates CRUD operations, file uploads, server-side validation, and a PostgreSQL-backed data store. The app uses EJS for server-side views and serves static assets from the `public` folder.

## Features

- List all products with filtering and sorting
- View a single product and edit its details
- Add new products with image upload (stored in `public/images`)
- Delete products (removes uploaded image when applicable)
- Simple server-side validation with `express-validator`

## Tech stack

- Node.js + Express
- EJS templates
- PostgreSQL
- Multer for file uploads
- express-validator for request validation

## Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL database

## Environment

Create a `.env` file in the project root with these variables:

```
PORT=3000
PORT_DB=5432
USER=your_pg_user
PASSWORD=your_pg_password
```

PORT is the port the Express server listens on. `PORT_DB`, `USER`, and `PASSWORD` are used to connect to a PostgreSQL database named `inventory` (see DB setup below).


## Project structure (high level)

- `app.js` — entry point and Express setup
- `routes/` — route definitions (`indexRouter.js`, `productsRouter.js`)
- `controllers/` — controller functions that render views and call DB helpers
- `db/` — database connection (`pool.js`), queries (`queries.js`), and seeding (`populatedb.js`)
- `views/` — EJS templates
- `public/` — static assets and uploaded images (`public/images`)
- `categoryColor.js` — shared category/color mapping used by views

## Important notes

- Uploaded images are stored in `public/images` and referenced from EJS templates.
- Deleting a product will attempt to remove the uploaded image file if it is not the default image.
- The app uses `method-override` to support PATCH-style updates from forms.

## Endpoints (overview)

- `GET /` — homepage
- `GET /products` — products listing (supports query filters)
- `GET /products/add` — add product form
- `POST /products/add` — create product (multipart/form-data)
- `GET /products/:id` — view product
- `GET /products/:id/edit` — edit product form
- `PATCH /products/edit` — update product
- `GET /products/:id/delete` — delete product

