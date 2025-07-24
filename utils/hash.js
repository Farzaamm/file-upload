const bcryptjs = require('bcryptjs');

exports.hashPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}
exports.comparePassword = async (password, hashedPassword) => {
    return await bcryptjs.compare(password, hashedPassword);
}