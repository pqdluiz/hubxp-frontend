import type { Course, Students } from "@/interfaces";
import axios, { AxiosResponse } from "axios";
import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import type { EditStudentModalViewProps } from "./edit-student-modal-view";

export function useEditStudentModal(
  student: Students
): EditStudentModalViewProps {
  const [editStudent, setEditStudent] = useState<Students>(student);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setEditStudent((prevState) => (prevState = student));
  }, [student]);

  useEffect(() => {
    if (student?.id) {
      axios
        .get("http://localhost:4000/students/" + student?.id)
        .then((response) => {
          setEditStudent((prevState) => (prevState = response.data));
          setLoading((prevState) => (prevState = false));
        });
    }
  }, [student?.id]);

  useEffect(() => {
    (async function () {
      setLoading((prevState) => (prevState = true));
      setEditStudent((prevState) => (prevState = student));

      await axios.get("http://localhost:4000/courses").then((response) => {
        setCourses((prevState) => (prevState = response.data));
        setLoading((prevState) => (prevState = false));
      });
    })();
  }, [student]);

  const fetchStudents = useCallback(
    async (
      setStudents: Dispatch<SetStateAction<Students[]>>
    ): Promise<void> => {
      setLoading((prevState) => (prevState = true));

      await axios
        .get("http://localhost:4000/students")
        .then((response: AxiosResponse<Students[]>) => {
          setStudents((prevState) => (prevState = response.data));
          setLoading((prevState) => (prevState = false));
        });
    },
    []
  );

  const handleCancelAddStudentModal = (
    setOpenEditStudentModal: Dispatch<SetStateAction<boolean>>
  ): void => {
    setOpenEditStudentModal((prevState) => (prevState = false));
  };

  const handleSubmitAddStudentModal = async (
    id: string,
    setOpenEditStudentModal: Dispatch<SetStateAction<boolean>>,
    setStudents: Dispatch<SetStateAction<Students[]>>
  ): Promise<void> => {
    setLoading((prevState) => (prevState = true));

    const response: Students = {
      name: editStudent?.name,
      email: editStudent?.email,
      course: editStudent?.course,
    };

    return await axios
      .put("http://localhost:4000/students/" + id, response)
      .then(() => {
        setOpenEditStudentModal((prevState) => (prevState = false));
        setLoading((prevState) => (prevState = false));

        fetchStudents(setStudents);
      });
  };

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEditStudent({
      ...editStudent,
      name: event.target.value,
    });
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEditStudent({
      ...editStudent,
      email: event.target.value,
    });
  };

  const handleChangeCourse = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setEditStudent({
      ...editStudent,
      course: event.target.value,
    });
  };

  return {
    handleSubmitAddStudentModal,
    handleCancelAddStudentModal,
    loading,
    courses,
    setEditStudent,
    editStudent,
    handleChangeCourse,
    handleChangeEmail,
    handleChangeName,
  };
}
