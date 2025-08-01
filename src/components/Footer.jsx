export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-5 text-center mt-10">
      <p className="text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} HobbyHub. All rights reserved.
      </p>
    </footer>
  );
}
