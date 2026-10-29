import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {User,Employee,Manager,Announcement,Training} from './models.js';
await mongoose.connect(process.env.MONGODB_URI);
const password=process.env.SEED_PASSWORD;if(!password||password.length<8)throw Error('Set SEED_PASSWORD (8+ characters) in server/.env before seeding');
const accounts=[['HR Admin','hr@staffsync.test','hr','People Operations'],['Team Manager','manager@staffsync.test','manager','Engineering'],['Lucky Sharma','employee@staffsync.test','employee','Engineering']];
const users=[];
for(const [name,email,role,department] of accounts){let u=await User.findOne({email});if(!u)u=await User.create({name,email,role,department,password:await bcrypt.hash(password,12)});users.push(u);await Employee.updateOne({user:u.id},{$setOnInsert:{user:u.id}},{upsert:true});if(role==='manager')await Manager.updateOne({user:u.id},{$setOnInsert:{user:u.id}},{upsert:true});}
await Employee.updateOne({user:users[2].id},{$set:{manager:users[1].id}});
if(!await Announcement.exists({title:'Welcome to StaffSync'}))await Announcement.create({title:'Welcome to StaffSync',body:'Your people, your workday, one connected workspace. Start by completing your profile and checking in.',author:users[0].id});
if(!await Training.exists({title:'Getting started together'}))await Training.create({title:'Getting started together',description:'A team introduction to our tools, workflows and culture.',date:new Date(Date.now()+7*86400000).toISOString().slice(0,10),owner:users[1].id,attendees:users.map(u=>u.id)});
console.log('Three demo accounts ready. Use SEED_PASSWORD to log in.');await mongoose.disconnect();
