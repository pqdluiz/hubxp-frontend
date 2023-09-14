import type { Course } from "@/interfaces";
import { api } from "./axios";
import type { AxiosResponse } from "axios";

export class CourseService {
  public async createCourse(course: Course): Promise<AxiosResponse<Course>> {
    return await api.post("/courses", course);
  }

  public async findCourses(): Promise<AxiosResponse<Course[]>> {
    return await api.get("/courses");
  }
}
