"use client";

import { NextPage } from "next";
import { useState, useEffect, Fragment } from "react";
import axios, { AxiosResponse } from "axios";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";

interface Students {
  name: string;
  email: string;
  course?: string;
  id: string;
}

export const Table: NextPage = () => {
  const [students, setStudents] = useState<Students[]>([]);

  useEffect(() => {
    (async function () {
      axios.get("http://localhost:4000/students").then((response: AxiosResponse<Students[]>) => {
        setStudents((prevState) => (prevState = response.data));
      });
    })();
  }, []);

  return (
    <section className="flex mx-5 my-10 justify-evenly shadow-md p-10">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Nome
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Curso
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Ações
                    </th>
                  </tr>
                </thead>

                {students?.map((student, index) => (
                  <Fragment key={index}>
                    <tbody>
                      <tr className="border-b dark:border-neutral-500">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {student?.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {student?.email}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {student?.course}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 flex">
                          <div className="cursor-pointer">
                            <BsFillTrash3Fill />
                          </div>

                          <div className="cursor-pointer mx-2">
                            <BsFillPencilFill />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Fragment>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
