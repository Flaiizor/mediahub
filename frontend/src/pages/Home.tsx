import React from "react";
import CurrentMedia from "../components/CurrentMedia";
import NewMedia from "../components/NewMedia";
import FinishedMedia from "../components/FinishedMedia";

export default function Home() {
    return (
        <main style={{ paddingTop: "60px" }}>
            <section id="current" style={{ padding: "2rem 1rem" }}>
                <CurrentMedia />
            </section>

            <section id="new" style={{ padding: "2rem 1rem" }}>
                <NewMedia />
            </section>

            <section id="finished" style={{ padding: "2rem 1rem" }}>
                <FinishedMedia />
            </section>
        </main>
    );
}
