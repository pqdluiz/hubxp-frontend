import type { Course, Students } from "@/interfaces";
import type { AxiosResponse } from "axios";
import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import type { AddStudentModalViewProps } from "./add-student-view";
import { CourseService, StudentsService } from "@/services";

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

      const courseService = new CourseService();

      await courseService.findCourses().then((response) => {
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

    const studentService = new StudentsService();

    const response: Students = {
      email: student?.email,
      name: student?.name,
      course: student?.course,
    };

    return await studentService.createStudent(response).then(() => {
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
