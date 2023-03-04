import express from "express";
import apiController from "../cotroller/apiController"
let router = express.Router();

const initApiRoute = (app) => {
    router.get('/users', apiController.getAllUser); // methor get
    router.post('/create-users', apiController.createUser); // methor post
    router.put('/update-users', apiController.updateUser); // methor post
    router.delete('/delete-users/:id', apiController.deleteUser); // methor post


    return app.use('/api/v1', router);

}
export default initApiRoute;