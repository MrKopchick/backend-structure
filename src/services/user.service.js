const { db } = require('../config/db.config');
const jwt = require('jsonwebtoken');
const { config } = require('../config/jwt.config');
const ApiError = require('../utils/apiError');

class UserService {
    async createUser(userData){
        try{

            userData.balance = 0;
            const [ newUser ] = await db('user').insert(userData).returning('*');

            newUser.createdAt = newUser.created_at;
            newUser.updatedAt = newUser.updated_at;
            delete newUser.created_at;
            delete newUser.updated_at;

            const token = jwt.sign(
                { id: newUser.id, type: newUser.type },
                config.secret,
                { expiresIn: config.expiresIn } 
            );

            return {
                ...newUser,
                accessToken: token
            };

        }catch(err){
            if (err.code === '23505') {
                throw new ApiError(400, err.detail);
            }
            console.log(err);
            throw new ApiError(500, 'Internal Server Error');
        }
    }

    async updateUser(userId, updateData){
        try {
            const [updatedUser] = await db('user')
                .where('id', userId)
                .update(updateData)
                .returning('*');

            if (!updatedUser) {
                throw new ApiError(404, 'User not found');
            }

            return updatedUser;
        } catch (err) {
            if (err.code === '23505') {
              throw new ApiError(400, err.detail);
        }
            console.log(err);
            throw new ApiError(500, 'Internal Server Error');
        }
    }


    async getUserById(userId) {
        try {
            const user = await db('user').where('id', userId).first();

            if (!user) {
            throw new ApiError(404, 'User not found');
            }

            return user;
        } catch (err) {
            if (err instanceof ApiError) {
            throw err;
            }
            console.log(err);
            throw new ApiError(500, 'Internal Server Error');
        }
    }


}

module.exports = new UserService();