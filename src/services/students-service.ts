import type { Students } from "@/interfaces";
import { api } from "./axios";
import type { AxiosResponse } from "axios";

export class StudentsService {
  public async findAllStudents(): Promise<AxiosResponse<Students[]>> {
    return await api.get("/students");
  }

  public async findOneStudentById(
    id: string
  ): Promise<AxiosResponse<Students>> {
    return await api.get("/students/" + id);
  }

  public async createStudent(
    student: Students
  ): Promise<AxiosResponse<Students>> {
    return await api.post("/students", student);
  }

  public async removeStudent(id: string): Promise<AxiosResponse<any, any>> {
    return await api.delete("/students/" + id);
  }

  public async updateStudent(id: string, student: Students): Promise<any> {
    return await api.put("/students/" + id, student);
  }
}
