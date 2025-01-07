const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send('Invalid token');
        }
        req.userId = decoded.id; 
        console.log('User  ID from token:', req.userId);
        next();
    })}; 

module.exports = authMiddleware; 