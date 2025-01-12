"use client"

import Star from "./Star";

export default function StarsInput({ commentForm, setCommentForm }) {

    const changeStarsValue = (newValue) => {
        setCommentForm(prevFormData => ({
            ...prevFormData,
            stars: newValue
        }));
    };

    return (
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
    );
};