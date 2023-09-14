import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import { Fragment, Dispatch, SetStateAction, useState, useCallback } from "react";
import { Loading } from "./loading";

interface Students {
  name: string;
  email: string;
  id?: string;
  course?: string;
}

interface ExcludesModalProps {
  openExcludesModal: boolean;
  setOpenExcludesModal: Dispatch<SetStateAction<boolean>>;
  studentId: string;
  setStudents: Dispatch<SetStateAction<Students[]>>;
}

export const ExcludesModal: NextPage<ExcludesModalProps> = ({
  openExcludesModal,
  setOpenExcludesModal,
  studentId,
  setStudents,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudents = useCallback(async (): Promise<void> => {
    setLoading((prevState) => (prevState = true));

    await axios
      .get("http://localhost:4000/students")
      .then((response: AxiosResponse<Students[]>) => {
        setStudents((prevState) => (prevState = response.data));
        setLoading((prevState) => (prevState = false));
      });
  }, [setStudents]);

  const handleExcludesStudent = async (id: string): Promise<void> => {
    setLoading((prevState) => (prevState = true));

    await axios.delete("http://localhost:4000/students/" + id).then(() => {
      setOpenExcludesModal((prevState) => (prevState = false));
      setLoading((prevState) => (prevState = false));

      fetchStudents()
    });
  };

  return (
    <Fragment>
      <Loading loading={loading} />

      {openExcludesModal === true ? (
        <main className="h-screen w-screen absolute bg-gray-200 text-gray-900 font-sans overflow-x-hidden">
          <div className="px-4 min-h-screen md:flex md:items-center md:justify-center">
            <div className="bg-black opacity-25 w-full h-full absolute z-10 inset-0"></div>
            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
              <div className="md:flex items-center">
                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                  <p className="font-bold">Deletar estudante</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Você perderá todos os seus dados ao excluir sua conta. Essa
                    ação não pode ser desfeita.
                  </p>
                </div>
              </div>
              <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                <button
                  onClick={() => handleExcludesStudent(studentId)}
                  className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                >
                  Deletar
                </button>
                <button
                  onClick={() =>
                    setOpenExcludesModal((prevState) => (prevState = false))
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
