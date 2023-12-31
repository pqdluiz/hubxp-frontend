"use client";

import type { NextPage } from "next";
import { Dispatch, SetStateAction, Fragment } from "react";
import { Loading } from "../loading";
import type { Students } from "@/interfaces";
import { useEditStudentModal } from "./use-edit-student-modal";

interface AddStudentModalProps {
  openEditStudentModal: boolean;
  setOpenEditStudentModal: Dispatch<SetStateAction<boolean>>;
  student: Students;
  setStudents: Dispatch<SetStateAction<Students[]>>;
}

export const EditStudentModal: NextPage<AddStudentModalProps> = ({
  openEditStudentModal,
  setOpenEditStudentModal,
  student,
  setStudents,
}) => {
  const {
    handleCancelAddStudentModal,
    handleSubmitAddStudentModal,
    courses,
    loading,
    editStudent,
    handleChangeCourse,
    handleChangeEmail,
    handleChangeName,
  } = useEditStudentModal(student);

  return (
    <Fragment>
      <Loading loading={loading} />

      {openEditStudentModal === true ? (
        <main className="h-screen w-screen absolute bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
          <div className="px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
              <div className="md:flex items-center">
                <div className="mt-4 md:mt-0 text-center md:text-left">
                  <p className="font-bold my-5">Editar aluno</p>

                  <div className="flex flex-col">
                    <label>Nome</label>
                    <input
                      value={editStudent?.name}
                      onChange={handleChangeName}
                      className="rounded-md shadow-sm p-2 bg-green-400"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Email</label>
                    <input
                      type="email"
                      value={editStudent?.email}
                      onChange={handleChangeEmail}
                      className="rounded-md shadow-sm p-2 bg-green-400"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Curso</label>
                    <select
                      defaultValue={student?.course}
                      className="rounded-md shadow-sm p-2 bg-green-400"
                      onChange={handleChangeCourse}
                    >
                      <option selected value={student?.course}>
                        {student?.course}
                      </option>

                      {courses?.map((course, index) => (
                        <Fragment key={index}>
                          <option value={course?.name}>{course?.name}</option>
                        </Fragment>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={() =>
                    handleSubmitAddStudentModal(
                      String(student.id),
                      setOpenEditStudentModal,
                      setStudents
                    )
                  }
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-500 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Salvar
                </button>
                <button
                  onClick={() =>
                    handleCancelAddStudentModal(setOpenEditStudentModal)
                  }
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
        md:mt-0 md:order-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </main>
      ) : null}
    </Fragment>
  );
};
