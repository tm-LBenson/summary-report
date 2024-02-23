function Header({ welcomeMessage, description }) {
  return (
    <div className="flex">
      <header className="mx-auto mt-8 container flex flex-col items-center gap-8">
        <img className="max-w-36" src="CodeX-LogoBk.png" alt="Codex Logo" />
        <h1 className="text-6xl font-bold">{welcomeMessage}</h1>
        <div className="flex">
          <p className="w-3/4 mx-auto">{description}</p>
        </div>
      </header>
    </div>
  );
}

export default Header;
