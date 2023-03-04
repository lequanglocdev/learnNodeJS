import express from "express";
import homController from "../cotroller/homeController";
import multer from 'multer'
import path from 'path'
var appRoot = require('app-root-path')
let router = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/image/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {

    router.get('/', homController.getHompage);
    router.get('/detail/user/:id', homController.getDetailPage);
    router.post('/create-new-user', homController.creatNewUser);
    router.post('/delete-user', homController.deleteUsers);
    router.get('/edit-user/:id', homController.editUsers);
    router.post('/update-user', homController.updateUsers);
    router.get('/test', (req, res) => {
        res.render('test/index.ejs')
    });
    router.get('/update-file', homController.getUpdateFile)
    router.post('/upload-profile-pic', upload.single('profile_pic'), homController.handleUploadFile)
    router.post('/upload-multiple-images', upload.array('multiple_images', 3), homController.upLoadMultipleFiles)
    return app.use('/', router);

}
export default initWebRoute;