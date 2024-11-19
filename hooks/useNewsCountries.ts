
import CountryList from "@/constants/CountryList";
import { useCallback, useState } from "react"

export const useNewsCountries = () => {

    const [newsCountries, setNewsCountries] = useState(CountryList);

    const toggleCountry = useCallback((id: number) => {
        setNewsCountries((prevNewsCategories) => {
            return prevNewsCategories.map((item, index) => {
                if (index === id) {
                    return {
                        ...item,
                        selected: !item.selected
                    }
                }
                return item
            })
        })
    }, [])
    return {
        toggleCountry,
        newsCountries
    }
}