// queries.js
// MongoDB queries for book collection operations

const { MongoClient } = require('mongodb');

// Connection details
const url = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully\n');
    
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // ===== TASK 2: BASIC CRUD OPERATIONS =====
    console.log('=== TASK 2: BASIC CRUD OPERATIONS ===\n');

    // 1. Find all books in a specific genre
    console.log('1. Books in Fantasy genre:');
    const fantasyBooks = await collection.find({ genre: "Fantasy" }).toArray();
    fantasyBooks.forEach(book => {
      console.log(`   - ${book.title} by ${book.author}`);
    });

    // 2. Find books published after a certain year
    console.log('\n2. Books published after 2000:');
    const recentBooks = await collection.find({ published_year: { $gt: 2000 } }).toArray();
    recentBooks.forEach(book => {
      console.log(`   - ${book.title} (${book.published_year})`);
    });

    // 3. Find books by a specific author
    console.log('\n3. Books by Stephen King:');
    const kingBooks = await collection.find({ author: "Stephen King" }).toArray();
    kingBooks.forEach(book => {
      console.log(`   - ${book.title}`);
    });

    // 4. Update the price of a specific book
    console.log('\n4. Updating price of "The Hobbit"...');
    const updateResult = await collection.updateOne(
      { title: "The Hobbit" },
      { $set: { price: 17.99 } }
    );
    console.log(`   Updated ${updateResult.modifiedCount} document(s)`);

    // Verify the update
    const updatedBook = await collection.findOne({ title: "The Hobbit" });
    console.log(`   New price: $${updatedBook.price}`);

    // 5. Delete a book by its title
    console.log('\n5. Deleting "The Da Vinci Code"...');
    const deleteResult = await collection.deleteOne({ title: "The Da Vinci Code" });
    console.log(`   Deleted ${deleteResult.deletedCount} document(s)`);

    // ===== TASK 3: ADVANCED QUERIES =====
    console.log('\n\n=== TASK 3: ADVANCED QUERIES ===\n');

    // 1. Books in stock and published after 2010
    console.log('1. Books in stock published after 2010:');
    const inStockRecent = await collection.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    inStockRecent.forEach(book => {
      console.log(`   - ${book.title} (${book.published_year})`);
    });

    // 2. Using projection to return only title, author, and price
    console.log('\n2. Books with projection (title, author, price only):');
    const projectedBooks = await collection.find(
      { genre: "Fiction" },
      { projection: { title: 1, author: 1, price: 1, _id: 0 } }
    ).toArray();
    console.log(projectedBooks);

    // 3. Sorting by price (ascending and descending)
    console.log('\n3. Books sorted by price (ascending):');
    const ascendingPrice = await collection.find({})
      .sort({ price: 1 })
      .project({ title: 1, price: 1, _id: 0 })
      .toArray();
    console.log(ascendingPrice);

    console.log('\n4. Books sorted by price (descending):');
    const descendingPrice = await collection.find({})
      .sort({ price: -1 })
      .project({ title: 1, price: 1, _id: 0 })
      .toArray();
    console.log(descendingPrice);

    // 4. Pagination with limit and skip
    console.log('\n5. Pagination - Page 1 (5 books):');
    const page1 = await collection.find({})
      .sort({ title: 1 })
      .limit(5)
      .project({ title: 1, author: 1, _id: 0 })
      .toArray();
    console.log(page1);

    console.log('\n6. Pagination - Page 2 (5 books):');
    const page2 = await collection.find({})
      .sort({ title: 1 })
      .skip(5)
      .limit(5)
      .project({ title: 1, author: 1, _id: 0 })
      .toArray();
    console.log(page2);

    // ===== TASK 4: AGGREGATION PIPELINE =====
    console.log('\n\n=== TASK 4: AGGREGATION PIPELINE ===\n');

    // 1. Average price by genre
    console.log('1. Average price by genre:');
    const avgPriceByGenre = await collection.aggregate([
      {
        $group: {
          _id: "$genre",
          averagePrice: { $avg: "$price" },
          bookCount: { $sum: 1 }
        }
      },
      {
        $sort: { averagePrice: -1 }
      }
    ]).toArray();
    console.log(avgPriceByGenre);

    // 2. Author with most books
    console.log('\n2. Author with most books:');
    const authorMostBooks = await collection.aggregate([
      {
        $group: {
          _id: "$author",
          bookCount: { $sum: 1 }
        }
      },
      {
        $sort: { bookCount: -1 }
      },
      {
        $limit: 3
      }
    ]).toArray();
    console.log(authorMostBooks);

    // 3. Books grouped by publication decade
    console.log('\n3. Books by publication decade:');
    const booksByDecade = await collection.aggregate([
      {
        $project: {
          title: 1,
          published_year: 1,
          decade: {
            $subtract: [
              "$published_year",
              { $mod: ["$published_year", 10] }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$decade",
          bookCount: { $sum: 1 },
          books: { $push: "$title" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();
    console.log(booksByDecade);

    // ===== TASK 5: INDEXING =====
    console.log('\n\n=== TASK 5: INDEXING ===\n');

    // 1. Create index on title field
    console.log('1. Creating index on title field...');
    await collection.createIndex({ title: 1 });
    console.log('   Index created on title field');

    // 2. Create compound index on author and published_year
    console.log('\n2. Creating compound index on author and published_year...');
    await collection.createIndex({ author: 1, published_year: 1 });
    console.log('   Compound index created on author and published_year');

    // 3. Demonstrate performance improvement with explain()
    console.log('\n3. Performance comparison with explain():');
    
    // Without index (simulate by using a field without index)
    console.log('   Query without specific index:');
    const withoutIndex = await collection.find({ pages: { $gt: 300 } })
      .explain('executionStats');
    console.log(`   Documents examined: ${withoutIndex.executionStats.totalDocsExamined}`);
    
    // With index
    console.log('\n   Query using title index:');
    const withIndex = await collection.find({ title: "The Hobbit" })
      .explain('executionStats');
    console.log(`   Documents examined: ${withIndex.executionStats.totalDocsExamined}`);
    console.log(`   Index used: ${withIndex.executionStats.executionStages.inputStage.indexName}`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed');
  }
}

// Run all queries
runQueries();