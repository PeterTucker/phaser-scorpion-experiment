import Controller from "./controller";
export default class HomeController extends Controller {
    constructor(router){
        super("home", router);
    }

    index(req, res, callback){
        this.renderView(res, "");
        callback();
    }

    about(req, res, callback){
        this.renderView(res, "about");
        callback();
    }

    error(req, res, callback, data){
        if(!res.headersSent){
            this.renderView(res, "error", data);
            callback();
        }
    }
}