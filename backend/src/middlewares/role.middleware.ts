import { NextFunction, Request, Response } from "express";
import { sendApiResponse } from '../utils/ApiResponse';

const roleAuth = (...allowedRoles: string[]) => (req : Request, res: Response, next : NextFunction)=>{
    if(!req.user){
        return sendApiResponse(
            res,
            403,
            false,
            null, 
            'Unauthorized access'
        )
    }
     const role = req.user.role

     const isAllowed = allowedRoles.includes(role);

     if(!isAllowed){
        return sendApiResponse(
            res,
            403,
            false,
            null,
            'You are not authorized to access this path'
        )
     }
     next();
}

export default roleAuth