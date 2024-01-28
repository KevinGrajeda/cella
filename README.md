# Cella
**Cella is an open source TypeScript template built with best-in-class libraries. A singular stack to build performant, secure and modern web apps. By yourself or together.**

<h3>⚠️ This is a prerelease. Cella is not ready for production requirements.</h3>

<br>

You can read the [Architecture](/info/ARCHITECTURE.md) file for specs and some conceptual decisions. Go to [Roadmap](/info/ROADMAP.md) to read where we are and what is planned.

## Installation

### Step 1

#### Clone project & open directory

```bash
git clone git@github.com:cellajs/cella.git && cd cella
```

#### Env variables

In the `env` folder, you add a .env file using the `.env.example`. The minimum is the `DATABASE_URL` variable.

### Step 2

There are three ways to run Cella:

<details>
  <summary>A: Directly on local machine (Recommended for active devs)</summary>

#### Prerequisites
- **Node:** Check your Node version with `node -v`. Install Node 20.x using [Volta](https://docs.volta.sh/guide/).
- **pnpm:** Check your pnpm version with `pnpm -v`. Install pnpm 8.x using [Volta](https://docs.volta.sh/advanced/pnpm).
- **Postgres:** Install PostgreSQL 16.x on your machine, for example using [Postgres.app](https://postgresapp.com/) if you are on a Mac.

#### Install dependencies
```bash
pnpm install
```

#### Populate database
If starting from scratch, you will need to run a database migration.

```bash
pnpm run migrate
```
Check it out at <http://localhost:3000>:

```bash
pnpm run dev
```
</details>

<details>
  <summary>B: From inside a VS devcontainer (Not yet stable)</summary>

#### Prerequisites
- VSCode and [Dev containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
- [Orbstack](https://orbstack.dev/) or [Docker](https://docs.docker.com/get-docker/)

#### Run devcontainer
- Open VSCode and click one of these buttons to run the container:
  <img width="1177" alt="Screenshot" src="https://github.com/cellajs/cella/tree/main/info/devcontainer.png">
- Alternatively, open the project in VSCode and use `⌘+⇧+p` to run the `Remote-Containers: Reopen in Container` command.

Start command in container terminal:

```bash
pnpm run dev
```

#### Problems?
- **Rebuilding the docker container**: Just open Orbstack and delete the container and volume that has `cella` in the name.
- **CORS issues**: Make sure to open `http://localhost:3000/` and not `http://127.0.0.1:3000/`
</details>

<details>
  <summary>C: As basic docker container (Recommended for quick start)</summary>

#### Prerequisites
- [Orbstack](https://orbstack.dev/) or [Docker](https://docs.docker.com/get-docker/)

#### Run docker
```bash
pnpm run docker
```
</details>

### Step 3

You need the users seed script to add an ADMIN user. Look into the [seed](/backend/seed/users.ts) for details. There is also an optional organizations seed to add organizations and users with [faker.js](https://github.com/faker-js/faker). If you run in a container, access the (backend) container to run these scripts.

```bash
pnpm run seed:users
pnpm run seed:organizations
```

Use [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) to manage your local db on <https://local.drizzle.studio>.

```bash
pnpm run studio
```

## API documentation
Cella has autogenerated [API docs](https://cellajs.com/api/v1/docs). These can be viewed on locally at <https:/localhost:4000/docs>.

## Deployment
Deploying a cella project is explained in the [Deployment](/info/DEPLOYMENT.md) file.

## More info

- `EADDRINUSE` errors?

```bash
sudo lsof -i :1080 -i :3000 -i :4000
```
Replace `*PID*` with a space separated list of `PID` that still run.

```bash
kill -9 *PID*
```
- Got pnpm cache issues? Try `pnpm store prune`
- Got turbo cache issues? Try adding `--force` to the command.
- Got docker cache issues? Try `docker builder prune --force`

