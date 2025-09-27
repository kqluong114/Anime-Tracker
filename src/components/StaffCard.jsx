const StaffCard = ({ staffMember }) => {
  return (
    <div key={staffMember.person.mal_id} className="flex">
      <img
        src={staffMember.person.images.jpg.image_url}
        alt=""
        className="h-20"
      />
      <div className="flex flex-col justify-between p-2">
        <p id="name">{staffMember.person.name}</p>
        <p id="positions">{staffMember.positions.join(", ")}</p>
      </div>
    </div>
  );
};

export default StaffCard;
