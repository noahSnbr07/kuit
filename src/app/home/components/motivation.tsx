'use server';
import { quotes } from "@/assets/assets";

export default async function Motivation() {

    const randomIndex: number = Math.floor(Math.random() * quotes.length);

    const quote = quotes[randomIndex];

    return (
        <i className="font-bold"> {quote} </i>
    );
}