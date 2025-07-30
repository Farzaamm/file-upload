const prisma = require('../lib/prisma');
exports.uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    if (!req.user || !req.user.id) {
        return res.status(401).send('Unauthorized: user not logged in.');
    }

    try {
        const file = req.file;
        if (!file || !file.buffer) {
            return res.status(400).send('No file data found.');
        }
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            return res.status(400).send('File size exceeds the limit of 5MB.');
        }
        // If folderId is not provided, find the user's default folder
        let folderId = parseInt(req.body.folderId, 10);
        // console.log(`______ uploadController.js -> (${file.originalname} uploaded) Folder ID: ${folderId}`);
        if (isNaN(folderId)) {
            const folder = await prisma.folder.findFirst({
                where: { userId: req.user.id }
            });
            if (!folder) {
                return res.status(400).send('No folder found for user.');
            }
            folderId = folder.id;
        }

        // Save the file to the database
        await prisma.file.create({
            data: {
                name: file.originalname,
                url: '',
                createdAt: new Date(),
                data: file.buffer,
                size: file.size,
                user: { connect: { id: req.user.id } },
                folder: { connect: { id: folderId } }
            }
        });

        res.redirect('/user');
    } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).send('Error uploading file.');
    }
};