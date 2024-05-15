export const BoxStyle = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: "600",
  maxwidth: "90vw",
  maxheight: "80vh",
  //   width: "auto",
  width: "auto",
  height: 800,
  overflow: "auto",

  // hegith: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,

  // pt: 2,
  // px: 4,
  p: 2,
  px: 1,

  pb: 10,
};

export const CardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: 2,
  paddingBottom: 0,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
};

export const CardMediaStyle = {
  height: 50,
  width: 50,
  objectFit: "cover",
};

export const TypographyStyle = {
  overflow: "hidden", // 오버플로우 처리
  textOverflow: "ellipsis", // 텍스트가 넘칠 때 ellipsis 사용
  whiteSpace: "nowrap", // 텍스트를 한 줄로 표시
  width: 1, // Typ
};
