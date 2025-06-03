'use server';

export default async function getPrefix() {

    const env = process.env.NODE_ENV as string;

    if (env === "production") return "https://kuit-app.vercel.app";
    else return "http://localhost:3000";


}