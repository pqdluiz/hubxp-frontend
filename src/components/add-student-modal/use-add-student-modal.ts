import type { Course, Students } from "@/interfaces";
import axios, { AxiosResponse } from "axios";
import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import type { AddStudentModalViewProps } from "./add-student-view";

export function useAddStudentModal(): AddStudentModalViewProps {
  const [student, setStudent] = useState<Students>({
    email: "",
    id: "",
    name: "",
    course: "",
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      setLoading((prevState) => (prevState = true));

      await axios.get("http://localhost:4000/courses").then((response) => {
        setCourses((prevState) => (prevState = response.data));
        setLoading((prevState) => (prevState = false));
      });
    })();
  }, []);

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
    setOpenAddStudentModal: Dispatch<SetStateAction<boolean>>
  ): void => {
    setOpenAddStudentModal((prevState) => (prevState = false));
  };

  const handleSubmitAddStudentModal = async (
    setOpenAddStudentModal: Dispatch<SetStateAction<boolean>>,
    setStudents: Dispatch<SetStateAction<Students[]>>
  ): Promise<void> => {
    setLoading((prevState) => (prevState = true));

    const response: Students = {
      email: student?.email,
      name: student?.name,
      course: student?.course,
    };

    return await axios
      .post("http://localhost:4000/students", response)
      .then(() => {
        setOpenAddStudentModal((prevState) => (prevState = false));
        setLoading((prevState) => (prevState = false));
        fetchStudents(setStudents);
      });
  };

  const handleChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setStudent({
      ...student,
      name: event.target.value,
    });
  };

  const handleChangeEmail = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setStudent({
      ...student,
      email: event.target.value,
    });
  };

  const handleChangeCourse = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setStudent({
      ...student,
      course: event.target.value,
    });
  };

  return {
    handleCancelAddStudentModal,
    handleSubmitAddStudentModal,
    loading,
    setStudent,
    student,
    courses,
    fetchStudents,
    handleChangeCourse,
    handleChangeEmail,
    handleChangeName,
  };
}
