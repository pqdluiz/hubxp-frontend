import type { Course } from "@/interfaces";
import axios from "axios";
import { useState, Dispatch, SetStateAction } from "react";
import type { AddCourseModalViewProps } from "./add-course-modal-view";
import { CourseService } from "@/services";

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
    
    const courseService = new CourseService()

    delete course.id;

    await courseService.createCourse(course).then(() => {
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
