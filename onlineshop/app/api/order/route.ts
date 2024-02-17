import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") return NextResponse.error;

  const { id, deliveryStatus } = body;

  const order = await prisma.order.update({
    where: { id: id },
    data: { deliveryStatus },
  });

  return NextResponse.json(order);
}
