const projectService = require("../services/project-service");

module.exports = (app) => {
    
    const service = new projectService();
    app.use('/app-events',async (req,res,next) => {

        const { payload } = req.body;
        console.log(payload);
        res.json(payload);

    });

}