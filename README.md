# Immersive Software Engineering Student Accommodation Sharing Site
Web server for hosting a student-made and student-run accommodation sharing platform

## API Endpoints

### Health Checks
- `GET /health` - Server health check
- `GET /db/health` - Database connection health check

### User Management
- `POST /users` - Create a new user
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "securepassword",
    "phone": "+353800000000"
  }
  ```

- `GET /user` - Get user by ID
  ```json
  {
    "userId": 1
  }
  ```

- `DELETE /user` - Delete user (cascades to posts and locations)
  ```json
  {
    "userId": 1
  }
  ```

### Authentication
- `POST /login` - User login
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

### Posts Management
- `POST /posts` - Create a new accommodation post
  ```json
  {
    "posterId": 1,
    "price": 55000,
    "semester": "autumn",
    "bed": "single",
    "bathroom": "shared",
    "ensuite": false,
    "roommates": 2,
    "notes": "Quiet room near campus",
    "locationId": 1,
    "line_1": "123 Main Street",
    "line_2": "Apartment 4B",
    "town": "Dublin",
    "city": "Dublin",
    "county": "Dublin",
    "eircode": "D01 ABC1"
  }
  ```

- `GET /posts` - Get all accommodation posts (includes poster info and location details)

- `DELETE /posts` - Delete a post (cascades to location)
  ```json
  {
    "postId": 1
  }
  ```

## Data Models

### Enums
- **Semester**: `autumn`, `spring`, `summer`
- **Bed**: `single`, `double`
- **Bathroom**: `shared`, `personal`

### Response Examples

**Posts Response:**
```json
[
  {
    "id": 1,
    "price": 55000,
    "semester": "autumn",
    "bed": "single",
    "bathroom": "shared",
    "ensuite": false,
    "roommates": 2,
    "notes": "Quiet room near campus",
    "poster": {
      "name": "Alice Smith",
      "email": "alice@example.com",
      "phone": "+353800000000"
    },
    "location": {
      "line_1": "123 Main Street",
      "line_2": "Apartment 4B",
      "town": "Dublin",
      "city": "Dublin",
      "county": "Dublin",
      "eircode": "D01 ABC1"
    }
  }
]
```

## Setup

1. Install dependencies: `npm install`
2. Set up MySQL database and configure `.env`
3. Run migrations: `npx prisma migrate dev`
4. Start server: `npm run dev`

Server runs on `http://localhost:3000`
