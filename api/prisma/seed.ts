import { PrismaClient } from '@prisma/client'

import { categories, products } from './seedData'

const prisma = new PrismaClient()

const main = async () => {
  
  const pCreate = products?.map((item) => {
    return {
      id: Number(item.id),
      name: item.name,
      brand: item.brand,
      stock: Number(item.stock),
      price: Number(item.price),
      img: item.img,
      state: item.state,
      categoryId: Number(item.categoryId),
      priceSpecial: Number(item.priceSpecial),      
    }
  }
  )

  await prisma.$transaction(
    categories?.map((item) =>        
      prisma.category.upsert({
        where: { id: Number(item?.id) },
        update: {},
        create: {
          ...item
        },
      })     
    )
  )

   await prisma.$transaction(
     pCreate?.map((item) =>
       prisma.product.upsert({
         where: { id: Number(item?.id) },
         update: {},
         create: {
           ...item,
         },
       })
     )
   );

}



main()
  .catch((err) => {
    console.log('Seeding error: ', err)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
