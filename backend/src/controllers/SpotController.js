const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {

    async index(req, res){
        //using the query to filter the techs that will be show
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);

    },


    //this function will create the SPOTS that can be created in the APP
    async store(req, res){
        // console.log(req.body);
        // //req.file is from MULTER 
        // console.log(req.file);
        const { filename } = req.file;
        const { company, techs, price} = req.body;

        //user_id will be sent in the message header and will be used in the field 'user' inside mongodb
        const { user_id } = req.headers;

        //verify if the user who is signing up exists
        const user = await User.findById(user_id);

        if(!user){
            //there are a lot of error status to return
            return res.status(400).json({error: 'User does not exists'});
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            //a variavel tech sera transformada em um vetor separando as virgulas e eliminando espaços
            techs: techs.split(',').map(tech => tech.trim()),
            price
        });

        return res.json(spot);
    }
}