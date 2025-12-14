import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path
      ? "text-primary-600 font-semibold"
      : "text-gray-600 hover:text-primary-600";

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <span className="text-xl font-extrabold text-gray-900">
            Green<span className="text-primary-600">India</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <nav className="hidden md:flex items-center gap-8 text-sm">
  <Link className={linkClass("/")} to="/">Home</Link>
  <Link className={linkClass("/how-it-works")} to="/how-it-works">How It Works</Link>
  <Link className={linkClass("/about")} to="/about">About</Link>
  <Link className={linkClass("/impact")} to="/impact">Impact</Link>
  <Link className={linkClass("/faq")} to="/faq">FAQ</Link>
</nav>

        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 rounded-full bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 shadow"
          >
            Get Started
          </Link>
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;
