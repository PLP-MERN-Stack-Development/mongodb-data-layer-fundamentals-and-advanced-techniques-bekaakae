// insert_books.js
// Run this script to insert sample book data into your MongoDB database

const { MongoClient } = require('mongodb');

// Connection URL
const url = '';
const dbName = 'plp_bookstore';
const collectionName = 'books';

// Sample book data
const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    published_year: 1925,
    price: 12.99,
    in_stock: true,
    pages: 180,
    publisher: "Scribner"
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    published_year: 1960,
    price: 14.99,
    in_stock: true,
    pages: 281,
    publisher: "J.B. Lippincott & Co."
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    published_year: 1949,
    price: 10.99,
    in_stock: false,
    pages: 328,
    publisher: "Secker & Warburg"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    published_year: 1937,
    price: 15.99,
    in_stock: true,
    pages: 310,
    publisher: "George Allen & Unwin"
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    published_year: 1997,
    price: 18.99,
    in_stock: true,
    pages: 223,
    publisher: "Bloomsbury"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    published_year: 1951,
    price: 11.99,
    in_stock: true,
    pages: 234,
    publisher: "Little, Brown and Company"
  },
  {
    title: "The Da Vinci Code",
    author: "Dan Brown",
    genre: "Mystery",
    published_year: 2003,
    price: 13.99,
    in_stock: false,
    pages: 454,
    publisher: "Doubleday"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    published_year: 1988,
    price: 9.99,
    in_stock: true,
    pages: 208,
    publisher: "HarperTorch"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    genre: "Science Fiction",
    published_year: 1965,
    price: 16.99,
    in_stock: true,
    pages: 412,
    publisher: "Chilton Books"
  },
  {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    genre: "Dystopian",
    published_year: 2008,
    price: 12.99,
    in_stock: true,
    pages: 374,
    publisher: "Scholastic"
  },
  {
    title: "The Shining",
    author: "Stephen King",
    genre: "Horror",
    published_year: 1977,
    price: 14.99,
    in_stock: true,
    pages: 447,
    publisher: "Doubleday"
  },
  {
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Mystery",
    published_year: 2012,
    price: 15.99,
    in_stock: false,
    pages: 432,
    publisher: "Crown Publishing Group"
  }
];

async function insertBooks() {
  const client = new MongoClient(url);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    
    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing book data');
    
    // Insert new books
    const result = await collection.insertMany(books);
    console.log(`Inserted ${result.insertedCount} books successfully`);
    
    // Display the inserted books
    const allBooks = await collection.find({}).toArray();
    console.log('\nInserted books:');
    allBooks.forEach(book => {
      console.log(`- ${book.title} by ${book.author}`);
    });
    
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the insertion
insertBooks();