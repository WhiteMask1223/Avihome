"use client"

import Star from "./Star";

export default function StarsInput({ commentForm, setCommentForm, formError }) {

    const changeStarsValue = (newValue) => {
        setCommentForm(prevFormData => ({
            ...prevFormData,
            stars: newValue
        }));
    };

    return (
        <div className="flex items-center py-1">
            <div className="flex text-xl space-x-1">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Star
                        key={index}
                        index={index}
                        value={commentForm.stars}
                        buttonFuction={() => {
                            changeStarsValue(index)
                        }}
                    />
                ))}
            </div>

            {formError &&
                <h2 className="ml-5 text-center font-bold bg-red-300 dark:bg-red-900 px-5 rounded-full shadow-lg shadow-sectionThemeShadow animate-pulse">
                    <i className="ri-arrow-left-line mr-2" />
                    Selecciona una puntuación.
                </h2>
            }
        </div>
    );
};