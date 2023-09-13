import { api } from "./axios";

export class StudentsService {
    public async findAllStudents() {
       return await api.get("/students");
    }

    public async createStudent() {

    }

    public async removeStudent() {

    }

    public async updateStudent() {

    }
}