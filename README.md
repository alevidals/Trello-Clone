# Trello Clone

Welcome to this project, this is a [Trello](https://trello.com/) clone (just the basics) created to improve on [Next.JS](https://nextjs.org/) and [Spring](https://spring.io/).

As I mentioned the backend is created using [Spring](https://spring.io/) and the frontend using [Next.JS](https://nextjs.org/).

<details>

----
<summary>Table of contents</summary>

- [Trello Clone](#trello-clone)
- [To start](#to-start)
  - [Prerequisites](#prerequisites)
  - [Installation and start](#installation-and-start)
    - [Back](#back)
    - [Front](#front)

</details>


# To start

## Prerequisites

- Node > 20 version. You can use [NVM](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating) to setup a node version manager

- Package manager (pnpm)

- Docker

- Java > 22 version.

- Maven cli

## Installation and start

### Back

```sh
cd back
docker compose up --detach
mvn spring-boot:run
```

### Front

```sh
cd front
pnpm i
pnpm dev
```