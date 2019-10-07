
//creating an instance from User Model (uppercase)
const User = require('../models/User');

//default methods on controller: index, show, store, update, destroy

module.exports = {
    //async means the function can take a while to execute
    async store(req, res){
        // const email = req.body.email;
        //option above can be switched with unstructuring feature of JS, see bellow
        const { email } = req.body;

        //creating the new user, 'await' forces to wait until the command has been executed
        //(only for async functions)
        // const user = await User.create({ email });

        //validating if the email already exists
        let user = await User.findOne({ email });

        if(!user){
            user = user = await User.create({ email });
        }

        return res.json(user);
    }
};