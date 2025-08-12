
interface NavBarProps {
    onAddClick: () => void;
}

export default function NavBar({ onAddClick }: NavBarProps) {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <nav>
            <button onClick={() => scrollToSection("current")}>Current</button>
            <button onClick={() => scrollToSection("new")}>New</button>
            <button onClick={() => scrollToSection("finished")}>Finished</button>
            <button onClick={onAddClick}>Add</button>
        </nav>
    );
}
