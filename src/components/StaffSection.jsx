import StaffCard from "./StaffCard";
const StaffSection = () => {
  const exampleData = [
    {
      person: {
        mal_id: 203,
        url: "https://myanimelist.net/people/203/Justin_Cook",
        images: {
          jpg: {
            image_url:
              "https://cdn.myanimelist.net/images/voiceactors/1/80501.jpg?s=ee808f428c434aee43fe003623f6bf0b",
          },
        },
        name: "Cook, Justin",
      },
      positions: ["Producer"],
    },
    {
      person: {
        mal_id: 77978,
        url: "https://myanimelist.net/people/77978/Kazuhiko_Ikeguchi",
        images: {
          jpg: {
            image_url:
              "https://cdn.myanimelist.net/images/questionmark_23.gif?s=f7dcbc4a4603d18356d3dfef8abd655c",
          },
        },
        name: "Ikeguchi, Kazuhiko",
      },
      positions: ["Producer"],
    },
  ];

  return (
    <div>
      {exampleData.map((staff) => (
        <StaffCard key={staff.person.mal_id} staffMember={staff} />
      ))}
    </div>
  );
};

export default StaffSection;
