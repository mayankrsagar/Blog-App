import Joi from 'joi';
import { NextResponse } from 'next/server';

import { connectToDB } from '@/database';
import Blog from '@/models/blog';

const AddNewBlogSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req: Request) {
  try {
    await connectToDB();
    const extractBlogData = await req.json();
    const { title, description, id} = extractBlogData;

    const { error } = AddNewBlogSchema.validate({ title, description });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.details[0].message,
        },
        { status: 400 }
      );
    }

    const newlyCreatedBlogItem = await Blog.create({ title, description, id });
    if (newlyCreatedBlogItem) {
      return NextResponse.json(
        {
          success: true,
          message: "Blog added successfully",
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong! Try again.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again",
      },
      { status: 500 }
    );
  }
}
