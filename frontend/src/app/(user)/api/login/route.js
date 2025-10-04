// app/api/login/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Forward request to InfinityFree backend
    const res = await fetch("https://shop-sphere.infinityfreeapp.com/api/user/login.php", {
      method: "POST",
      body: formData,
    });

    const data = await res.text(); // backend might return text or JSON

    let json;
    try {
      json = JSON.parse(data); // Try parsing JSON
    } catch (e) {
      json = { status: "error", message: "Invalid response from server." };
    }

    return NextResponse.json(json);
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: "Error connecting to backend." },
      { status: 500 }
    );
  }
}
