"use client";

import {
  AddStudentModal,
  AddCourseModal,
  Table,
  ExcludesModal,
  EditStudentModal,
} from "@/components";
import { hubxp } from "@/images";
import type { Students } from "@/interfaces";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [openAddStudentModal, setOpenAddStudentModal] =
    useState<boolean>(false);
  const [openAddCourseModal, setOpenAddCourseModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<Students[]>([]);

  const [openExcludesModal, setOpenExcludesModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [editStudent, setEditStudent] = useState<Students>({
    email: "",
    id: "",
    name: "",
    course: "",
  });

  const [studentId, setStudentId] = useState<string>("");

  useEffect(() => {
    (async function () {
      setLoading((prevState) => (prevState = true));

      await axios
        .get("http://localhost:4000/students")
        .then((response: AxiosResponse<Students[]>) => {
          setStudents((prevState) => (prevState = response.data));
          setLoading((prevState) => (prevState = false));
        });
    })();
  }, []);

  const handleAddStudent = (): void => {
    setOpenAddStudentModal((prevState) => (prevState = true));
  };

  const handleAddCourse = (): void => {
    setOpenAddCourseModal((prevState) => (prevState = true));
  };

  return (
    <div className="h-screen">
      <AddStudentModal
        setOpenAddStudentModal={setOpenAddStudentModal}
        openAddStudentModal={openAddStudentModal}
        setStudents={setStudents}
      />

      <AddCourseModal
        openAddCourseModal={openAddCourseModal}
        setOpenAddCourseModal={setOpenAddCourseModal}
      />

      <ExcludesModal
        openExcludesModal={openExcludesModal}
        setOpenExcludesModal={setOpenExcludesModal}
        studentId={studentId}
        setStudents={setStudents}
      />

      <EditStudentModal
        openEditStudentModal={openEditModal}
        setOpenEditStudentModal={setOpenEditModal}
        student={editStudent}
        setStudents={setStudents}
      />

      <header className="flex justify-between bg-black_500">
        <Image src={hubxp} height={100} width={100} alt="Logo do HUB XP" />
      </header>

      <section className="flex mx-5 my-10 justify-evenly shadow-md p-10">
        <button
          onClick={handleAddStudent}
          className="bg-slate-600 text-white p-4 rounded-sm"
        >
          Adicionar aluno
        </button>

        <button
          onClick={handleAddCourse}
          className="bg-slate-600 text-white p-4 rounded-sm"
        >
          Adicionar curso
        </button>
      </section>

      <Table
        students={students}
        setStudents={setStudents}
        setStudentId={setStudentId}
        setOpenExcludesModal={setOpenExcludesModal}
        setEditStudent={setEditStudent}
        setOpenEditModal={setOpenEditModal}
      />

      <footer className="bg-black_500 p-10">
        <p className="text-white">Desenvolvido por Luiz Lima</p>
      </footer>
    </div>
  );
}
