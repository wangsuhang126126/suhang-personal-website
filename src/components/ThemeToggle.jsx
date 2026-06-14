export default function ThemeToggle({ theme, onToggle }) {
  const nextTheme = theme === "light" ? "Graphite Dark" : "Silver Light";
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} theme`}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
    >
      ◐
    </button>
  );
}
