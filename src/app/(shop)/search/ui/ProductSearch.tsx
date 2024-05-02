'use client';

import { useState } from "react";

import { ProductGrid } from "@/components";
import { InputSearch } from "./InputSearch";
import { Product } from "@/interfaces";
import { useDebounceValue } from "@/hooks";


interface Props {
    products: Product[]
}

export const ProductSearch = ({ products }: Props) => {

    const [searchValue, setSearchValue] = useState('');
    const debounceValue = useDebounceValue(searchValue, 1);




    const filterProducts = (products: Product[]) => {
        if (debounceValue === '') return [];
        return products.filter(product => {
            return product.title.toLowerCase().includes(debounceValue.toLowerCase())
        })
    }

    const filteredProducts = filterProducts(products);

    return (
        <>
            <InputSearch searchValue={searchValue} handleChangeSearch={setSearchValue} />

            {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} />

            ) : <div className="w-full flex items-center justify-center py-10">
                <p className=" text-gray-800 text-2xl">Buscando productos...</p>
            </div>
            }
        </>
    )

}