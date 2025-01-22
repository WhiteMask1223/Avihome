"use client"

import { useState } from "react";
import Link from "next/link";

import { delete_Comment } from "@/api/comments.api";

import LoadingSpinners from "@/components/UI/utility/LoadingSpinners";

export default function Comment({ comment, user, getComments }) {

    const [deleting, setDeleting] = useState(false)

    const deleteComment = async () => {
        try {
            setDeleting(true);
            
            const deleteResult = await delete_Comment(comment._id);

            if (!deleteResult.error) {
                await getComments();
                setDeleting(false);
            };
        } catch (error) {
            console.error("Error deleteComment: ", error);
            setDeleting(false);
        };
    };

    return (
        <div className="bg-sectionThemeBackground mt-5 rounded-3xl shadow-lg shadow-sectionThemeShadow w-full">

            <div className="flex w-full">
                <div>
                    <i className="ri-account-circle-line text-5xl text-checkboxThemeSelected"></i>
                </div>
                <div className="w-full">
                    <div className="flex justify-between w-full">

                        <Link href={`/profile/${comment.userId._id}`}>
                            <h2 className="font-bold text-nowrap">
                                {comment.userId.name}:
                            </h2>
                        </Link>

                        <div className="mr-5">
                            {Array(5).fill().map((_, index) => (
                                <span key={index}>
                                    {index < comment.stars ? <i className="ri-star-fill text-checkboxThemeSelected text-lg"></i> : <i className="ri-star-line text-checkboxThemeSelected text-lg"></i>}
                                </span>
                            ))}
                            {user._id === comment.userId._id || user.role === "Admin" || user.role === "Root" ?
                                <button
                                    className="ml-2 px-1 bg-dangerButtonThemeColor rounded"
                                    type="button"
                                    onClick={deleteComment}
                                >
                                    {
                                    deleting
                                    ?
                                    <LoadingSpinners size={"very small"}/>
                                    :
                                    <i className="ri-delete-bin-2-fill text-white"/>
                                    }
                                </button>
                                :
                                ""
                            }
                        </div>
                    </div>
                    <p className="p-1">{comment.message}</p>
                </div>
            </div>
        </div>
    );
};