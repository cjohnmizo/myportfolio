import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";

const allowedBuckets = new Set(["avatars", "projects", "media", "resumes"]);

function sanitizeFileName(fileName: string) {
  return fileName.toLowerCase().replace(/[^a-z0-9.-]/g, "-");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const bucket = formData.get("bucket");
  const file = formData.get("file");

  if (typeof bucket !== "string" || !allowedBuckets.has(bucket)) {
    return NextResponse.json({ message: "Invalid upload bucket." }, { status: 400 });
  }

  if (!(file instanceof File)) {
    return NextResponse.json({ message: "No file provided." }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return NextResponse.json({ message: "Files must be under 10MB." }, { status: 400 });
  }

  const serverClient = await createServerSupabaseClient();
  const {
    data: { user },
  } = await serverClient.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const serviceClient = createServiceRoleSupabaseClient();

  if (!serviceClient) {
    return NextResponse.json(
      { message: "Supabase storage is not configured." },
      { status: 503 },
    );
  }

  const { data: profile } = await serviceClient
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return NextResponse.json({ message: "Forbidden." }, { status: 403 });
  }

  const filePath = `${new Date().toISOString().slice(0, 10)}/${randomUUID()}-${sanitizeFileName(file.name)}`;
  const uploadResult = await serviceClient.storage
    .from(bucket)
    .upload(filePath, file, { upsert: true, contentType: file.type });

  if (uploadResult.error) {
    return NextResponse.json({ message: uploadResult.error.message }, { status: 500 });
  }

  if (bucket === "resumes") {
    const signedUrlResult = await serviceClient.storage
      .from(bucket)
      .createSignedUrl(filePath, 60 * 60 * 24 * 30);

    if (signedUrlResult.error) {
      return NextResponse.json({ message: signedUrlResult.error.message }, { status: 500 });
    }

    return NextResponse.json({
      bucket,
      path: filePath,
      publicUrl: signedUrlResult.data.signedUrl,
    });
  }

  const publicUrl = serviceClient.storage.from(bucket).getPublicUrl(filePath).data.publicUrl;

  return NextResponse.json({
    bucket,
    path: filePath,
    publicUrl,
  });
}
