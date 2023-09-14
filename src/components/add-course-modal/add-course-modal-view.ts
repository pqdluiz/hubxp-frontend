import type { Course } from "@/interfaces";
import type { Dispatch, SetStateAction } from "react";

export interface AddCourseModalViewProps {
  handleCancelAddCourseModal: (
    setOpenAddCourseModal: Dispatch<SetStateAction<boolean>>
  ) => void;
  handleSubmitAddCouseModal: (
    setOpenAddCourseModal: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
  loading: boolean;
  setCourse: Dispatch<SetStateAction<Course>>;
  course: Course;
}
