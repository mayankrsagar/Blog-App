"use client";

import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import {
  addBlogDataAsync,
  updateBlogDataAsync,
} from '@/features/blogSlice';
import { useAppDispatch } from '@/store/hook';

export interface FormData {
  id?: string;
  title: string;
  description: string;
}

interface FormModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  edit: boolean;
  setEdit:React.Dispatch<React.SetStateAction<boolean>>;
}

const FormModal: React.FC<FormModalProps> = ({ setModal, formData, setFormData, edit ,setEdit}) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes by updating formData state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

// Handle form submission
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  // Construct newBlog ensuring 'id' is defined in edit mode
  const newBlog = edit
    ? { id: formData.id!, title: formData.title, description: formData.description }
    : {
        id: uuidv4(),
        title: formData.title,
        description: formData.description,
      };

  try {
    if (edit) {
      await dispatch(updateBlogDataAsync(newBlog)).unwrap();
      console.log("Updated blog:", newBlog);
    } else {
      await dispatch(addBlogDataAsync(newBlog)).unwrap();
      console.log("Added blog:", newBlog);
    }
  } catch (err) {
    console.error(err);
    setError("Failed to add blog. Please try again.");
  } finally {
    setIsLoading(false);
    setFormData({ title: "", description: "" });
    setModal(false);
    setEdit(false);
  }
};


  const handleClose = (): void => {
    setModal(false);
    setEdit(false);
    setFormData({
      title:"",
      description:""
    })
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>

      {/* Modal Content */}
      <form className="relative bg-white rounded-lg shadow-lg p-6 z-10 w-96" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{edit ? "Edit Blog" : "Add New Blog"}</h2>
          <button type="button" className="text-gray-500 hover:text-gray-700 text-2xl leading-none" onClick={handleClose}>
            &times;
          </button>
        </div>

        {/* Error message */}
        {error && <p className="mb-4 text-red-500">{error}</p>}

        {/* Title Field */}
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition duration-300'}`}
          >
            {isLoading ? 'Submitting...' : edit ? 'Update' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
