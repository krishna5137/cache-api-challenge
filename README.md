# Fashion Cloud Cache API Challenge

## Pre-requisites

1) Create a `.env` file in the root directory.

2) Replace `CACHE_DB_URI` with local mongo uri or mongo Atlas app connection string.

  2.1) white-listed all IP Addresses(anywhere access) to connect to my cluster
  
  2.2) db_username: krishna password: Krish2187$

3) Replace `CACHE_NS` with the name of mongo database
```
CACHE_DB_URI=mongodb+srv://krishna:Krish2187$@cluster0.jb49a.mongodb.net/cacheDB?retryWrites=true&w=majority
CACHE_NS=cacheDB
PORT=5000
MAX_CACHE_LIMIT=5
TTL=10
```

## Run project

1) Install app dependencies.
```javascript
npm install

launch mongodb instance (I used mongo atlas to host the db)
```

2) Run the tests
```javascript
npm run test
```
3) Run APP
```javascript
npm start
```

## Future Improvements
1) Better Async Error Handling and Server Side Validations

2) Tests won't run at this moment. Use of Mocha/Chai to test the controllers

3) Better understanding of Nodejs project structures and also include Swagger Documentation

