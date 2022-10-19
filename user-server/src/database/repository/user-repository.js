const mongoose = require('mongoose');
const { userModel, projectsModel } = require('../models');

//Dealing with data base operations
class userRepository {

    async createUser({ username, password, salt }){

        const user = new userModel({
            username,
            password,
            salt,
            projects: []
        })

        const userResult = await user.save();
        return userResult;
    }
    
    async createProjects({ _id, project, role}){
        
        const profile = await userModel.findById(_id);
        
        if(profile){
            
            const newProjects = new projectsModel({
                project,
                role
            })

            await newProjects.save();

            profile.projects.push(newProjects);
        }

        return await profile.save();
    }

    async findUser({ username }){
        const existingUser = await userModel.findOne({ username: username });
        return existingUser;
    }

    async findUserById({ id }){

        const existingUser = await userModel.findById(id).populate('projects');
        // existingCustomer.cart = [];
        // existingCustomer.orders = [];
        // existingCustomer.wishlist = [];

        // await existingCustomer.save();
        return existingUser;
    }
}

module.exports = userRepository;