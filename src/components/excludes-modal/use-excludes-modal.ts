import type { Students } from "@/interfaces";
import type { AxiosResponse } from "axios";
import { useState, useCallback, Dispatch, SetStateAction } from "react";
import type { ExcludesModalViewProps } from "./excludes-modal-view";
import { StudentsService } from "@/services";

export function useExcludesModal(): ExcludesModalViewProps {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudents = useCallback(
    async (
      setStudents: Dispatch<SetStateAction<Students[]>>
    ): Promise<void> => {
      setLoading((prevState) => (prevState = true));

      const studentService = new StudentsService();

      await studentService
        .findAllStudents()
        .then((response: AxiosResponse<Students[]>) => {
          setStudents((prevState) => (prevState = response.data));
          setLoading((prevState) => (prevState = false));
        });
    },
    []
  );

  const handleExcludesStudent = async (
    id: string,
    setStudents: Dispatch<SetStateAction<Students[]>>,
    setOpenExcludesModal: Dispatch<SetStateAction<boolean>>
  ): Promise<void> => {
    setLoading((prevState) => (prevState = true));

    const studentService = new StudentsService();

    await studentService.removeStudent(id).then(() => {
      setOpenExcludesModal((prevState) => (prevState = false));
      setLoading((prevState) => (prevState = false));

      fetchStudents(setStudents);
    });
  };

  return {
    handleExcludesStudent,
    loading,
  };
}
