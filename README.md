# Play-Pause-PWA
![playpause](https://user-images.githubusercontent.com/82955240/233841321-ac627571-f883-4909-bed3-73108845b801.png)
## Demo - [LIVE](https://play-pause-pwa.vercel.app/)
```shell
https://play-pause-pwa.vercel.app/
```

## NOTE
In order to use PWA(Progressive Web Application) use chrome based browser

https://user-images.githubusercontent.com/82955240/233855256-60b9270c-afdb-46a4-a335-f262d9b87764.mp4


## Getting started
### Prerequisites

**Node version 14.x**

### Cloning the repository

```shell
https://github.com/devilGhostman/Play-Pause-PWA.git
```

### Install packages

```shell
cd backend/
npm i
cd ..
cd frontend/
npm i
```

### Setup .env file in backend folder


```js
MONGODB_URL=
PORT_NO=5000
```

### Setup .env file in frontend folder


```jsdocker 
GITHUB_ID=
GITHUB_SECRET=
```

### Start the backend

```shell
npm start
```

### Start the app

```shell
npm run dev
```
# Set up Docker
## 1.Create image and container by yourself
### Create images
```shell
cd backend/
docker build -t backend:latest .
cd ..
cd frontend/
docker build -t frontend:latest .
```
### Create container 
```shel
cd backend/
docker run --name pp-api --rm -d -p 5000:5000 --env-file ./.env backend:latest
cd ..
cd frontend/
docker run --name pp-app --rm -d -p 3000:3000 -it --env-file ./.env.local frontend:latest
```
- Now browse to `localhost:3000` to get to the page. 
- To stop the container
```shell
docker stop pp-api pp-app
```
- To remove the images
```shell
docker rmi backend:latest frontend:latest
```

## 2.Use docker-compose to do it itself
### Create and start the container
- From the root of the repository run the command:
```shell
docker-compose up -d
```
### Stop and remove the container
```shell
docker-compose down
```


## Available commands

Running commands with npm `npm run [command]` and `npm [command]`

| command         | description                                        |
| :-------------- | :------------------------------------------------- |
| `i` or `install`| Install all the dev dependency to run app          |
| `dev`           | Starts a development instance of the app in nextjs |
| `start`         | Starts a development instance of the app in nodejs |
