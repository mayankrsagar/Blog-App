import { NextResponse } from 'next/server';

import { connectToDB } from '@/database';
import Blog from '@/models/blog';

export const PUT = async (req: Request) => {
  try {
    await connectToDB();

    // Extract data from request body
    const extractedData = await req.json();
    const { id, ...updateFields } = extractedData;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Blog ID is required" },
        { status: 400 }
      );
    }

    // Update blog document: using {_id: id} as filter and $set to update fields
    const result = await Blog.updateOne({ _id: id }, { $set: updateFields });

    if (result.modifiedCount === 0) {
      // Option 1: Return success with a message that nothing changed.
      return NextResponse.json(
        { success: true, message: "No changes made" },
        { status: 200 }
      );
      // Option 2: Alternatively, you can return a different message or status if needed.
    }

    return NextResponse.json(
      { success: true, message: "Updated data successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong while updating!" },
      { status: 500 }
    );
  }
};
