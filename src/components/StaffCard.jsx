const StaffCard = ({ staffMember }) => {
  console.log({ staffMember });
  return (
    <div key={staffMember.mal_id} className="flex">
      <img src={staffMember.images.jpg.image_url} alt="" />
      <p id="name">{staffMember.name}</p>
      <p id="positions">
        {staffMember.positions.map((position) => (
          <div>{position}</div>
        ))}
      </p>
    </div>
  );
};

export default StaffCard;
