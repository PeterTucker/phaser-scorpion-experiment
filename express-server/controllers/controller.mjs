export default class Controller {
    constructor(viewPath, router){
        this.viewPath = viewPath;
        this.router = router;
    }

    renderView(res, viewName, data = {}){
        if(viewName.length==0){
            viewName = "index";
        }
        
        let finalPath = this.viewPath + "/" + viewName;
        if(data["title"]==null){
            data["title"] = "My Project";
        }
        res.render(finalPath, data)
    }
}