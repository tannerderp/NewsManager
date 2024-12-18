import React, { useState } from "react";

export function CategoryDropdown({category, changeCategory}){
    const [opened, setOpened] = useState(true);
    const categories = ["General", "Business", "Entertainment", "Health", "Science", "Sports", "Technology"]

    const toggleDropdown = () => {
        setOpened((prev) => !prev);
    }

    const optionClassList = (currentCategory) => {
        if(currentCategory === category){
            return "selected-category";
        }
        return "unselected-category";
    }

    return (
        <div className="category-dropdown-button">
            <button onClick={toggleDropdown}>Category: {category}</button>
            {opened && (
                <ul className="category-dropdown-options">
                    {categories.map(currentCategory => (
                        <li className={optionClassList(currentCategory)} onClick={() => changeCategory(currentCategory)}>{currentCategory}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}