'use server';
import Wrapper from "../components/wrapper";



interface _props {
    children: React.ReactNode
}

export default async function layout({ children }: _props) {

    return (
        <Wrapper
            title="Settings">
            {children}
        </Wrapper>
    );
}