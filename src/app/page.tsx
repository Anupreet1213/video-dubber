import AddUser from "@/components/AddUser";
import { TableSelection } from "@/components/Table";
import { API_URL } from "@/utils/constants";

const getData = async () => {
  try {
    const data = await fetch(API_URL, { cache: "no-cache" });
    const jsonData = await data.json();
    return jsonData;
  } catch (error) {
    console.log("Failed to fetch: ", error);
  }
};

export default async function Home() {
  const usersData = await getData();
  return (
    <main className="bg-[#242424] text-[#c9c9c9] pt-16 pb-8 flex justify-center">
      <div className="w-[60vw]">
        <AddUser />
        <TableSelection usersData={usersData} />
      </div>
    </main>
  );
}
