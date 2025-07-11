
module.exports = authController = {
    signup: (req, res) => {
        res.render('auth/signup', { title: 'Sign up' });
    },
    login: (req, res) => {
        res.render('auth/login', { title: 'Sign in' });
    },
    signupPost: (req, res) => {
        res.send('Sign up');
    },
    loginPost: (req, res) => {
        res.send('Sign in');
    },
    logout: (req, res) => {
        res.send('Logout');
    }
}