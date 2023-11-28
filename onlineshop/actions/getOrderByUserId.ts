export default async function getOrderByUserId(userId: string) {
  try {
    const orders = await prisma?.order.findMany({
      where: {
        user_id: userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdDate: "desc",
      },
    });

    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
