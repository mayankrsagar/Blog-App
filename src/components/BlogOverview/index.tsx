"use client";

import React, { useState } from 'react';

import Link from 'next/link';

import { Button } from '@mui/material';

import BlogLists from '../BlogLists';
import FormModal, { FormData } from '../FormModal';

const BlogOverview: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white bg-opacity-80 shadow-md">
        <Link className="text-3xl font-bold text-gray-800" href={"/"}>My Blogs</Link>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setEdit(false);
            setModal(true);
          }}
        >
          Add New Blog
        </Button>
      </header>

      {/* Blog List */}
      <main className="flex-grow bg-white bg-opacity-90 p-6">
        <BlogLists setEdit={setEdit} setFormData={setFormData} />
      </main>

      {/* Modal */}
      {(modal || edit )&& (
        <FormModal
          setModal={setModal}
          formData={formData}
          setFormData={setFormData}
          edit={edit}
          setEdit={setEdit}
        />
      )}
    </div>
  );
};

export default BlogOverview;
