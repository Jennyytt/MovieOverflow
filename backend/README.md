# MovieOverflow Backend Setup with PocketBase

This guide explains how to set up and access the PocketBase backend for the MovieOverflow project. PocketBase is used as our backend to manage users, movies, watchlists, reviews, ratings, and licenses.

## Prerequisites

- **Node.js** and **npm** installed (for the SvelteKit frontend).
- Git installed and the MovieOverflow repository cloned:

  ```
  git clone https://github.com/Jennyytt/MovieOverflow.git
  cd MovieOverflow
  ```
- Access to the local network where the PocketBase server is hosted (for development).

## Setup Instructions

### 1. Switch to Your Branch

Ensure you’re on your feature branch (e.g., `ui/login`, `ui/user_profile_page`):

```
git checkout <your-branch>
```

### 2. Pull the Latest Changes

The backend schema is stored in the `backend/pb_migrations` folder. Pull the latest changes to get the migrations:

```
git pull origin ui/homepage
```

- The `ui/homepage` branch contains the initial backend setup, including the `pb_migrations` folder.

### 3. Download PocketBase

PocketBase is a single executable file that runs the backend server.

1. Go to the PocketBase Releases page.
2. Download the appropriate executable for your operating system:
   - Windows: `pocketbase_X.X.X_windows_amd64.zip`
   - macOS: `pocketbase_X.X.X_darwin_amd64.zip` (or `arm64` for Apple Silicon)
   - Linux: `pocketbase_X.X.X_linux_amd64.zip`Use the latest version (e.g., 0.22.x as of April 2025).
3. Extract the ZIP file and place the executable (`pocketbase.exe` for Windows, `pocketbase` for macOS/Linux) in the `backend` folder of the project:

   ```
   MovieOverflow/backend/pocketbase
   ```

### 4. Run PocketBase Locally

PocketBase will use the `pb_migrations` folder to set up the database schema automatically.

1. Navigate to the `backend` folder:

   ```
   cd backend
   ```
2. Run PocketBase:
   - Windows:

     ```
     .\pocketbase.exe serve
     ```
   - macOS/Linux:

     ```
     ./pocketbase serve
     ```
3. You should see output like:

   ```
   Server started at http://127.0.0.1:8090
   ├─ REST API:  http://127.0.0.1:8090/api/
   └─ Admin UI: http://127.0.0.1:8090/_/
   ```
   - If prompted to create a superuser account, you can skip this step since you’ll access the hosted instance (see below). Alternatively, create a local superuser for testing:

     ```
     ./pocketbase superuser upsert your-email@example.com your-password
     ```

### 5. Access the Hosted PocketBase Instance (For Development)

The PocketBase server is currently hosted on the local network by the team member who set it up.

- **Host IP Address:** Ask the team member hosting PocketBase for their local IP address (e.g., `192.168.x.x`). They can find it using:
  - Windows: `ipconfig` (look for "IPv4 Address" under your network adapter)
  - macOS/Linux: `ifconfig` or `ip addr` (look for "inet" under your network interface)
- **Access URLs:**
  - REST API: `http://<host-ip>:8090/api/`
  - Admin UI: `http://<host-ip>:8090/_/`For example, if the host IP is `192.168.1.100`, use:
  - REST API: `http://192.168.1.100:8090/api/`
  - Admin UI: `http://192.168.1.100:8090/_/`
- **Admin Credentials:** Ask the team member who set up PocketBase for the admin email and password to log into the Admin UI.

### 6. Integrate with the Frontend

The frontend uses the PocketBase JavaScript SDK to communicate with the backend.

1. Install the PocketBase SDK if not already installed:

   ```
   npm install pocketbase
   ```
2. Update the PocketBase client to point to the hosted instance. Edit `src/lib/pocketbase.js`:

   ```javascript
   import PocketBase from 'pocketbase';
   
   const pb = new PocketBase('http://<host-ip>:8090'); // Replace <host-ip> with the host’s IP (e.g., http://192.168.1.100:8090)
   
   pb.autoCancellation(false);
   
   export default pb;
   ```
3. Test the integration:
   - Run the SvelteKit app:

     ```
     npm run dev
     ```
   - Visit `http://localhost:5173/` and verify that the frontend can fetch data (e.g., movies for the homepage, login functionality).

## Database Schema Overview

The backend includes the following collections:

- **users**: Stores user data (id, username, email, password, isAdmin, isPro).
- **movies**: Stores movie details (title, releaseDate, director, etc.).
- **watchlists**: Stores movies users want to watch (userId, movieId, notification).
- **critics_reviews**: Stores critic reviews (userId, movieId, reviewText, isDraft).
- **ratings_comments**: Stores user ratings and comments (userId, movieId, rating, commentText).
- **comment_reactions**: Stores likes/dislikes on comments (userId, ratingCommentId, reaction).
- **licenses**: Manages pro licenses (licenseKey, isActive, userId).

The schema is defined in the `pb_migrations` folder, which PocketBase applies automatically when you run the server.

## Notes

- **Local Development:** If you’re not on the same network as the host, you’ll need to run PocketBase locally (Step 4) and use test data. We’ll set up a remote server for production later.
- **Security:** API rules are set to ensure users can only modify their own data (e.g., watchlists, reviews). Admins have full control over movies and licenses.
- **Collaboration:** After making changes to the backend schema, commit the `pb_migrations` folder and push to your branch:

  ```
  git add backend/pb_migrations
  git commit -m "feat: update pocketbase schema"
  git push origin <your-branch>
  ```

## Troubleshooting

- **Cannot Connect to Host:** Ensure you’re on the same network as the host and the host is running PocketBase with `--http=0.0.0.0:8090`.
- **Schema Not Applied:** Verify the `pb_migrations` folder exists and is up-to-date. Run `pocketbase migrate` if needed.
- **Frontend Errors:** Check the PocketBase URL in `src/lib/pocketbase.js` and ensure the server is running.

For further assistance, reach out to the team member who set up the backend.