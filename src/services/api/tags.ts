import { Tag } from "@/types/types";
import axios from "axios";

export const getTagsAPI = async () => {
  const response = await axios.get<Tag[]>("https://chiragsurti10-to-do.hf.space/");

  return response.data;
};
