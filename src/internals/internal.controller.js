import { User } from "../users/user.model.js";

export const syncUserFromAuth = async (req, res) => {
    try {

        console.log("BODY RECIBIDO:");
        console.log(req.body);

        const {
            auth_id,
            name,
            surname,
            username,
            email,
            password,
            phone,
            status
        } = req.body;


        let user = await User.findOne({
            where: {
                auth_id
            }
        });


        if (!user) {

            user = await User.create({
                auth_id,
                name,
                surname,
                username,
                email,
                password,
                phone,
                status,
                role: "USER"
            });
        }


        return res.status(200).json({
            success: true,
            user
        });


    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};