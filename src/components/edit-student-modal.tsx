"use client";

import { NextPage } from "next";
import {
  Dispatch,
  SetStateAction,
  Fragment,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios, { AxiosResponse } from "axios";
import { Loading } from "./loading";

interface AddStudentModalProps {
  openEditStudentModal: boolean;
  setOpenEditStudentModal: Dispatch<SetStateAction<boolean>>;
  student: Students;
  students: Students[];
  setStudents: Dispatch<SetStateAction<Students[]>>;
}

interface Students {
  name: string;
  email: string;
  id?: string;
  course?: string;
}

interface Courses {
  name: string;
  id?: string;
}

export const EditStudentModal: NextPage<AddStudentModalProps> = ({
  openEditStudentModal,
  setOpenEditStudentModal,
  student,
  setStudents,
  students
}) => {
  const [editStudent, setEditStudent] = useState<Students>({
    email: "",
    id: "",
    name: "",
    course: "",
  });

  const [courses, setCourses] = useState<Courses[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setEditStudent((prevState) => (prevState = student));
  }, []);

  useEffect(() => {
    (async function () {
      setLoading((prevState) => (prevState = true));

      axios.get("http://localhost:4000/courses").then((response) => {
        setCourses((prevState) => (prevState = response.data));
        setLoading((prevState) => (prevState = false));
      });
    })();
  }, []);

  const fetchStudents = useCallback(async (): Promise<void> => {
    setLoading((prevState) => (prevState = true));

    await axios
      .get("http://localhost:4000/students")
      .then((response: AxiosResponse<Students[]>) => {
        setStudents((prevState) => (prevState = response.data));
        setLoading((prevState) => (prevState = false));
      });
  }, []);

  const handleCancelAddStudentModal = (): void => {
    setOpenEditStudentModal((prevState) => (prevState = false));
  };

  const handleSubmitAddStudentModal = async (id: string): Promise<void> => {
    setLoading((prevState) => (prevState = true));

    const response: Students = {
      name: student?.name,
      email: student?.email,
      course: student?.course,
    };

    return await axios
      .put("http://localhost:4000/students/" + id, response)
      .then(() => {
        setOpenEditStudentModal((prevState) => (prevState = false));
        setLoading((prevState) => (prevState = false));

        fetchStudents()
      });
  };

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
                      onChange={(event) =>
                        setEditStudent(
                          (prevState) =>
                            (prevState = {
                              name: event.target.value,
                              email: student?.email,
                              id: student?.id,
                            })
                        )
                      }
                      className="rounded-md shadow-sm p-2 bg-green-400"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Email</label>
                    <input
                      value={editStudent?.email}
                      onChange={(event) =>
                        setEditStudent(
                          (prevState) =>
                            (prevState = {
                              email: event.target.value,
                              name: student.name,
                              id: student?.id,
                            })
                        )
                      }
                      className="rounded-md shadow-sm p-2 bg-green-400"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Curso</label>
                    <select
                      value=""
                      defaultValue=""
                      className="rounded-md shadow-sm p-2 bg-green-400"
                    >
                      <option selected value="">
                        Selecione
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
                    handleSubmitAddStudentModal(String(student.id))
                  }
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-500 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Salvar
                </button>
                <button
                  onClick={handleCancelAddStudentModal}
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
