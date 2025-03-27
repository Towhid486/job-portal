import {Webhook} from 'svix'
import userModel from '../models/UserModel.js';

// API Controller Function to Manage Clerk User with database
export const clerkWebHooks = async (req,res) =>{
    try {

        // Create a Svix instance with Clerk webHook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
         
        // Verifying Headers 
        await whook.verify(JSON.stringify(req.body),{
            'svix-id': req.headers["svix-id"],
            'svix-timestamp': req.headers["svix-timestamp"],
            'svix-signature': req.headers["svix-signature"]
        })

        // Getting Data from request body
        const {data, type} = req.body;

        //Switch for different Events
        switch (type) {
            case "user.created":{
                
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                    resume: ""
                }
                const reqBody = req.company;
                const dat = await userModel.create(userData)
                res.json({status:"Success",  messsage:"New User created", data:dat})
                break;
            }

            case "user.updated":{

                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name} ${data.last_name}`,
                    image: data.image_url,
                }
                const dat = await userModel.updateOne({_id:data.id},userData)
                res.json({status:"Success",messsage:"User Updated", data:dat})
                break;
            }

            case "user.deleted":{
                const dat = await userModel.deleteOne({_id:data.id})
                res.json({status:"Success", message:`${dat.name} user deleted`})
                break;
            }
            default:
                break;
        }

    } catch (err) {
        return res.json({status:'failed',message:"WebHooks Error", err:err},{
        });
    }
}