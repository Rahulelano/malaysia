const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

/******************************************
    * 1. STORAGE CONFIGURATION
*******************************************/
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

/******************************************
    * 2. FILE TYPE VALIDATION
*******************************************/
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

/******************************************
    * 3. UPLOAD MIDDLEWARE
*******************************************/
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

/******************************************
    * 4. ROUTE HANDLER
*******************************************/
router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path.replace(/\\/g, '/')}`);
});

module.exports = router;
