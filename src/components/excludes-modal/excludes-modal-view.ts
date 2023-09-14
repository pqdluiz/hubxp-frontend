import type { Students } from "@/interfaces";
import type { Dispatch, SetStateAction } from "react";

export interface ExcludesModalViewProps {
  handleExcludesStudent: (
    id: string,
    setStudents: Dispatch<SetStateAction<Students[]>>,
    setOpenExcludesModal: Dispatch<SetStateAction<boolean>>
  ) => Promise<void>;
  loading: boolean;
}
