import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

interface Blog {
  id: string;
  title: string;
  description: string;
}

interface BlogState {
  blogData: Blog[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  blogData: [],
  isLoading: false,
  error: null,
};

// Async thunk to fetch blog data from the API\
// replaced the http://localhost:3000 with vercel link in fetch
export const getBlogDataAsync = createAsyncThunk<
  Blog[],         // Returned data type: array of Blog objects
  void,           // No argument is expected
  { rejectValue: string } // Rejected value type
>(
  "blog/getBlogDataAsync",
  async (_, { rejectWithValue }) => {
    try {
      const response = await 
      fetch("https://blog-app-kohl-chi.vercel.app/api/get-blogs",
         {
        method: "GET",
        cache: "no-cache",
      });
      if (!response.ok) {
        return rejectWithValue("Failed to fetch blog data");
      }
      const data = await response.json();
      // Assuming your API returns { success: true, data: [...] }
      return data.data as Blog[];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Async thunk to add a new blog entry via an API call
export const addBlogDataAsync = createAsyncThunk<
  Blog,           // Returned data type on success
  Blog,           // Argument type: the new blog object
  { rejectValue: string } // Rejected value type
>(
  'blog/addBlogDataAsync',
  async (newBlog, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/add-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog),
      });
      if (!response.ok) {
        return rejectWithValue('Failed to add blog');
      }
      const result = await response.json();
      console.log(result);
      // Optionally, return result if the API sends back modified data.
      return newBlog;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Async thunk to delete a blog entry via an API call
export const deleteBlogDataAsync = createAsyncThunk<
  string,         // Returned data type on success: the id of the deleted blog
  string,         // Argument type: the blog id to delete
  { rejectValue: string } // Rejected value type
>(
  'blog/deleteBlogDataAsync',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/delete-blog?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        return rejectWithValue("Failed to delete blog");
      }
      const result = await response.json();
      console.log(result);
      return id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Async thunk to update a blog entry via an API call
export const updateBlogDataAsync = createAsyncThunk<
  Blog,           // Returned data type on success: the updated blog
  Blog,           // Argument type: the updated blog object
  { rejectValue: string } // Rejected value type
>(
  "blog/updateBlogDataAsync",
  async (updatedBlog, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/update-blog", {
        method: "PUT", // Use PUT method for updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBlog),
      });
      if (!response.ok) {
        return rejectWithValue("Failed to update blog");
      }
      const result = await response.json();
      console.log(result);
      return updatedBlog;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getBlogDataAsync cases
      .addCase(getBlogDataAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBlogDataAsync.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.isLoading = false;
        state.blogData = action.payload;
      })
      .addCase(getBlogDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // addBlogDataAsync cases
      .addCase(addBlogDataAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBlogDataAsync.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.isLoading = false;
        state.blogData.push(action.payload);
      })
      .addCase(addBlogDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // deleteBlogDataAsync cases
      .addCase(deleteBlogDataAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlogDataAsync.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.blogData = state.blogData.filter(blog => blog.id !== action.payload);
      })
      .addCase(deleteBlogDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // updateBlogDataAsync cases
      .addCase(updateBlogDataAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlogDataAsync.fulfilled, (state, action: PayloadAction<Blog>) => {
        state.isLoading = false;
        state.blogData = state.blogData.map(blog =>
          blog.id === action.payload.id ? action.payload : blog
        );
      })
      .addCase(updateBlogDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the reducer as default
export default blogSlice.reducer;
