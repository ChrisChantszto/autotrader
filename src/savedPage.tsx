import React from 'react';
import { useNavigate } from 'react-router-dom';

function SavedPage() {
  const navigate = useNavigate();

  // Handle Sign In / Register Button Click
  const handleSignIn = () => {
    navigate('/sign-in'); // Redirect to the sign-in or registration page
  };

  return (
    <main
      id="content"
      className="main__content bg-gray-100 min-h-screen flex items-start justify-center pt-16"
    >
      <article className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        {/* Tabs */}
        <ul className="flex border-b justify-center">
          <li className="px-6 py-3 border-b-2 border-blue-500 font-bold">
            <a href="/secure/saved-adverts" className="text-blue-500">
              Adverts
            </a>
          </li>
          <li className="px-6 py-3">
            <a href="/secure/saved-searches" className="text-gray-500 hover:text-blue-500">
              Searches
            </a>
          </li>
        </ul>

        {/* Saved Adverts Section */}
        <section className="mt-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Save your favourite adverts</h3>
          <p className="text-gray-700 text-lg">
            Save an advert, and view across all your devices.
          </p>

          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Manage your saved adverts</h3>
            <p className="text-gray-700 text-lg mb-6">
              Simply sign in or register to manage your saved adverts.
            </p>
            <button
              onClick={handleSignIn}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 mx-auto block"
            >
              Sign in / Register
            </button>
          </div>
        </section>
      </article>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21.29 17.6999L12 8.21986L2.71004 17.6999L1.29004 16.2999L12 5.35986L22.71 16.2999L21.29 17.6999Z"></path>
        </svg>
      </button>
    </main>
  );
}

export default SavedPage;