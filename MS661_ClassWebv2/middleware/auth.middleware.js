const cache = require('../utils/cache.util');
const jwt = require('../utils/jwt.util');

module.exports = async (req, res, next) => {

    let token = req.headers.authorization;

    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        try {
            token = token.trim();
            /* ---------------------- Check For Blacklisted Tokens ---------------------- */
            const isBlackListed = await cache.get(token);

            if (isBlackListed) {
                return res.status(401).json({ message: 'Unauthorized - blacklisted' });
            }
            
            req.token = token;
            next();

        } catch (error) { 
            return res.status(401).json({ message: 'Unauthorized - error' });
        }
    } else {
        return res.status(400).json({ message: 'Authorization header is missing.' })
    }
}