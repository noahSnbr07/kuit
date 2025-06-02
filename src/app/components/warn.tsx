'use client';

import { TriangleAlert } from "lucide-react";

interface _props {
    message: string;
}

export default function Warn({ message }: _props) {


    return (
        <span className="flex gap-2 items-center">
            <TriangleAlert size={14} color="#FFC800FF" />
            <i className="text-sm text-warn"> {message} </i>
        </span>
    );
}