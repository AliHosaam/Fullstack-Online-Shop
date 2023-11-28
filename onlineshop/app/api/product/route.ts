import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") return NextResponse.error;

  const { name, description, price, brand, category, inStock, image } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      image,
    },
  });

  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") return NextResponse.error;

  const { id, inStock } = body;

  const product = await prisma.product.update({
    where: { id: id },
    data: { inStock },
  });

  return NextResponse.json(product);
}
