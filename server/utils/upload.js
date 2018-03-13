
const multer  = require('multer')
// const upload = multer({dest: "../../uploads"})


let storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, './server/public/uploads');
    },
    filename: (req, file, callback) => {
        //callback(null, file.originalname + Date.now());

        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, `${basename}${Date.now()}${extension}`);
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fies: 10,
        fileSize: 1024 * 1024 * 1024
    }
});

module.exports = upload;


