# Supabase Setup Instructions

This document explains how to set up Supabase tables and storage buckets for the BT3 IT Course website.

## Prerequisites

- Supabase project: https://qvhqgbgxakowluzqdlci.supabase.co
- Admin access to Supabase dashboard

## 1. Database Tables

### Create `uploaded_files` table

Run this SQL in the Supabase SQL Editor:

```sql
CREATE TABLE uploaded_files (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT,
    size BIGINT,
    upload_date TIMESTAMPTZ DEFAULT NOW(),
    file_path TEXT NOT NULL,
    file_url TEXT NOT NULL,
    subject TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read
CREATE POLICY "Allow public read access" ON uploaded_files
    FOR SELECT USING (true);

-- Create policy to allow everyone to insert
CREATE POLICY "Allow public insert" ON uploaded_files
    FOR INSERT WITH CHECK (true);

-- Create policy to allow everyone to delete their own files
CREATE POLICY "Allow public delete" ON uploaded_files
    FOR DELETE USING (true);
```

### Create `chat_messages` table

Run this SQL in the Supabase SQL Editor:

```sql
CREATE TABLE chat_messages (
    id BIGSERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    author TEXT DEFAULT 'Student',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read
CREATE POLICY "Allow public read access" ON chat_messages
    FOR SELECT USING (true);

-- Create policy to allow everyone to insert
CREATE POLICY "Allow public insert" ON chat_messages
    FOR INSERT WITH CHECK (true);

-- Enable Realtime for chat messages
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
```

## 2. Storage Bucket

### Create `student-uploads` storage bucket

1. Go to Storage in Supabase dashboard
2. Click "New bucket"
3. Name: `student-uploads`
4. Make bucket public (toggle Public bucket)
5. Click "Create bucket"

### Set Storage Policies

Run this SQL to allow public access:

```sql
-- Allow public to upload files
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'student-uploads');

-- Allow public to read files
CREATE POLICY "Allow public read"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'student-uploads');

-- Allow public to delete files
CREATE POLICY "Allow public delete"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'student-uploads');
```

## 3. Verify Setup

1. Check that both tables exist and have RLS enabled
2. Verify the storage bucket exists and is public
3. Test file upload functionality on the resources page
4. Test chat functionality on the chat page

## Notes

- The anon key is already configured in `js/supabase-config.js`
- All operations use the public/anonymous role
- For production, consider adding authentication and user-specific policies

