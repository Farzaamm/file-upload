
module.exports = {
    index: (req, res) => {
        res.render('index', { title: 'Index' });
    },
    about: (req, res) => {
        res.render('about', { title: 'About' });
    },
    contact: (req, res) => {
        res.render('contact', { title: 'Contact' });
    },
    terms: (req, res) => {
        res.render('terms', { title: 'Terms' });
    }
    
}