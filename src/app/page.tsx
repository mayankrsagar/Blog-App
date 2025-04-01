import Link from 'next/link';

export default function Home() {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800">Mayank</h1>
        <h2 className="text-xl text-gray-600 mt-4">Browse our Blog Collection</h2>
        <Link 
          href="/blogs" 
          className="mt-6 inline-block text-white px-6 py-3 rounded-lg shadow-md bg-indigo-500 hover:bg-fuchsia-500 transition duration-300"
        >
          Explore Blogs
        </Link>
      </div>
    </div>
    
  );
}