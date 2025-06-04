'use server';
import React from "react";
import Wrapper from "../components/wrapper";


interface _props {
    children: React.ReactNode;
}

export default async function layout({ children }: _props) {


    return (
        <Wrapper title="Feedback">
            {children}
        </Wrapper>
    );
}