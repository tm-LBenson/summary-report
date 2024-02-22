function Header({ welcomeMessage, description }) {
  return (
    <header className="mx-auto mt-8 container flex flex-col items-center gap-8">
      <img className="max-w-36" src="CodeX-LogoBk.png" alt="Codex Logo" />
      <h1 className="text-6xl font-bold">{welcomeMessage}</h1>
      <p>{description}</p>
    </header>
  );
}

export default Header;
