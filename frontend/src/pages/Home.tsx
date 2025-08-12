import MediaList from "../components/MediaList";

export default function Home({ refreshKey }: { refreshKey: number }) {
    return (
        <main style={{ paddingTop: "60px" }}>
            <section id="current" style={{ padding: "2rem 1rem" }}>
                <MediaList refreshKey={refreshKey} status="IN_PROGRESS" title="Current Media" emptyMessage="No media in progress." />
            </section>
            <section id="new" style={{ padding: "2rem 1rem" }}>
                <MediaList refreshKey={refreshKey} status="TO_EXPERIENCE" title="New Media" emptyMessage="No new media." />
            </section>
            <section id="finished" style={{ padding: "2rem 1rem" }}>
                <MediaList refreshKey={refreshKey} status="COMPLETED" title="Finished Media" emptyMessage="No finished media to show." />
            </section>
        </main>
    );
}
