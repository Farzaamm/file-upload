const userService = require('../lib/user');
const { hashPassword, comparePassword } = require('../utils/hash');
const passport = require('passport');
const prisma = require('../lib/prisma');
require('../config/passport');

module.exports = authController = {
    renderSignupForm: (req, res) => {
        res.render('auth/signup', { title: 'Sign up' });
    },
    renderLoginForm: (req, res) => {
        res.render('auth/login', { title: 'Sign in' });
    },
    handleSignup: async (req, res) => {
        const { username, password, confirmPassword } = req.body;
        const errors = [];
        if (!username || !password || !confirmPassword) {
            errors.push('All fields are required');
        }
        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }
        if (errors.length > 0) {
            return res.render('auth/signup', { title: 'Sign up', errors });
        }
        const existingUser = await userService.findUserByUsername(username);
        if (existingUser) {
            return res.render('auth/signup', { title: 'Sign up', errors: ['Username already exists'] });
        }   
        try {
            const hashedPassword = await hashPassword(password);
            const user = await userService.createUser({ username, password: hashedPassword });

            try {
                const folder = await prisma.folder.create({
                    data: {
                        name: 'My Files',
                        user: { connect: { id: user.id } }
                    }
                });
                // console.log(`______ authController.js -> (Folder created) Folder ID: ${folder.id}`);
            } catch (err) {
                try {
                    const folder = await prisma.folder.findFirst({ where: { userId: user.id } });
                    if (folder) {
                        await prisma.file.deleteMany({ where: { folderId: folder.id } });
                        await prisma.folder.delete({ where: { id: folder.id } });
                    }
                    await prisma.user.delete({ where: { id: user.id } });
                } catch (cleanupErr) {
                    console.error('Error during cleanup:', cleanupErr);
                }
                throw err;
            }

            res.redirect('/auth/login');
        } catch (error) {
            console.error(error);
            res.render('auth/signup', { title: 'Sign up', errors: ['An error occurred while creating the user'] });
        }

    },
    handleLogin: (req, res, next) => {
        passport.authenticate('local', async (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.redirect('/auth/signup');

            req.logIn(user, async (err) => {
                if (err) return next(err);
                try {
                    let folders = await prisma.folder.findMany({
                        where: { userId: user.id },
                        include: { files: true }
                    });
                    if (folders.length === 0) {
                        const newFolder = await prisma.folder.create({
                            data: {
                                name: 'My Files',
                                user: { connect: { id: user.id } }
                            }
                        });
                        folders.push(newFolder);
                    }
                    res.render('user', { title: 'User Dashboard', user, folders, selectedFolder: folders[0] });
                } catch (error) {
                    console.error(error);
                    res.redirect('/auth/login');
                }
            });
        })(req, res, next);
    },
    handleLogout: (req, res) => {
        req.logout(err => {
            if (err) {
                console.error(err);
            }
            res.redirect('/auth/login');
        });
    }
}