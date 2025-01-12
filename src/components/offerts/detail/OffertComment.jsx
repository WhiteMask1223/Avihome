import { delete_Comment } from "@/api/comments.api";

export default function Comment({ comment, isSameUser, getComments }) {

    const deleteComment = async () => {
        try {
            const deleteResult = await delete_Comment(comment._id);
            
            if (!deleteResult.error) {
                await getComments();
            };
        } catch (error) {
            console.error("Error deleteComment: ", error);
        }
    };

    return (
        <div className="bg-sectionThemeBackground mt-5 rounded-3xl shadow-lg shadow-sectionThemeShadow w-full">

            <div className="flex w-full">
                <div>
                    <i className="ri-account-circle-line text-5xl text-checkboxThemeSelected"></i>
                </div>
                <div className="w-full">
                    <div className="flex justify-between w-full">
                        <h2 className="font-bold text-nowrap">{comment.userId.name}:</h2>

                        <div className="mr-5">
                            {Array(5).fill().map((_, index) => (
                                <span key={index}>
                                    {index < comment.stars ? <i className="ri-star-fill text-checkboxThemeSelected text-lg"></i> : <i className="ri-star-line text-checkboxThemeSelected text-lg"></i>}
                                </span>
                            ))}
                            {isSameUser &&
                                <button
                                    className="ml-2 px-1 bg-dangerButtonThemeColor rounded"
                                    type="button"
                                    onClick={deleteComment}
                                >
                                    <i className="ri-delete-bin-2-fill text-white"></i>
                                </button>
                            }
                        </div>
                    </div>
                    <p className="p-1">{comment.message}</p>
                </div>
            </div>
        </div>
    );
};