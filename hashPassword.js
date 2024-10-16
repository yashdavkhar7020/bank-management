// backend/hashPassword.js

const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(plainPassword, salt);
    console.log(hashed);
};

hashPassword('adminpassword'); // Replace 'adminpassword' with your desired password
