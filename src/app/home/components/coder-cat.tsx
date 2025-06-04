'use server';
import { catCode } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";



export default async function CoderCat() {


    return (
        <div className="w-full flex flex-col gap-2">
            <Image
                className="rounded-md"
                src={catCode}
                title="Coder Cat"
                alt="Coder Cat"
            />
            <Link
                href={"/feedback"}>
                <b> Wanna participate? give feedback!  </b>
            </Link>
        </div>
    );
}