# MovieOverflow Readme

MovieOverflow is a movie commenting website that allow users to comment on movies and view movie information such is trending movies and movies that are going to be release. It is built using SvelteKit, a modern framework for building web applications with Svelte and uses Pocketbase as backend.

## 1. Cloning the repository

```
git clone https://github.com/Jennyytt/MovieOverflow.git
```

## 2. Running the project

```
cd MovieOverflow
```

### 2.1 Using the shell script
```
./start.sh
```


### 2.2 Start frontend backend separately
```
npm install
npm run dev
cd backend
./pocketbase_linux serve # for linux user
./pocketbase.exe serve #for windows user
./pocketbase serve # for mac user
```
