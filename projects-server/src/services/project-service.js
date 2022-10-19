const { useImperativeHandle } = require("react");
const { ProjectRepository } = require("../database");

// All Business logic will be here
class projectService {

    constructor(){
        this.repository = new ProjectRepository();
    }

    async GetProject(userInputs){

        const { project } = userInputs;
        
        const existingProject = await this.repository.findProject({project});

        if(existingProject){
                return FormateData({id: existingProject._id, systems });
                } else {
            return FormateData("project doesnt exist")
        }

        return FormateData(null);
    }

    

    async createProject(userInputs){
        
        const { project } = userInputs;
        const findingProject = await this.repository.findProject({project});

        if(findingUser){
            console.log("project exists")
            return FormateData("project already exists");
        } else {
        
        const newProject = await this.repository.createProject({ project });
        return FormateData({id: newProject._id });
    }

    }

    async addNewSystem(userInputs){
        
        const { project, system } = userInputs;
    
        const systemResult = await this.repository.createSystem({ project, system})

        return FormateData(systemResult);
    }

    async GetProfile(id){

        const existingProject = await this.repository.findProjectById({id});
        return FormateData(existingProject);
    }

}

module.exports = projectService;