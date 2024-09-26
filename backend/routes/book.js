const router = require("express").Router();
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");
const User = require("../models/user");

//create book -- admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });
        await book.save();
        return res.json({
            status: "Success",
            message: "Book added successfully!",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//update book --admin
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language,
        });

        return res.json({
            status: "Success",
            message: "Book Updated successfully!",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//delete book --admin
router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.json({
            status: "Success",
            message: "Book deleted successfully!",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//get all books
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//get recently added books
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Search for books by title
router.get('/search', async (req, res) => {
        try {
        const query = req.query.q; // Get the search query from the request
        if (!query) {
            return res.status(400).json({ message: 'Search query is required.' });
        }
    
        // Find books with titles matching the search query (case insensitive)
        const books = await Book.find({ title: { $regex: query, $options: 'i' } });
    
        if (books.length === 0) {
            return res.status(404).json({ message: 'No books found.' });
        }
    
        // Return the found books in JSON format
        return res.status(200).json(books);
        } catch (error) {
        return res.status(500).json({ message: 'Server error.', error: error.message });
        }
});
module.exports = router;
