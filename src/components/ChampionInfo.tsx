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
import { ChampionDetails, Info, Passive } from "../models/ChampionDetails";
import SkillDetails from "./SkillDetails";

interface Props {
  // championInfo: any;
  championId: string;
  versionNumber: string;
}

const ChampionInfo: FC<Props> = ({ championId, versionNumber }) => {
  const [championInfo, setChampionInfo] = useState<ChampionDetails>();
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
          id="panel1a-header">
          <CardMedia
            component="img"
            sx={{ width: 48, height: 48, marginRight: 2 }} // Adjust sizing and margin as needed
            image={`https://ddragon.leagueoflegends.com/cdn/${versionNumber}/img/champion/${championInfo.image.full}`}
            alt="Live from space album cover"
          />
          <Typography variant="subtitle1">
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
          {[championInfo.passive, ...championInfo.spells].map(
            (skill, index) => {
              if (index === 0) {
                return (
                  <SkillDetails
                    skill={skill}
                    versionNumber={versionNumber}
                    skillType="Passive"
                    index={index}
                  />
                );
              } else {
                return (
                  <SkillDetails
                    skill={skill}
                    skillType="Skill"
                    versionNumber={versionNumber}
                    index={index}
                  />
                );
              }
            },
          )}
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
