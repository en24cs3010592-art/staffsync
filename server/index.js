import 'dotenv/config';
import mongoose from 'mongoose';
import {app} from './app.js';
if(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32)throw new Error('Set JWT_SECRET to at least 32 random characters in server/.env');
if(!process.env.MONGODB_URI)throw new Error('Set MONGODB_URI in server/.env');
await mongoose.connect(process.env.MONGODB_URI);
app.listen(process.env.PORT||5000,()=>console.log('StaffSync API ready'));
