// src/app/api/order/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { products } = data;

    if (!products || products.length === 0) {
      return NextResponse.json(
        { success: false, message: "No products in order" },
        { status: 400 }
      );
    }

    // TODO: Save products order to DB
    console.log("Order received:", products);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
