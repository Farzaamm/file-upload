const userService = require('../lib/user');

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
            const user = await userService.createUser({ username, password });
            res.redirect('/login');
        } catch (error) {
            console.error(error);
            res.render('auth/signup', { title: 'Sign up', errors: ['An error occurred while creating the user'] });
        }

    },
    handleLogin: (req, res) => {
        res.send('Sign in');
    },
    handleLogout: (req, res) => {
        res.send('Logout');
    }
}