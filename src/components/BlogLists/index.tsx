"use client";

import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import {
  deleteBlogDataAsync,
  getBlogDataAsync,
} from '@/features/blogSlice';
import { useAppDispatch } from '@/store/hook';
import type { RootState } from '@/store/store';

type BlogListsProps = {
  setEdit: (value: boolean) => void;
  setFormData: (data: { id?: string; title: string; description: string }) => void;
};

const BlogLists: React.FC<BlogListsProps> = ({ setEdit, setFormData }) => {
  const dispatch = useAppDispatch();
  const { blogData, isLoading, error } = useSelector((state: RootState) => state.blog);

  // Fetch blog data on component mount
  useEffect(() => {
    dispatch(getBlogDataAsync());
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <h1 className="text-xl font-semibold text-gray-700">Loading...</h1>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <h2 className="text-xl font-semibold text-red-600">Something went wrong: {error}</h2>
      </div>
    );

  const editData = (ele: { id: string; title: string; description: string }): void => {
    setEdit(true);
    setFormData(ele);
  };

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {blogData && blogData.length > 0 ? (
        blogData.map((ele) => (
          <div
            key={ele.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-bold text-blue-600 mb-2">{ele.title}</h2>
              <p className="text-gray-700">{ele.description}</p>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 hover:cursor-pointer"
                onClick={() => editData(ele)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 hover:cursor-pointer"
                onClick={() => dispatch(deleteBlogDataAsync(ele.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center col-span-full">
          <h1 className="text-xl font-semibold text-gray-700">Add a blog to see the list</h1>
        </div>
      )}
    </div>
  );
};

export default BlogLists;
