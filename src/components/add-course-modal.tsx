import type { NextPage } from "next";
import { Dispatch, SetStateAction, Fragment, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Loading } from "./loading";

interface AddCourseModalProps {
  openAddCourseModal: boolean;
  setOpenAddCourseModal: Dispatch<SetStateAction<boolean>>;
}

interface Course {
  name: string;
  id?: string;
}

export const AddCourseModal: NextPage<AddCourseModalProps> = ({
  openAddCourseModal,
  setOpenAddCourseModal,
}) => {
  const [course, setCourse] = useState<Course>({ id: "", name: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancelAddCourseModal = (): void => {
    setOpenAddCourseModal((prevState) => (prevState = false));
  };

  const handleSubmitAddCouseModal = async (): Promise<void> => {
    setLoading((prevState) => (prevState = true));

    delete course.id;

    await axios.post("http://localhost:4000/courses", course).then(() => {
      setOpenAddCourseModal((prevState) => (prevState = false));
      setLoading((prevState) => (prevState = false));
    });
  };

  return (
    <Fragment>
      <Loading loading={loading} />

      {openAddCourseModal === true ? (
        <main className="h-screen w-screen absolute bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
          <div className="px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
              <div className="md:flex items-center">
                <div className="mt-4 md:mt-0 text-center md:text-left">
                  <p className="font-bold my-5">Adicionar curso</p>

                  <div className="flex flex-col">
                    <label>Nome</label>
                    <input
                      value={course?.name}
                      onChange={(event) =>
                        setCourse(
                          (prevState) =>
                            (prevState = { name: event.target.value })
                        )
                      }
                      className="rounded-md shadow-sm p-2 bg-green-400"
                    />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={handleSubmitAddCouseModal}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-green-500 text-white rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Salvar
                </button>
                <button
                  onClick={handleCancelAddCourseModal}
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
