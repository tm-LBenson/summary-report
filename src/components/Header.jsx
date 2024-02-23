function Header({ welcomeMessage, description, sidebar }) {
  return (
    <div className="flex">
    {sidebar &&  <div className="w-64 h-96 reletive top-0" aria-hidden="true"></div>}
      <header className="mx-auto mt-8 container flex flex-col items-center gap-8">
        <img className="max-w-36" src="CodeX-LogoBk.png" alt="Codex Logo" />
        <h1 className="text-6xl font-bold">{welcomeMessage}</h1>
        <p>{description}</p>
      </header>
    </div>
  );
}

export default Header;
