import express from 'express';
import HomeController from '../controllers/home.controller';

const router = express.Router();
const home = new HomeController(router);


router.get('/', (req, res, callback) => home.index(req, res, callback));
router.get('/about', (req, res, callback) => home.about(req, res, callback));

// 404
router.use((req, res, callback) =>  home.error(req, res, callback,
    {
        title: "404 Error",
        flash: {
            type: "WARNING",
            message: " Oops looks like an error occured"
        }
    }
));

export default router;