import type { Course, Students } from "@/interfaces";
import axios, { AxiosResponse } from "axios";
import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";

interface AddStudentModalViewProps {
  loading: boolean;
  handleSubmitAddStudentModal: (
    setOpenAddStudentModal: Dispatch<SetStateAction<boolean>>,
    setStudents: Dispatch<SetStateAction<Students[]>>
  ) => Promise<void>;
  setStudent: Dispatch<SetStateAction<Students>>;
  student: Students;
  courses: Course[];
  handleCancelAddStudentModal: (
    setOpenAddStudentModal: Dispatch<SetStateAction<boolean>>
  ) => void;
  fetchStudents: (
    setStudents: Dispatch<SetStateAction<Students[]>>
  ) => Promise<void>;
}

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

  return {
    handleCancelAddStudentModal,
    handleSubmitAddStudentModal,
    loading,
    setStudent,
    student,
    courses,
    fetchStudents
  };
}