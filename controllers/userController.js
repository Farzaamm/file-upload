const prisma = require('../lib/prisma');
module.exports = {
    showUserProfile: async (req, res) => {
        if (!req.user) {
            console.log('User not authenticated, redirecting to login');
            return res.redirect('/');
        }
        const user = req.user;
        // console.log('User Profile:', user);
        try {
            // Fetch folders for the user, including their files
            const folders = await prisma.folder.findMany({
                where: { userId: user.id },
                include: { files: true }
            });
            const selectedFolder = await prisma.folder.findFirst({
                where: {
                    userId: user.id,
                    name: 'My Files'
                },
                include: { files: true }
            });
            res.render('user', {
                title: `${user.username}'s Profile`,
                user,
                folders,
                selectedFolder
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error loading profile');
        }
    },
    showFolder: async (req, res) => {
        // go thru the users folder and show the files
        if (!req.user) {
            console.log('User not authenticated, redirecting to login');
            return res.redirect('/auth/login');
        }
        const folderName = req.params.folderName;
        const user = req.user;
        // console.log(`______ userController.js -> (${folderName} clicked)Showing folder ${folderName} for user ${user.username} with ID ${user.id}`);
        try {
            const folder = await prisma.folder.findFirst({
                where: {
                    name: folderName,
                    userId: user.id
                },
                include: { files: true }
            });
            if (!folder) {
                return res.status(404).send('Folder not found');
            }
            res.send(`<h1>Files in ${folder.name}:</h1>
                <ul>
                    ${folder.files.map(file => `<li>${file.name} (${file.size} bytes)</li>`).join('')}
                </ul>`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error loading folder');
        }
    },
    createFolder: async (req, res) => {
        const { folderName } = req.body;
        if (!req.user) {
            return res.status(401).send('Unauthorized');
        }
        try {
            const folder = await prisma.folder.create({
                data: {
                    name: folderName,
                    user: { connect: { id: req.user.id } }
                }
            });
            res.redirect('/user');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error creating folder');
        }
    }
}