const prisma = require('./prisma');

async function createUser(userData) {
    return await prisma.user.create({
        data: userData
    });
}

async function findUserByUsername(username) {
    try {
        return await prisma.user.findFirst({
            where: {
                username: {
                    equals: username,
                    mode: 'insensitive'
                }
            }
        });
    } catch (error) {
        console.error(error);
        return null;
    }
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


