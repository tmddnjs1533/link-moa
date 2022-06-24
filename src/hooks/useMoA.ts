import { QueryFunctionContext, useQuery } from "react-query";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "fb";
export const getMoAList = ({ queryKey }: QueryFunctionContext) => {
  console.log("getMoAList", queryKey);
  const keyword = queryKey[1];
  if (keyword) {
    const nameQuery = query(
      collection(db, "moa"),
      where("name", ">=", keyword),
      where("name", "<=", keyword + "z")
    );
    return getDocs(nameQuery).then((snapshot) => {
      const newMoAList: MoA[] = [];
      snapshot.forEach((doc) => {
        const newMoA: MoA = {
          id: doc.id,
          ...doc.data(),
        };
        newMoAList.push(newMoA);
      });
      return newMoAList;
    });
  } else {
    return getDocs(collection(db, "moa")).then((snapshot) => {
      const newMoAList: MoA[] = [];
      snapshot.forEach((doc) => {
        const newMoA: MoA = {
          id: doc.id,
          ...doc.data(),
        };
        newMoAList.push(newMoA);
      });
      return newMoAList;
    });
  }
};

export default function useMoA<TData = MoA>(keyword?: string) {
  return useQuery(["moa", keyword], getMoAList);
}
