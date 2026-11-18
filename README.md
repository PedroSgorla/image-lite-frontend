# ImageLite Frontend

Web app for ImageLite, an image gallery. Users sign up, log in, upload images with a name and tags, and browse them in a gallery with search and a format filter.

This is the frontend of the ImageLite project. It talks to [image-lite-api](https://github.com/PedroSgorla/image-lite-api). The [imageliteapp](https://github.com/PedroSgorla/imageliteapp) repository brings both together with a `docker-compose.yml` and has screenshots of the app.

## Features

- Sign up and log in. The session is kept in the browser and ends when the token expires.
- Gallery with a search box (name or tags) and a format filter (PNG, JPEG, GIF). Each card shows the image, its name, format, size and upload date.
- Upload form with validation: name and tags are required and limited to 50 characters, and the file must be a JPEG, PNG or GIF smaller than 4 MB.
- Notifications for success and error messages.

## Tech stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Formik and Yup for forms and validation, react-toastify for notifications, and jwt-decode to read the login token.

## Pages

| Route | What it does |
|---|---|
| `/` | Shows the gallery if you are logged in, and the login page otherwise |
| `/login` | Log in, or switch to the sign-up form |
| `/galeria` | Image gallery with search. Requires a valid session |
| `/formulario` | Form to upload a new image |

## Running locally

You need Node.js 20.9 or newer (the Dockerfile uses Node 22) and the [API](https://github.com/PedroSgorla/image-lite-api) running.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Next.js reloads the page when you edit a file.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm start` | Runs the production build. Run `npm run build` first |

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080` | Base URL of the API |

The default is in the `.env` file of this repository. Next.js writes `NEXT_PUBLIC_` variables into the build, so after changing this value you need to restart `npm run dev` or rebuild the app.

## Running with Docker

The `Dockerfile` builds a production image: Node 22 on Alpine, `npm install`, `npm run build` and `npm start`. Inside the container, the app listens on port 3000.

The easiest way to run it is with the `docker-compose.yml` in the [imageliteapp](https://github.com/PedroSgorla/imageliteapp) repository, which starts the API and the database too and publishes the frontend at http://localhost:3001.

## How it talks to the API

The calls live in `src/resources`.

- `POST /v1/users/auth` logs in. The returned token is decoded, and the user's name, email and expiration time are saved in the browser's `localStorage` under the key `_auth`.
- `POST /v1/users` creates a user.
- `GET /v1/images?query=...&extension=...` searches images, and `POST /v1/images` uploads one. Both send the token in the `Authorization: Bearer` header.

The session counts as valid until the token's expiration time, which is 60 minutes after login.

## Project structure

```
src/
├── app/             pages (App Router): login, galeria, formulario
├── components/      shared UI: Button, InputText, ImageCard, Template, notifications
└── resources/       API access
    ├── image/       image search and upload
    └── user/        login, sign up and session handling
```

## Known issues

- **The login form labels are wrong.** Every field is labeled "Name:", including email and password.
- **The "confirm password" field in the sign-up form is not masked.** It uses an invalid input type (`passwordMatch`), so the browser shows it as plain text.
- **The password rule and its message disagree.** The check requires 5 characters, but the message says 8.
- **The gallery starts empty.** Images load only after you click "Search".
