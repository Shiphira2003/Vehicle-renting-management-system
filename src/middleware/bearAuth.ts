import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

declare global{
    namespace Express{
        interface Request{
            user?: DecodedToken
        }
    }
}

type DecodedToken = {
    userId:number,
    email:string,
    role: string,
    firstName: string,
    lastname:string,
    exp: number
}

//AUTHENTICATION MIDDLEWARE
export const verifyToken = async(token:string,secret:string)=>{
    try {
        const decoded = jwt.verify(token,secret) as DecodedToken
        return decoded;
    } catch (error) {
        return null;
    }
}

//AUTHORIZATION MIDDLEWARE
export const authMiddleware = async(req: Request, res: Response,requiredRoles:string)=>{
    const token = req.header('Authorization')
    if(!token){
        res.status(401).json({error:"Authorization header is missing"});
        return;
    }

    const decodedToken = await verifyToken(token,process.env.JWT_SECRET as string)

    if(!decodedToken){
        res.status(401).json({error:"Ivalid or expired token"})
    }

    const role = decodedToken?.role;

    if(requiredRoles === "both" && (role=== "admin" || role === "member")){
        if(decodedToken?.role === "admin" || decodedToken?.role === "member"){
            req.user === decodedToken;
           
            return;
        }
    }else if(role === requiredRoles){
         req.user === decodedToken;
        
         return;
    }else{
        res.status(403).json({error: "Forbidden: You do not have permission to access this resource"})
    }

}


//Middleware to check if the user is admin
export const adminRoleAuth = async (req: Request, res: Response) => await authMiddleware(req,res,"admin")
export const memberRoleAuth = async (req: Request, res: Response) => await authMiddleware(req,res,"member")
export const bothRoleAuth = async (req: Request, res: Response) => await authMiddleware(req,res,"both")