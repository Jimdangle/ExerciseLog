require('dotenv').config();

const saltRounds = process.env.SALT_ROUNDS;

module.exports = {
    saltRounds: saltRounds
}