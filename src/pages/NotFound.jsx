import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF6EF] px-[5.5%] py-8">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-12">
        <Link to="/" className="hover:text-gray-600 transition-colors">Home</Link>
        <span className="mx-1">/</span>
        <span>Page not found</span>
      </nav>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-start gap-12 max-w-5xl">

        {/* Left: Text */}
        <div className="flex-1 max-w-sm">
          {/* 404 number */}
          <h1
            className="text-[110px] leading-none text-[#B5441A] mb-4 select-none"
            style={{ fontFamily: 'var(--font-story)' }}
          >
            404
          </h1>

          {/* Heading */}
          <h2
            className="text-[32px] font-normal text-[#1a1a1a] mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-story)' }}
          >
            A loose thread.
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-500 leading-relaxed mb-8">
            We couldn't find this page. It may have moved, or the address might need
            another look.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#B5441A] hover:bg-[#9a3815] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
            >
              Return home →
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center text-sm font-medium text-[#1a1a1a] border border-[#c8c4be] hover:border-[#1a1a1a] px-5 py-2.5 rounded-full transition-colors bg-white"
            >
              Shop all pieces
            </Link>
          </div>

          {/* Footer links */}
          <div>
            <p className="text-xs text-gray-400 mb-2">A few familiar places to find your way.</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/categories" className="text-xs text-[#B5441A] hover:underline underline-offset-2">
                Women
              </Link>
              <Link to="/categories" className="text-xs text-[#B5441A] hover:underline underline-offset-2">
                Men
              </Link>
              <Link to="/categories" className="text-xs text-[#B5441A] hover:underline underline-offset-2">
                Kids
              </Link>
              <Link to="/help" className="text-xs text-[#B5441A] hover:underline underline-offset-2">
                Visit help →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block flex-shrink-0 w-[380px]">
          <img
            src="/ce36b5575235158056ba681b0c25c7743486fe47.jpg"
            alt="Fabric texture"
            className="w-full h-[320px] object-cover rounded-2xl"
          />
        </div>

      </div>
    </div>
  );
}
