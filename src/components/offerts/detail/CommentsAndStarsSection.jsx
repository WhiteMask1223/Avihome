"use client"

import { useState, useEffect } from "react";

import { save_Comment, get_CommentById, delete_Comment } from "@/api/comments.api";

import StarsInput from "@/components/UI/formElements/StarsInput";
import Comment from "@/components/offerts/detail/OffertComment";
import VariableInput from "@/components/UI/formElements/VariableInput";
import SubmitButton from "@/components/UI/formElements/SubmitButton";

export default function CommentsAndStarsSection({ offert, user }) {

    const isSameUser = offert.user._id === user._id
    const commetTemplate = {
        offertId: offert._id,
        userId: offert.user._id,
        message: "",
        stars: null
    };

    const [commentForm, setCommentForm] = useState(commetTemplate);
    const [comments, setComments] = useState(null);


    const updateCommentForm = (field, newValue) => {
        setCommentForm(prevFormData => ({
            ...prevFormData,
            [field]: newValue
        }));
    };

    const getComments = async () => {
        try {
            if (!offert._id) return;

            const id = { _id: offert._id }

            const fetchedComments = await get_CommentById(id);

            setComments(fetchedComments);
        } catch (error) {
            console.error("Error getComments: ", error);
        };
    };


    useEffect(() => {
        if (!comments) {
            getComments();
        };
    }, [comments]);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            getComments()
            if (!commentForm.message || commentForm.stars === null) return;

            const saveResponse = await save_Comment(commentForm);

            if (!saveResponse.error) {
                getComments();
                setCommentForm(commetTemplate)
            };
        } catch (error) {
            console.error("Error Creando comentario: ", error);
        };
    };

    if (!offert || !comments) return;

    return (
        <section>
            <h2 className="text-lg font-semibold mt-6">Comentarios y puntuaciones:</h2>

            <div className="bg-subSectionThemeBackground p-4 sm:rounded-lg shadow-inner shadow-sectionThemeShadow mt-2 mb-6 sm:flex">

                <div className="w-full">
                    <form onSubmit={handleSubmit}>
                        <h2 className="font-semibold">
                            Agrega un comentario:
                        </h2>

                        <h3 className="mt-2">
                            ¿Qué puntuación le das a esta oferta?
                        </h3>

                        <StarsInput
                            commentForm={commentForm}
                            setCommentForm={setCommentForm}
                        />

                        <VariableInput
                            type={'text'}
                            id={'message'}
                            value={commentForm.message}
                            setStateFunction={updateCommentForm}
                            autoComplete={"off"}
                            placeholder={"Plasma tu comentario aquí..."}
                        />

                        <div className="w-full flex items-center justify-end">
                            <SubmitButton
                                text={"Comentar"}
                                styles={"mt-1 px-2 py-1"}
                            />
                        </div>
                    </form>

                    {comments.map((comment, index) => (
                        <Comment
                            key={index}
                            comment={comment}
                            isSameUser={isSameUser}
                            getComments={getComments}
                        />
                    ))}

                </div>

            </div>
        </section>
    );
};