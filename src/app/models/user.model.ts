import mongoose from "mongoose";
import bcrypt from "bcrypt"

interface User{
    name:string,
    username:string,
    isAdmin : boolean,
    
}