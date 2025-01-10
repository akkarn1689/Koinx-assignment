// utils/password.utils.js
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

module.exports = {hashPassword, comparePassword}