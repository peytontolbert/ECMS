const userService = require('../services/user-service');
const  UserAuth = require('./middlewares/auth');
const { SubscribeMessage } = require('../utils');


module.exports = (app, channel) => {
    
    const service = new userService();

    // To listen
    SubscribeMessage(channel, service);


    app.post('/register', async (req,res,next) => {
        const { username, password } = req.body;
        const { data } = await service.SignUp({ username, password }); 
        res.json(data);

    });

    app.post('/login',  async (req,res,next) => {
        
        const { username, password } = req.body;

        const { data } = await service.Login({ username, password});

        res.json(data);

    });

    app.post('/projects', UserAuth, async (req,res,next) => {
        
        const { _id } = req.user;


        const { project, role } = req.body;

        const { data } = await service.addNewProject( _id ,{ project, role });

        res.json(data);

    });
     

    app.get('/profile', UserAuth ,async (req,res,next) => {

        const { _id } = req.user;
        const { data } = await service.GetProfile({ _id });
        res.json(data);
    });

    app.get('/whoami', (req,res,next) => {
        return res.status(200).json({msg: '/user : I am User Service'})
    })
}