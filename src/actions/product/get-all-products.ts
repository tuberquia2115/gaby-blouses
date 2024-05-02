'use server';

import prisma from "@/lib/prisma";


export async function getAllProducts() {

    try {
        const allProducts = await prisma.product.findMany({
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            }
        })

        const products = allProducts.map(product => ({
            ...product,
            images: product.ProductImage.map(image => image.url)
        }))

        return products
    } catch (error) {
        console.log(error)
        return []
    }

}