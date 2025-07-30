const prisma = require('./prisma');

async function createUser(userData) {
    return await prisma.user.create({
        data: userData
    });
}

async function findUserByUsername(username) {
    return await prisma.user.findUnique({
        where: { username }
    });
}

async function findUserById(id) {
    return await prisma.user.findUnique({
        where: { id }
    });
}

module.exports = {
    createUser,
    findUserByUsername,
    findUserById
}


