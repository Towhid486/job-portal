import jwt from 'jsonwebtoken';

export const EncodeToken=(email,user_id)=>{
    let KEY=process.env.JWT_SECRET_KEY;
    let EXPIRE={expiresIn: '30d'}
    let PAYLOAD={email:email, user_id:user_id}
    return jwt.sign(PAYLOAD,KEY,EXPIRE)
} 

export const DecodeToken=(token)=>{
    try {
        let KEY=process.env.JWT_SECRET_KEY;
        return jwt.verify(token,KEY)
    } 
    catch (e) {
        return null
    }
}