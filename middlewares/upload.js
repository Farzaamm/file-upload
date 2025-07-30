const multer = require('multer');

// Store file in memory as buffer
const storage = multer.memoryStorage();

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

module.exports = upload;



// saving files to disk
/*
const fs = require('fs');
const multer = require('multer');

// Create absolute path to uploads folder
const uploadPath = 'uploads';

// Create folder if it doesn't exist
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;
*/