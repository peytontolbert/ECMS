const projectService = require('../services/project-service');
const  projectAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');


module.exports = (app, channel) => {
    
    const service = new projectService();

    // To listen
    SubscribeMessage(channel, service);


    app.post('/newproject', async (req,res,next) => {
        const { project, managedBy } = req.body;
        const { data } = await service.createProject({ project, managedBy }); 
        res.json(data);

    });

    app.post('/getproject',  async (req,res,next) => {
        
        const { project } = req.body;

        const { data } = await service.GetProject({ project });

        res.json(data);

    });

    
    

    app.post('/newsystem', async (req,res,next) => {

        const { project, system } = req.body;

        const { data } = await service.addNewSystem({ project, system });

        res.json(data);

    });
     
    app.get('/whoami', (req,res,next) => {
        return res.status(200).json({msg: '/project : I am Project Service'})
    })
}