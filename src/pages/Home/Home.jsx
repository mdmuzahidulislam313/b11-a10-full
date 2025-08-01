import { FaCalendarAlt, FaLightbulb, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import FeaturedGroups from "./FeaturedGroups";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <FeaturedGroups />

      <section className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-10 text-center text-indigo-800 dark:text-indigo-300">
            Why Choose <span className="text-indigo-600 dark:text-indigo-400">HobbyHub</span>?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <FaUsers className="text-3xl text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-center mb-3">Connect With Enthusiasts</h4>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Meet people who share your passion and form meaningful connections through common interests.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <FaCalendarAlt className="text-3xl text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-center mb-3">Regular Meetups</h4>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Participate in scheduled group activities and events organized by community members.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
                  <FaLightbulb className="text-3xl text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h4 className="text-xl font-semibold text-center mb-3">Learn & Grow</h4>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Develop your skills with guidance from experienced hobbyists in a supportive environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-10 text-center">Upcoming Events</h3>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <div>
                  <h4 className="text-2xl font-bold mb-2">Discover New Activities</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 max-w-2xl">
                    Photography walks, DIY workshops, Chess tournaments and many more!
                    Join exciting events happening near you and explore new interests.
                  </p>
                  <Link
                    to="/groups"
                    className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Explore All Groups
                  </Link>
                </div>

                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-6 rounded-xl">
                  <div className="text-center">
                    <span className="block text-3xl font-bold text-indigo-600 dark:text-indigo-400">30+</span>
                    <span className="text-gray-600 dark:text-gray-300">Active Groups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-indigo-600 dark:bg-indigo-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Find Your Tribe?</h3>
          <p className="mb-8 text-lg">
            Create your own group or join existing ones to connect with like-minded enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/createGroup"
              className="px-8 py-3 bg-white text-indigo-600 hover:bg-gray-100 font-semibold rounded-lg transition-colors"
            >
              Create a Group
            </Link>
            <Link
              to="/groups"
              className="px-8 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg border border-indigo-500 transition-colors"
            >
              Join a Group
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
