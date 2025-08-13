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
    <nav className="bg-fuchsia-400 shadow-md px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={() => scrollToSection("current")}
            className="px-4 py-2 text-white hover:text-fuchsia-400 hover:bg-fuchsia-200 rounded-lg transition-colors font-medium text-center"
          >
            Current
          </button>
          <button
            onClick={() => scrollToSection("new")}
            className="px-4 py-2 text-white hover:text-fuchsia-400 hover:bg-fuchsia-200 rounded-lg transition-colors font-medium text-center"
          >
            New
          </button>
          <button
            onClick={() => scrollToSection("finished")}
            className="px-4 py-2 text-white hover:text-fuchsia-400 hover:bg-fuchsia-200 rounded-lg transition-colors font-medium text-center"
          >
            Finished
          </button>
        </div>
        <button
          onClick={onAddClick}
          className="px-4 py-2 bg-fuchsia-800 text-white hover:bg-fuchsia-600 rounded-lg transition-colors font-medium"
        >
          Add
        </button>
      </div>
    </nav>
  );
}