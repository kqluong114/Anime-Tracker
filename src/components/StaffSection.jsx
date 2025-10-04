import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import StaffCard from "./StaffCard";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { getAnimeStaff } from "../api/staffAPI";

const StaffSection = ({ mal_id }) => {
  const [staffFilter, setStaffFilter] = useState("");
  const staffList = useQuery({
    queryKey: [mal_id, "staff"],
    queryFn: () => getAnimeStaff(mal_id),
  });

  return (
    <div>
      {staffList?.data?.map((staff) => (
        <StaffCard key={staff.person.mal_id} staffMember={staff} />
      ))}
    </div>
  );
};

export default StaffSection;
