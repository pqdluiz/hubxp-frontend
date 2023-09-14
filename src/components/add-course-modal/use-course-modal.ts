import type { Course } from "@/interfaces";
import axios from "axios";
import { useState, Dispatch, SetStateAction } from "react";
import type { AddCourseModalViewProps } from "./add-course-modal-view";

export function useAddCourseModal(): AddCourseModalViewProps {
  const [course, setCourse] = useState<Course>({ id: "", name: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancelAddCourseModal = (
    setOpenAddCourseModal: Dispatch<SetStateAction<boolean>>
  ): void => {
    setOpenAddCourseModal((prevState) => (prevState = false));
  };

  const handleSubmitAddCouseModal = async (
    setOpenAddCourseModal: Dispatch<SetStateAction<boolean>>
  ): Promise<void> => {
    setLoading((prevState) => (prevState = true));

    delete course.id;

    await axios.post("http://localhost:4000/courses", course).then(() => {
      setOpenAddCourseModal((prevState) => (prevState = false));
      setLoading((prevState) => (prevState = false));
    });
  };

  return {
    handleCancelAddCourseModal,
    handleSubmitAddCouseModal,
    loading,
    setCourse,
    course,
  };
}
