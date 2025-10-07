MongoDB Book Collection Project
A beginner-friendly MongoDB project that demonstrates basic to advanced database operations using a book collection. This project covers CRUD operations, advanced queries, aggregation pipelines, and indexing.

📚 Project Overview
This project provides hands-on experience with MongoDB through a book database that includes:

Basic CRUD operations (Create, Read, Update, Delete)

Advanced querying with filtering, projection, and sorting

Aggregation pipelines for data analysis

Indexing for performance optimization

🛠 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (version 14 or higher)

MongoDB (Community Server or Atlas)

npm (comes with Node.js)

Installing Prerequisites
1. Install Node.js
Download from: https://nodejs.org/

Choose the LTS version

Run the installer and follow the setup wizard

Verify installation:

bash
node --version
npm --version
2. Install MongoDB
Option A: MongoDB Community Server (Recommended for learning)

Download from: https://www.mongodb.com/try/download/community

Follow installation guide for your OS

Start MongoDB service:

Windows:

bash
mongod
macOS:

bash
brew services start mongodb-community
Linux (Ubuntu/Debian):

bash
sudo systemctl start mongod
Option B: MongoDB Atlas (Cloud - No installation required)

Create free account at: https://www.mongodb.com/cloud/atlas

Create a free cluster

Get your connection string from the Atlas dashboard

🚀 Quick Start
Follow these steps to get the project running:

Step 1: Download the Project
Create a project folder and download the required files:

bash
mkdir mongodb-book-project
cd mongodb-book-project
Step 2: Create Project Files
Create the following files in your project folder:

insert_books.js - Script to populate the database

queries.js - Contains all MongoDB queries and operations

package.json - Project dependencies (create with npm init -y)

Step 3: Install Dependencies
bash
npm init -y
npm install mongodb
Step 4: Configure Database Connection
For local MongoDB:
No changes needed - uses default connection:

javascript
const url = 'mongodb://localhost:27017';
For MongoDB Atlas:
Update the connection string in both .js files:

javascript
const url = 'mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/';
Step 5: Run the Project
First, populate the database:

bash
node insert_books.js
Expected output:

text
Connected to MongoDB successfully
Cleared existing book data
Inserted 12 books successfully
Then, execute all queries:

bash
node queries.js
This will demonstrate all MongoDB operations.

📁 Project Structure
text
mongodb-book-project/
├── insert_books.js     # Populates database with sample data
├── queries.js          # Contains all MongoDB queries
└── README.md          # This file
📊 Database Schema
Each book document contains these fields:

title (string) - Book title

author (string) - Author name

genre (string) - Book genre/category

published_year (number) - Publication year

price (number) - Book price

in_stock (boolean) - Availability status

pages (number) - Number of pages

publisher (string) - Publishing company

🔧 Features Demonstrated
Task 2: Basic CRUD Operations
✅ Find books by genre, author, publication year

✅ Update book prices

✅ Delete books by title

Task 3: Advanced Queries
✅ Filter books in stock published after 2010

✅ Projection to return specific fields

✅ Sorting by price (ascending/descending)

✅ Pagination with limit and skip

Task 4: Aggregation Pipeline
✅ Average book price by genre

✅ Author with most books

✅ Books grouped by publication decade

Task 5: Indexing
✅ Single field index on title

✅ Compound index on author and published_year

✅ Performance analysis with explain()

🐛 Troubleshooting
Common Issues and Solutions
1. Connection Error:

text
MongoNetworkError: failed to connect to server
Solution: Ensure MongoDB is running

For local MongoDB: Run mongod command

For Atlas: Check your connection string and internet connection

2. Module Not Found:

text
Error: Cannot find module 'mongodb'
Solution: Run npm install in project directory

3. Authentication Failed:

text
MongoError: Authentication failed
Solution: Check username/password in connection string (Atlas)

4. IP Not Whitelisted (Atlas):

text
MongoNetworkError: connection timed out
Solution: Add your IP address to Atlas IP whitelist

Testing Your Setup
Create a test.js file to verify everything works:

javascript
const { MongoClient } = require('mongodb');

async function test() {
  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    console.log('✅ MongoDB connection successful!');
  } catch (err) {
    console.log('❌ Error:', err.message);
  } finally {
    await client.close();
  }
}
test();
Run: node test.js

📖 Learning Outcomes
After completing this project, you'll understand:

MongoDB Fundamentals: Documents, collections, databases

CRUD Operations: Creating, reading, updating, deleting data

Query Building: Filtering, projection, sorting, pagination

Aggregation: Data analysis with pipeline operations

Performance: Indexing and query optimization

MongoDB Driver: Using MongoDB with Node.js

🎯 Next Steps
Ready to learn more? Try these enhancements:

Add a REST API using Express.js

Create a frontend with HTML/CSS/JavaScript

Implement user authentication

Add more complex aggregation queries

Create database backup scripts

📚 Resources
MongoDB Documentation

MongoDB University

Node.js MongoDB Driver Docs

🤝 Contributing
Feel free to submit issues and enhancement requests!

📄 License
This project is open source and available under the MIT License.

Happy Coding! 🎉