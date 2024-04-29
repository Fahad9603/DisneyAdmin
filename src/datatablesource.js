export const userColumns = [
  // { field: "id", headerName: "ID", width: 230 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 230,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
 //   },
  //},
];

export const SliderColumns = [

{ field: "SliderTitle", headerName: "Title", width: 170 },
{
  field: "SliderImage",
  headerName: "Title Image",
  width: 150,
  renderCell: (params) => {
    return (
      <div className="cellWithImg">
        <img className="cellImg" src={params.row.img} alt="avatar" />
        {params.row.username}
      </div>
    );
  },
},
];

export const MovieColumns = [
  // {
  //   field: "id",
  //   headerName: "Movie ID",
  //   width: 70,
  // },
   { field: "title", headerName: "Title", width: 70 },
   { field: "subTitle", headerName: "Sub Title", width: 200 },
   {
    field: "titleImg",
    headerName: "Title Image",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "cardImg",
    headerName: "Card Image",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },


  // {
  //   field: "address",
  //   headerName: "Address",
  //   width: 230,
  // },
  // {
  //   field: "phone",
  //   headerName: "Phone Number",
  //   width: 230,
  // },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
 //   },
  //},
];
