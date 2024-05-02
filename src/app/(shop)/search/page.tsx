
export const revalidate = 60;

import { getAllProducts } from "@/actions";
import { Title } from "@/components";
import { ProductSearch } from "./ui/ProductSearch";

export default async function SearchPage() {

    const products = await getAllProducts();

    return (
        <>
            <Title title="Busca tu producto por el nombre :)" />
            <ProductSearch products={products} />
        </>
    );
}