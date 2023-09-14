import type { Course, Students } from "@/interfaces";
import type { Dispatch, SetStateAction } from "react";

export interface EditStudentModalViewProps {
  handleSubmitAddStudentModal: (
    id: string,
    setOpenEditStudentModal: Dispatch<SetStateAction<boolean>>,
    setStudents: Dispatch<SetStateAction<Students[]>>
  ) => Promise<void>;
  handleCancelAddStudentModal: (
    setOpenEditStudentModal: Dispatch<SetStateAction<boolean>>
  ) => void;
  loading: boolean;
  courses: Course[];
  setEditStudent: Dispatch<SetStateAction<Students>>;
  editStudent: Students;
  handleChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCourse: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
