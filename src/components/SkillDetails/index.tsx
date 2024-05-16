import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { IPassive, ISpell } from "../../models/ChampionDetails";
import { FC, useEffect, useState } from "react";
import { useGetChampionInfo } from "../../store/ChampionStore";

interface Props {
  skill: IPassive | ISpell;
  index: number;
  skillType: string;
  versionNumber: string;
  key: string;
}

// function isPassive(skill: Passive | Spell, skillType: string):skill is Passive{
//     return skillType === "Passive"
// }

const SkillDetails: FC<Props> = ({
  skill,
  skillType,
  index,
  versionNumber,
}) => {
  const showSkillDetails = useGetChampionInfo(
    (state) => state.showSkillDetails,
  );

  const [skillShortCut, setSkillShortCut] = useState("");

  useEffect(() => {
    switch (index) {
      case 0:
        setSkillShortCut("P");
        break;
      case 1:
        setSkillShortCut("Q");
        break;
      case 2:
        setSkillShortCut("W");
        break;
      case 3:
        setSkillShortCut("E");
        break;
      case 4:
        setSkillShortCut("R");
        break;
    }
  }, [index]);

  const replaceTemplatesAndTagsToQuestionMark = (input: string) => {
    // const noTemplates = input.replace(/{{[^{}]*}}/g, "?");
    // // "<...>" 매칭을 찾아 "?"로 대체하지만, 태그 내의 텍스트는 유지
    // const noTags = noTemplates.replace(/<[^>]*>([^<]*)<\/[^>]*>/g, "$1");
    // const noSelfClosingTags = noTags.replace(/<[^>]*\/>/g, "");
    // return noSelfClosingTags;

    const noTemplates = input.replace(/{{[^{}]*}}/g, "?"); // Replace template literals with '?'
    // const noHtmlTags = noTemplates.replace(/<[^>]+>/g, ""); // Remove all HTML tags
    const noHtmlTags = noTemplates.replace(/<\/?[^>]+(>|$)/g, "");

    return noHtmlTags;
  };

  return (
    <Card sx={{ display: "flex", maxWidth: 2048, alignItems: "center" }}>
      {/* <CardMedia
        component="img"
        sx={{ width: 151 }} // 챔피언 이미지 크기 설정
        image="path_to_champion_image.jpg"
        alt="Champion"
      /> */}
      <Card sx={{ position: "relative", width: 50, height: 50 }}>
        <CardMedia
          component="img"
          image={
            skillType === "Passive"
              ? `https://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/passive/${skill.image.full}`
              : `https://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/spell/${skill.image.full}`
          } // 여기에 이미지 경로를 지정
          alt={skill.name}
          sx={{ width: "100%", height: "100%" }}></CardMedia>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            bgcolor: "rgba(0, 0, 0, 0.7)", // 배경 색상과 투명도 조정
            color: "white",
            padding: "2px 4px",
            fontSize: "0.75rem",
            borderTopLeftRadius: 4, // 상단 왼쪽 모서리만 둥글게
          }}>
          {skillShortCut}
        </Box>
      </Card>
      <CardContent sx={{ flex: "1", display: "flex", flexDirection: "column" }}>
        {showSkillDetails && (
          <Typography variant="body2" component="div">
            {skill.name}
          </Typography>
        )}
        <Typography variant="body2" component="div">
          •{replaceTemplatesAndTagsToQuestionMark(skill.description)}
        </Typography>
        {skillType !== "Passive" && (
          <>
            {showSkillDetails && (
              <Typography variant="body2" component="div">
                {/* {(skill as ISpell).tooltip} */}•
                {replaceTemplatesAndTagsToQuestionMark(
                  (skill as ISpell).tooltip,
                )}
              </Typography>
            )}
            <Typography variant="body2" component="div" sx={{ m: 0 }}>
              •Cool:
              {(skill as ISpell).cooldown.map(
                (time, index, self) => (
                  <span key={index}>
                    {time}
                    {index === self.length - 1 ? "" : " / "}
                  </span>
                ),
                //  {
                //   if (index === self.length - 1) return <span> {time} </span>;
                //   else {
                //     return <span> {time} / </span>;
                //   }
                // }
              )}
            </Typography>
            {showSkillDetails && (
              <Typography variant="body2" component="div">
                •Cost:
                {(skill as ISpell).cost.map(
                  (time, index, self) => (
                    <span key={index}>
                      {time}
                      {index === self.length - 1 ? "" : " / "}
                    </span>
                  ),
                  // {
                  //   if (index === self.length - 1) return <span> {time} </span>;
                  //   else {
                  //     return <span> {time} / </span>;
                  //   }
                  // }
                )}
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillDetails;
