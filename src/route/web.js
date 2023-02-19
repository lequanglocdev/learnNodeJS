import express from "express";
import homController from "../cotroller/homeController";
let router = express.Router();

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
    return app.use('/', router);

}
export default initWebRoute;