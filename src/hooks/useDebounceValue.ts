import { useEffect, useState } from "react"

export const useDebounceValue = (value: string, delaySeconds: number = 3) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delaySeconds * 1000)

        return () => {
            clearTimeout(handler)
        }

    }, [value, delaySeconds])



    return debouncedValue

}