import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function MainWrapper({ children }: Props) {
    return (
        <main className="main">
            {children}
        </main>
    );
}