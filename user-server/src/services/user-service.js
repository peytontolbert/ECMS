const { useImperativeHandle } = require("react");
const { userRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');

// All Business logic will be here
class userService {

    constructor(){
        this.repository = new userRepository();
    }

    async Login(userInputs){

        const { username, password } = userInputs;
        
        const existingUser = await this.repository.findUser({username});

        if(existingUser){
            
            const validPassword = await ValidatePassword(password, existingUser.password, existingUser.salt);
            if(validPassword){
                const token = await GenerateSignature({ username: existingUser.username, _id: existingUser._id});
                return FormateData({id: existingUser._id, token });
            } else {
                return FormateData("Wrong password"); 
                }
        } else {
            return FormateData("user doesnt exist")
        }

        return FormateData(null);
    }

    

    async SignUp(userInputs){
        
        const { username, password } = userInputs;
        
        // create salt
        let salt = await GenerateSalt();
        
        let userPassword = await GeneratePassword(password, salt);
        const findingUser = await this.repository.findUser({username});

        if(findingUser){
            console.log("user exists")
            return FormateData("user already exists");
        } else {
        
        const existingUser = await this.repository.createUser({ username, password: userPassword, salt});
        
        const token = await GenerateSignature({ username: username, _id: existingUser._id});
        return FormateData({id: existingUser._id, token });
    }

    }

    async addNewProject(_id,userInputs){
        
        const { project, role } = userInputs;
    
        const projectResult = await this.repository.createProject({ _id, project, role})

        return FormateData(projectResult);
    }

    async GetProfile(id){

        const existingUser = await this.repository.findUserById({id});
        return FormateData(existingUser);
    }

}

module.exports = userService;