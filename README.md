# A siple MERN project called car-subscription-service.

The client application uses Mongo Atlas as a database, Firebase as Auth provider, FontAwesome for svg icons.

The server API is writen with express.js as a RESTFul service

Both Client and Server are hosted in Docker containers

## Environments:

## Client:

### Development: `$root: npm start`

    You sould create your own .env file to connect to your own Instance of Firebase...
    The encoded ENV variables are:

    REACT_APP_FIREBASE_KEY
    REACT_APP_FIREBASE_DOMAIN
    REACT_APP_FIREBASE_PROJECT_ID
    REACT_APP_FIREBASE_STORAGE_BUCKET
    REACT_APP_FIREBASE_SENDER_ID
    REACT_APP_FIREBASE_APP_ID
    REACT_APP_TOKEN_LOCAL_STORAGE
    REACT_APP_BASE_URL

### Production: Comming Soon

## Server:

### Development: `$root: npm start`

    You sould create your own .env for these.
    The encoded ENV variables are:

    APP_PORT
    APP_ENV
    DB_HOST
    DB_USER
    DB_PASSWORD
    DB_SCHEMA
    DB_LOCATION
    DB_OPTIONS
    SALT_ROUNDS
    COOKIE_NAME
    SECRET
    TOKEN_EXPIRY_DATE

### Production: Comming Soon

## Entry points:

### `docker build -t car-service-server -f DockerfileBE .`

### `docker build -t car-service-client -f DockerfileFE .`

### start: `docker-compose -f docker-compose.yaml up -d`

### stop: `docker-compose -f docker-compose.yaml down`
