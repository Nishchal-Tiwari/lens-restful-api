# Restful API

## API Endpoints Details

1. Clone the repository:
    ```sh
    git clone https://github.com/Nishchal-Tiwari/lens-restful-api.git
    cd lens-restful-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Configure environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/userAuthDB
    JWT_SECRET=your_jwt_secret_key
    REDIS_URL=your_redis_db_uri
    ```

4. Run the application:
    ```sh
    npm start
    ```

5. Run tests:
    ```sh
    npm test
    ```

6. OpenAPI documentation is available at `http://localhost:5000/api-docs` after starting the server.

# Endpoints

#### Register a new user
- `POST /api/auth/register`

#### Login a user
- `POST /api/auth/login`

#### Logout a user
- `POST /api/auth/logout`

#### Get user profile
- `GET /api/auth/profile`

Refer to the OpenAPI documentation for detailed request and response schemas.
