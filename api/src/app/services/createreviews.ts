import prisma from "../../db";

export default async function createReview(external_reference: any) {
  const id = Number(external_reference);
  const order = await prisma.order.findFirst({
    select: {
      userId: true,
    },
    where: {
      id: id,
    },
  });
  const product = await prisma.order_detail.findMany({
    select: {
      productId: true,
    },
    where: {
      orderId: id,
    },
  });
  if (order) {
    const arrayreview = product.map((p) => {
      return { userId: order.userId, productId: p.productId };
    });
    const reviews = await prisma.review.createMany({
      data: arrayreview,
    });
    console.log(reviews);
  }
}
