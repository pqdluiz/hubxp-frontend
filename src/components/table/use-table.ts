import type { Students } from "@/interfaces";
import type { AxiosResponse } from "axios";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import type { TableViewProps } from "./table-view";
import { StudentsService } from "@/services";

export function useTable(
  setStudents: Dispatch<SetStateAction<Students[]>>
): TableViewProps {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      setLoading((prevState) => (prevState = true));

      const studentService = new StudentsService();

      await studentService
        .findAllStudents()
        .then((response: AxiosResponse<Students[]>) => {
          setStudents((prevState) => (prevState = response.data));
          setLoading((prevState) => (prevState = false));
        });
    })();
  }, [setStudents]);

  const handleExcludesStudent = (
    id: string,
    setStudentId: Dispatch<SetStateAction<string>>,
    setOpenExcludesModal: Dispatch<SetStateAction<boolean>>
  ): void => {
    setStudentId((prevState) => (prevState = id));
    setOpenExcludesModal((prevState) => (prevState = true));
  };

  const handleEditStudent = async (
    student: Students,
    setEditStudent: Dispatch<SetStateAction<Students>>,
    setOpenEditModal: Dispatch<SetStateAction<boolean>>
  ) => {
    setEditStudent((prevState) => (prevState = student));
    setLoading((prevState) => (prevState = true));

    const studentService = new StudentsService();

    await studentService
      .findOneStudentById(String(student?.id))
      .then((response) => {
        setEditStudent((prevState) => (prevState = response.data));
        setLoading((prevState) => (prevState = false));
      });

    setOpenEditModal((prevState) => (prevState = true));
  };

  return {
    handleExcludesStudent,
    loading,
    handleEditStudent,
  };
}
