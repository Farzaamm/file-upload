const bcryptjs = require('bcryptjs');

exports.hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}
exports.comparePassword = async (password, hashedPassword) => {
    return await bcryptjs.compare(password, hashedPassword);
}
// exports.generateRandomString = (length = 10) => {
//     return [...Array(length)].map(() => Math.random().toString(36)[2]).join('');
// }