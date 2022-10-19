const userService = require("../services/user-service");

module.exports = (app) => {
    
    const service = new userService();
    app.use('/app-events',async (req,res,next) => {

        const { payload } = req.body;
        console.log(payload);
        res.json(payload);

    });

}