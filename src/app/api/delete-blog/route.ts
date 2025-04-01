import { NextResponse } from 'next/server';

import { connectToDB } from '@/database';
import Blog from '@/models/blog';

export const DELETE=async(req:Request)=>{
    try{
        await connectToDB();
        const {searchParams}=new URL(req.url);
        const id=searchParams.get("id");

    if (!id) {
        return NextResponse.json(
          { success: false, message: "Blog ID is required" },
          { status: 400 }
        );
      }

      const result=await Blog.deleteOne({_id:id})

      if (result.deletedCount === 0) {
        return NextResponse.json(
          { success: false, message: "No blog found with the provided ID" },
          { status: 404 }
        );
      }

      console.log(`Deleted count: ${result.deletedCount}`);
      return NextResponse.json(
        { success: true, message: "Data is deleted successfully" },
        { status: 200 }
      );

    }catch(error:unknown){
        if(error instanceof Error)
            return NextResponse.json({
        success:false,
        message:"Something went wrong while deleting data",
            })
    }
}