import { NextResponse } from 'next/server';

import { connectToDB } from '@/database';
import Blog from '@/models/blog';

export const GET = async () => {
  try {
    // Connect to the database
    await connectToDB();

    // Retrieve blog data
    const extractedDataFromDatabase = await Blog.find({});
    const transformedBlogs = extractedDataFromDatabase.map(blog => ({
      id: blog._id.toString(),
      title: blog.title,
      description: blog.description,
    }));

    // Always return success response, even if data is an empty array
    return NextResponse.json(
      {
        success: true,
        data: transformedBlogs,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Log error details for debugging
    if (error instanceof Error) {
      console.error('Error fetching blog data:', error.message);
    }

    // Return error response with proper HTTP status code
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong!',
      },
      { status: 500 }
    );
  }
};
