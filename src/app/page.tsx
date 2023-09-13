"use client";

import { AddStudentModal, AddCourseModal } from "@/components";
import { Table } from "@/components/table";
import { hubxp } from "@/images";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [openAddStudentModal, setOpenAddStudentModal] =
    useState<boolean>(false);
  const [openAddCourseModal, setOpenAddCourseModal] = useState<boolean>(false);

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
      />

      <AddCourseModal
        openAddCourseModal={openAddCourseModal}
        setOpenAddCourseModal={setOpenAddCourseModal}
      />

      <header className="flex justify-between bg-black">
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

      <Table />

      <footer className="bg-black p-10">
        <p className="text-white">Desenvolvido por Luiz Lima</p>
      </footer>
    </div>
  );
}
