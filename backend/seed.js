const mongoose = require("mongoose");
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
        title: "To Kill a Mockingbird",
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
        email: "john@example.com",
        password: "hashed_password1", // In production, use bcrypt
        address: "123 Main St, New York, NY",
        avatar: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        role: "user",
        favourite: [],
        cart: [],
        orders: [],
    },
    {
        username: "jane_doe",
        email: "jane@example.com",
        password: "hashed_password2",
        address: "456 Elm St, Los Angeles, CA",
        avatar: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        role: "user",
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
                book: books[0]._id,
                status: "Order placed",
            },
            {
                user: users[1]._id,
                book: books[1]._id,
                status: "Out for delivery",
            },
            {
                user: users[0]._id,
                book: books[2]._id,
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

        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding data:", error);
        mongoose.connection.close();
    }
};

seedData();
