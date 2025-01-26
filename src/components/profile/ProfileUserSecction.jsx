"use client"

import { useState, useContext } from "react"
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import EditInfoModal from "./EditInfoModal";
import EditPasswordModal from "./EditPasswordModal";
import Button from "../UI/utility/Button";
import DangerButton from "../UI/utility/DangerButton";
import DeleteConfirm from "../UI/utility/DeleteConfirm";

import { UserContext } from "@/contexts/User.context";
import { MainPageContext } from "@/contexts/MainPage.context";

import { delete_user } from "@/api/user.api"

export default function ProfileUserSecction({ user, sameUser, setUser }) {

    const router = useRouter();

    const { userData, logout } = useContext(UserContext);
    const { fetchOfferts } = useContext(MainPageContext);

    const [editPswModal, setEditPswModal] = useState(false);
    const [triggerEditInfo, setTriggerEditInfo] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);

    const triggerEditPswFunction = () => {
        setEditPswModal(!editPswModal)
    };

    const triggerEditInfoFunction = () => {
        setTriggerEditInfo(!triggerEditInfo)
    };

    const triggerDelete = () => {
        setDeletePopUp(!deletePopUp);
    };

    const deleteUser = async () => {
        try {
            const deleteResponse = await delete_user(user._id, userData._id);

            if (!deleteResponse.error) {
                triggerDelete();

                await signOut({ redirect: false });
                logout();
                fetchOfferts();
                router.push("/");
            };
        } catch (error) {
            console.error(error)
        }
    };

    if (!user) return

    return (
        <section className="w-full">
            <div className="bg-sectionThemeBackground p-6 sm:rounded-2xl shadow-lg shadow-sectionThemeShadow w-full sm:w-11/12 mb-8 sm:m-auto" >

                <h2 className="text-xl font-bold mb-4">{
                    user.role === "User" ?
                        "Perfil de Usuario"
                        :
                        "Perfil de Administrador"
                }</h2>

                <div className="sm:flex items-center justify-between">
                    <div className="flex">
                        <i className="ri-account-circle-line text-6xl"></i>
                        <div className="my-auto">
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            {sameUser && <p>{user.email}</p>}
                        </div>
                    </div>
                    <div className="sm:text-right">
                        <p className="font-bold">Medios de Contacto:</p>
                        <p>{user.contEmail}</p>
                        <p>{user.phone}</p>
                        <p></p>
                    </div>
                </div>
                {sameUser &&
                    <div className="mt-4 sm:flex items-center justify-between sm:space-x-4">
                        <div className="flex flex-col">
                            <Button
                                styles={"w-full px-4 py-2"}
                                text={"Cambiar contraseña"}
                                buttonFunction={triggerEditPswFunction}
                            />
                            <EditPasswordModal
                                trigger={editPswModal}
                                setTrigger={setEditPswModal}
                                user={user}
                            />


                            <Button
                                styles={"w-full px-4 py-2 mt-2"}
                                text={"Cambiar Información"}
                                buttonFunction={triggerEditInfoFunction}
                            />
                            <EditInfoModal
                                trigger={triggerEditInfo}
                                setTrigger={setTriggerEditInfo}
                                user={user}
                                setUser={setUser}
                            />
                        </div>

                        {user.role === "Root" || user.role === "Admin" ?
                            ""
                            :
                            <DangerButton styles={"w-full sm:w-fit mt-5 sm:mt-0"} text={"Eliminar Cuenta"} buttonFunction={triggerDelete} loader={false} />
                        }

                        <DeleteConfirm
                            text={"tu cuenta de Usuario"}
                            otherText={"Todas las Ofertas que hayas creado serán eliminadas, al igual que toda tu información personal."}
                            trigger={deletePopUp}
                            setTrigger={setDeletePopUp}
                            deleteFunction={deleteUser}
                        />
                    </div>
                }

                {userData.role === "Root" || userData.role === "Admin" && !sameUser ?
                    <div>
                        <DangerButton styles={"w-full sm:w-fit mt-5 sm:mt-0"} text={"Eliminar Cuenta"} buttonFunction={triggerDelete} loader={false} />

                        <DeleteConfirm
                            text={"esta cuenta de Usuario"}
                            otherText={"Todas las Ofertas creadas serán eliminadas, al igual que toda su información personal."}
                            trigger={deletePopUp}
                            setTrigger={setDeletePopUp}
                            deleteFunction={deleteUser}
                        />
                    </div>
                    :
                    ""
                }
            </div >
        </section>
    )
}