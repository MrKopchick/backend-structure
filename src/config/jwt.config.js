var joi = require('joi');
const { envSchema } = require('./env.schema');

const { error, value } = envSchema.validate(process.env);

if(error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    secret: value.JWT_SECRET,
    algorithm: 'HS256',
    expiresIn: '1h',
    
    audience: {
        admin: 'admin-access',
        user: 'user-access'
    },
    
    validateOptions: {
        ignoreExpiration: false,
        allowInvalid: false
    },
}

module.exports = {
    config,
    roleMiddleware: (requiredRole) => (req, res, next) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) return res.status(401).json({ error: 'Token required' });
    
    try {
        const decoded = jwt.verify(token, config.secret);
        if (decoded.type !== requiredRole) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
}

/// <summary>

/// <example>
/// Example of generation
/// <code>
// const { secret, expiresIn } = require('../config/jwt.config');
// 
// function generateToken(userId, userType) {
//   return jwt.sign(
//     { id: userId, type: userType },
//     secret,
//     { expiresIn }
//   );
// }
/// </code>
/// </example>

/// </summary>