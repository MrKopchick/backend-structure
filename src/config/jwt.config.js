var joi = require('joi');
const { jwtSecretShema } = require('./env.shema')

const { error, value } = jwtSecretShema.validate(orocess.env);

if(error){
    throw new Error(`jwt config error : ${error.message } `);
}


module.exports = {
    secret: value.JWT_SECRET,
    algorithm: 'HS256', // default
    expiresIn: '1h',
    
    audience: {
        admin: 'admin-access',
        user: 'user-access'
    },
    
    validateOptions: {
        ignoreExpiration: false,
        allowInvalid: false
    },
    
    roleMiddleware: (requiredRole) => (req, res, next) => {
        const token = req.headers.authorization?.replace('Bearer ', '');
        
        if (!token) return res.status(401).json({ error: 'Token required' });
        
        try {
            const decoded = jwt.verify(token, this.secret);
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