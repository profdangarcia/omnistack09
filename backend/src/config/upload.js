const multer = require('multer');
const path = require('path');
module.exports = {
    storage: multer.diskStorage({
        //path.resolve deals with the problem of using '/' or '\' on a address this case means: ..\..\uploads or ../../uploads
        destination: path.resolve(__dirname, '..', '..', 'uploads'),

        //here we define the name of the file to be uploaded
        filename: (req, file, cb) => {
            //path.extname grabs the extension from the original file
            const ext = path.extname(file.originalname);
            //path.base grabs just the name and removes the second param, in this case the extension
            const name = path.basename(file.originalname, ext);
            //cb is the CALLBACK, we call it in the end
            //each ${} is a variable inside the string
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};