import type { Students } from "@/interfaces";
import type { Dispatch, SetStateAction } from "react";

export interface TableViewProps {
  handleExcludesStudent: (
    id: string,
    setStudentId: Dispatch<SetStateAction<string>>,
    setOpenExcludesModal: Dispatch<SetStateAction<boolean>>
  ) => void;
  loading: boolean;
  handleEditStudent: (
    student: Students,
    setEditStudent: Dispatch<SetStateAction<Students>>,
    setOpenEditModal: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
}
