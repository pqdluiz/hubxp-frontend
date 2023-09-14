import type { Course, Students } from "@/interfaces";
import type { Dispatch, SetStateAction } from "react";

export interface AddStudentModalViewProps {
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
