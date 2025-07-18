import mongoose from "mongoose"
import { cache } from "react"

const MONGO_URI = process.env.MONGO_URI!

if(!MONGO_URI){
    throw new Error("Please define the MONGO_URI environment variable")
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectToDatabase() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = {
            bufferCommands: true, // Disable mongoose's buffering mechanism
            maxPoolSize: 10 // Maintain up to 10 connections in the pool
        }

    cached.promise = mongoose.connect(MONGO_URI, opts).then(() =>
        mongoose.connection
    )
    }

    try {
        cached.conn = await cached.promise
    }catch (error){
        cached.promise = null
        throw error
    }

    return cached.conn
}