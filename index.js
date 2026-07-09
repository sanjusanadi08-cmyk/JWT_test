const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());          // allow the React app (different port) to call this API
app.use(express.json());  // parse JSON request bodies

const SECRET = 'playground-secret'; // in real apps, put this in an env variable

// Fake user "database" for the demo
const users = {
  alice: { password: '1234' }
};

// LOGIN: check credentials, hand back a signed JWT (the "wristband")
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (users[username]?.password === password) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid username or password' });
});

// Middleware: checks the wristband before letting the request through
function requireAuth(req, res, next) {
  const authHeader = req.headers['authorization']; // expect "Bearer <token>"
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // attach decoded payload (e.g. { username })
    next();
  });
}

// PROTECTED ROUTE: only reachable with a valid token
app.get('/profile', requireAuth, (req, res) => {
  res.json({ message: `Welcome back, ${req.user.username}!` });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));