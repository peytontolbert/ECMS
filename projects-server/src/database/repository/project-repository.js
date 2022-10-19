const mongoose = require('mongoose');
const { projectModel, systemModel } = require('../models');

//Dealing with data base operations
class ProjectRepository {
    async createProject({ project, managedBy }){
        const newproject = new projectModel({
            project,
            managedBy
        })

        const projectResult = await newproject.save();
        return projectResult;
    }
    
    async createSystems({ _id, system}){
        
        const profile = await projectModel.findById(_id);
        
        if(profile){
            
            const newSystem = new systemsModel({
                system
            })

            await newSystem.save();

            profile.systems.push(newSystem);
        }

        return await profile.save();
    }

    async findProject({ project }){
        const existingProject = await projectModel.findOne({ project: project });
        return existingProject;
    }

    async findProjectById({ id }){

        const existingProject = await projectModel.findById(id).populate('systems');
        // existingCustomer.cart = [];
        // existingCustomer.orders = [];
        // existingCustomer.wishlist = [];

        // await existingCustomer.save();
        return existingProject;
    }
}

module.exports = ProjectRepository;