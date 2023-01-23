# Connecting to MongoDB with an Express App

## Objectives

## Set up

- Build basic express.js app
- Install mongodb dependency

## Connecting to MongoDB

- Separate code from index.js file for cleaner approach - we can import functions to index.js

Connect to local mongodb client by using...

```
MongoClient class
```

from mongodb dependency.

```
MongoClient.connect()
```

will allow use to connect to the database. As it returns a promise we can catch it using a .then and catch any errors with .catch()

```
connectToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/bookstore')
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
```

connectToDb returns a callback and if there is an error, returns the callback with an error. We can check if there is an error before express app listens for any connections on port 3000.

## Connecting to MongoDB using async/await instead

TODO

## GET Requests

TODO

## POST Requests

TODO

## DELETE Requests

TODO

## PATCH Requests

TODO

## Pagination

Implementing a simple pagination for GET requests to control how many documents we get back per request.

We can use a query paramater to handle any pagination. We can access a query parameter through the req object.

```
const page = req.query.p || 0
```

This will get parameter 'p' from req object and if no paramater is provided we shall default the value to 0.

```
.skip()
.limit()
```

.skip(x) method will bypass x number of documents. .skip() applies first if used with .limit().

.limit() method will cap the number of documents that can be returned from a read operation.

### Example

- The page variable retrieves the page number from the req.query parameter.
- The booksPerPage variable determines number of books to be displayed on each page.
- .skip() method will bypass the number of books per page by the page number
- .limit() will then return the number of books per page (3) from the documents after the skip method has run.

```
app.get('/books', (req, res) => {
  const page = req.query.p || 0;
  const booksPerPage = 3;
  let books = [];
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip(page * booksPerPage)
    .limit(booksPerPage)
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Could not fetch the documents' });
    });
});

```

## Indexes

Datastructures that support execution of queries in MongoDB. Make queries more efficient. We can limit the number of documents MongoDB scans to return the documents faster.

See [https://www.mongodb.com/docs/drivers/node/current/fundamentals/indexes/] for more details on the types of indexes that cna be used to support querying our data.
# mongodb_express
