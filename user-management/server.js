const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
const PORT = 5500;

// Middleware
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

// Serve static files from the 'front-end' directory
app.use(express.static(path.join(__dirname, 'front-end')));

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to MySQL: ", db.threadId);

    // CREATE A DATABASE 
    db.query(`CREATE DATABASE IF NOT EXISTS user_management`, (err, result) => {
        if (err) return console.log(err);

        console.log("Database user_management created/checked");

        // Select database
        db.changeUser({ database: 'user_management' }, (err) => {
            if (err) return console.log(err);

            console.log("Changed to user_management");

            // Create users table
            const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            )
            `;
            db.query(createUsersTable, (err, result) => {
                if (err) return console.log(err);

                console.log("Users table created/checked");
            });
        });
    });
});

// Register Route
app.post('/api/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    // Check if user already exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserQuery, [email], (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (data.length) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 8);
        const user = { first_name, last_name, email, password: hashedPassword };

        db.query('INSERT INTO users SET ?', user, (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error registering user' });
            }
            res.status(201).json({ message: 'User registered successfully!' });
        });
    });
});

// Login Route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging in' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ accessToken: null, message: 'Invalid Password!' });
        }

        res.status(200).json({ message: 'Login successful', userId: user.id });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
