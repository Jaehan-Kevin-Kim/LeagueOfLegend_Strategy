import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { IChampionDetails, IInfo, IPassive } from "../models/ChampionDetails";
import SkillDetails from "./SkillDetails";
import { useOptionStore } from "../store/OptionStore";

interface Props {
  // championInfo: any;
  championId: string;
  versionNumber: string;
}

const ChampionInfo: FC<Props> = ({ championId, versionNumber }) => {
  const [championInfo, setChampionInfo] = useState<IChampionDetails>();
  const { testMode, minimumView } = useOptionStore((state) => state.options);
  useEffect(() => {
    // console.log("championInfo in Champion Component", championInfo);
    // if (!championInfo) {
    //   // return alert("no possible");
    //   return;
    // }
    callGetChampionInfoAPI();
  }, [championId, versionNumber]);

  const callGetChampionInfoAPI = async () => {
    const {
      data: { data },
    } = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${versionNumber}/data/ko_KR/champion/${championId}.json`,
    );

    console.log("data in callGetChampionInfoAPI", data);

    const championDetail = data[`${championId}`];

    console.log("championDetail: ", championDetail);
    setChampionInfo(championDetail);
  };

  if (!championInfo) {
    return null;
  }

  return (
    <>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            my: 0,
            py: 0,
            minHeight: 0, // 최소 높이 제거
            "& .MuiAccordionSummary-content": {
              // 내부 컨텐츠의 마진 조절
              margin: 0,
              alignItems: "center",
            },
            "& .MuiAccordionSummary-expandIconWrapper": {
              // 확장 아이콘의 패딩 조절
              marginRight: 1,
            },
          }}>
          {!minimumView && (
            <CardMedia
              component="img"
              sx={{ width: 48, height: 48, marginRight: 2 }} // Adjust sizing and margin as needed
              image={
                testMode
                  ? ""
                  : `https://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/champion/${championInfo.image.full}`
              }
              alt="Live from space album cover"
            />
          )}
          <Typography variant="subtitle1" sx={{ my: 0 }}>
            <span>{championId}</span>
            <span> / {championInfo.name}</span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            flexDirection: "column",
            // alignItems: "center",
            // justifyContent: "center",
          }}>
          {!minimumView
            ? [championInfo.passive, ...championInfo.spells].map(
                (skill, index) => {
                  if (index === 0) {
                    return (
                      <SkillDetails
                        key={skill.name}
                        skill={skill}
                        versionNumber={versionNumber}
                        skillType="Passive"
                        index={index}
                      />
                    );
                  } else {
                    return (
                      <SkillDetails
                        key={skill.name}
                        skill={skill}
                        skillType="Skill"
                        versionNumber={versionNumber}
                        index={index}
                      />
                    );
                  }
                },
              )
            : [...championInfo.spells].map((skill, index) => {
                return (
                  <SkillDetails
                    key={skill.name}
                    skill={skill}
                    skillType="Skill"
                    versionNumber={versionNumber}
                    index={index}
                  />
                );
              })}
        </AccordionDetails>
      </Accordion>
    </>
    // <Card>

    // </Card>
    // <div>
    //   <div>{championInfo.name}</div>
    //   <img
    //     src={`https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${championInfo.image.full}`}
    //     alt={championInfo.name}></img>
    //   <div>
    //     Skills
    //     <div>
    //       passive
    //       {/* Passive 명시 */}
    //       {/* Passive 이름 */}
    //       {/* Passive 이미지 */}
    //       {/* Passive 간단 설명 */}
    //     </div>
    //     <div>Q</div>
    //     <div>W</div>
    //     <div>E</div>
    //     <div>R</div>
    //   </div>
    // </div>
  );
};

export default ChampionInfo;
