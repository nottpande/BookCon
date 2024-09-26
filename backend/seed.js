const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const Book = require("./models/book");
const Order = require("./models/order");

// Connect to the database
mongoose
    .connect("mongodb://localhost:27017/bookstore", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Sample data for books
const booksData = [
    {
        url: "https://m.media-amazon.com/images/I/41IkR2Ml51L._SY445_SX342_.jpg",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 249,
        description: "A novel about the American dream.",
        language: "English",
    },
    {
        url: "https://m.media-amazon.com/images/I/712HEn9SNwL._SY466_.jpg",
        title: "Half Girlfriend",
        author: "Chetan Bhagat",
        price: 399,
        description: "A story of Bihari boy Madhav, who falls in love with Riya",
        language: "English",
    },
    {
        url: "https://m.media-amazon.com/images/I/51yMba1xEfL._SY445_SX342_.jpg",
        title: "2 States",
        author: "Chetan Bhagat",
        price: 399,
        description: "A story about two lovers, from two different states, having cultural differences.",
        language: "English",
    },
    {
        url: "https://m.media-amazon.com/images/I/51obIvQfm3L._SY445_SX342_.jpg",
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        price: 449,
        description: "The Dark Lord is breathing fear into everything Harry loves, and to stop him Harry will have to find and destroy the remaining Horcruxes.",
        language: "English",
    },
    {
        url: "https://m.media-amazon.com/images/I/51BEMPE1tJL._SY445_SX342_.jpg",
        title: "Harry Potter and the Cursed Child",
        author: "J.K. Rowling",
        price: 449,
        description: "The Dark Lord is breathing fear into everything Harry loves, and to stop him Harry will have to find and destroy the remaining Horcruxes.",
        language: "English",
    },
    {
        url: "https://m.media-amazon.com/images/I/818umIdoruL._SY466_.jpg",
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
        price: 449,
        description: "The Dark Lord is breathing fear into everything Harry loves, and to stop him Harry will have to find and destroy the remaining Horcruxes.",
        language: "English",
    },
    {
        url: "https://m.media-amazon.com/images/I/91G+QE3U5KL._SY466_.jpg",
        title: "Percy Jackson and the Olympians: The Chalice of the Gods",
        author: "Rick Riordan",
        price: 499,
        description: "Percy Jackson has saved the world multiple times - battling monsters, Titans, even giants - but these days the modern-day son of Poseidon is hoping for a regular final year at school. Too bad the Greek gods have other plans, and three new quests for Percy to complete.",
        language: "English",
    },
    {
        url: "https://m.media-amazon.com/images/I/81DQblziYaL._SY466_.jpg",
        title: "Percy Jackson and the Greek Gods",
        author: "Rick Riordan",
        price: 499,
        description: "Want to know how Zeus came to be top god? How many times Kronos ate one of his own kids? How Athena literally burst out of another god's head?",
        language: "English",
    },
    {
        url: "https://tse1.mm.bing.net/th?id=OIP.Ze9xLuFqT-On5MXEKOqJuwAAAA&pid=Api&P=0&h=180",
        title: "Twilight",
        author: "Stephenie Meyer",
        price: 499,
        description: "Twilight by Stephenie Meyer is a captivating blend of romance, mystery, and supernatural elements. The story follows Bella Swan, a high school girl who moves to the small town of Forks and unexpectedly falls in love with Edward Cullen, a handsome and mysterious vampire. As Bella navigates the complexities of her feelings, she discovers dark secrets about Edward's world, where danger and love collide. This bestselling novel will immerse you in a world of forbidden romance, thrilling suspense, and unforgettable characters. Perfect for fans of fantasy and young adult fiction!",
        language: "English",
    },
    {
        url: "https://d3525k1ryd2155.cloudfront.net/f/788/220/9780517220788.RH.0.x.jpg",
        title: "The Complete Sherlock Holmes",
        author: "Sir Arthur Conan Doyle",
        price: 599,
        description: "The Complete Sherlock Holmes by Sir Arthur Conan Doyle is an essential collection for mystery lovers, featuring all four novels and 56 short stories of the legendary detective, Sherlock Holmes. Set in the foggy streets of Victorian London, Holmes, with his unparalleled intellect and keen observation skills, solves some of the most complex and baffling cases alongside his loyal friend, Dr. Watson. From *The Hound of the Baskervilles* to *A Study in Scarlet*, this timeless anthology offers gripping tales of deduction, intrigue, and masterful storytelling, making it a must-have for any crime fiction enthusiast.",
        language: "English",
    },
    {
        url: "https://i.pinimg.com/originals/72/ac/a8/72aca82f938cb0c38de0ee5f0a6094d1.jpg",
        title: "The Maze Runner",
        author: "James Dashner",
        price: 499,
        description: "The Maze Runner by James Dashner is a gripping dystopian thriller that will keep you on the edge of your seat. When Thomas wakes up in a mysterious, ever-changing maze with no memory of his past, he quickly realizes that survival depends on working with a group of other teens to escape. But as they navigate deadly obstacles and confront unknown dangers, they discover that their situation is far more complex than they could have ever imagined. Packed with action, suspense, and unexpected twists, this bestselling novel is perfect for fans of fast-paced, post-apocalyptic adventures.",
        language: "English",
    },
    {
        url: "https://tse2.mm.bing.net/th?id=OIP.kdrgeYW8Ko00iOTZuWYXeAHaKW&pid=Api&P=0&h=180",
        title: "Ikigai",
        author: "Héctor García and Francesc Miralles",
        price: 599,
        description: "Ikigai: The Japanese Secret to a Long and Happy Life by Héctor García and Francesc Miralles explores the ancient Japanese philosophy of finding purpose and joy in everyday life. Drawing from the wisdom of Okinawa, the place with the highest life expectancy, the authors reveal how discovering your 'ikigai' — your reason for being — can lead to a more fulfilling, balanced, and content life. This beautifully written book offers practical tips on how to achieve health, happiness, and longevity, making it a must-read for anyone seeking deeper meaning and lasting joy.",
        language: "English",
    },
];

// Sample data for users (with cart and favorite books)
const usersData = [
    {
        username: "john_doe",
        email: "john@gmail.com",
        password: "hashed_password1", // In production, use bcrypt
        address: "123 Main St, New York, NY",
        avatar: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        role: "buyer",
        favourite: [],
        cart: [],
        orders: [],
    },
    {
        username: "jane_doe",
        email: "jane@gmail.com",
        password: "hashed_password2",
        address: "456 Elm St, Los Angeles, CA",
        avatar: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        role: "buyer",
        favourite: [],
        cart: [],
        orders: [],
    },
    {
        username: "admin_bookcon",
        email: "admin.bookcon@gmail.com",
        password: "admin_bookcon",
        address: "456 Elm St, Los Angeles, CA",
        avatar: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        role: "admin",
        favourite: [],
        cart: [],
        orders: [],
    },
];

// Function to seed data
const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Book.deleteMany({});
        await Order.deleteMany({});
        
        console.log("Inserting seed-data into the database");
        // Hash the users' passwords
        for (let user of usersData) {
            const salt = await bcrypt.genSalt(10);  // Generate salt, salt is a random value added to the password.
            user.password = await bcrypt.hash(user.password, salt); // Hash the password
        }
        
        // Insert books
        const books = await Book.insertMany(booksData);
        console.log("Books seeded:", books);

        // Modify the users' cart and favourite fields with book references
        usersData[0].cart = [books[0]._id, books[1]._id]; // John has 2 books in cart
        usersData[0].favourite = [books[2]._id]; // John favorites 1 book
        usersData[1].cart = [books[2]._id, books[3]._id]; // Jane has 2 books in cart
        usersData[1].favourite = [books[0]._id, books[1]._id]; // Jane favorites 2 books

        // Insert users
        const users = await User.insertMany(usersData);
        console.log("Users seeded:", users);

        // Sample order data with references to user and books
        const ordersData = [
            {
                user: users[0]._id,
                username : users[0].username,
                book: books[0]._id,
                bookname: books[0].title,
                status: "Order placed",
            },
            {
                user: users[1]._id,
                username: users[1].username,
                book: books[1]._id,
                bookname : books[1].title,
                status: "Out for delivery",
            },
            {
                user: users[0]._id,
                username: users[0].username,
                book: books[2]._id,
                bookname : books[2].title,
                status: "Delivered",
            },
        ];

        // Insert orders
        const orders = await Order.insertMany(ordersData);
        console.log("Orders seeded:", orders);

        // Update users with orders after inserting them
        users[0].orders = [orders[0]._id, orders[2]._id]; // John has 2 orders
        users[1].orders = [orders[1]._id]; // Jane has 1 order

        // Save users with updated order data
        await users[0].save();
        await users[1].save();

        console.log("Users updated with orders, cart, and favorites:", users);
        console.log("Seed Data has been inserted into the database!")
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.connection.close();
    }
};

seedData();
