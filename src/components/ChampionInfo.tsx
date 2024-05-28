import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import { IChampionDetails, IInfo, IPassive } from "../models/ChampionDetails";
import SkillDetails from "./SkillDetails";
import { useOptionStore } from "../store/OptionStore";
import { Edit } from "@mui/icons-material";
import { BUILD_WEB_ADDRESS, SKILL_WEB_ADDRESS } from "../constants";

interface Props {
  // championInfo: any;
  championId: string;
  versionNumber: string;
  showSelectChampion: () => void;
}

const ChampionInfo: FC<Props> = ({
  championId,
  versionNumber,
  showSelectChampion,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [championInfo, setChampionInfo] = useState<IChampionDetails>();
  const [engChampionInfo, setEngChampionInfo] = useState<IChampionDetails>();
  // const [openChampionClickMenu, setOpenChampionClickMenu] = useState(false);
  const { testMode, minimumView } = useOptionStore((state) => state.options);

  const openChampionClickMenu = Boolean(anchorEl);

  useEffect(() => {
    // console.log("championInfo in Champion Component", championInfo);
    // if (!championInfo) {
    //   // return alert("no possible");
    //   return;
    // }
    callGetChampionInfoAPI();
    callGetChampionEngInfoAPI();
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
  const callGetChampionEngInfoAPI =
    // useCallback(
    async () => {
      const {
        data: { data },
      } = await axios.get(
        `https://ddragon.leagueoflegends.com/cdn/${versionNumber}/data/en_US/champion/${championId}.json`,
      );

      console.log("data in callGetChampionInfoAPI", data);

      const championDetail = data[`${championId}`];

      console.log("championDetail: ", championDetail);
      setEngChampionInfo(championDetail);
    };
  // ,
  // [anchorEl]);

  const onClickChampionName = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleCloseChampionClickMenu = useCallback(
    (event: any) => {
      event.stopPropagation();

      setAnchorEl(null);
    },
    [anchorEl],
  );

  const selectMenuButton = useCallback(
    async (event: React.MouseEvent<HTMLLIElement>) => {
      // event.stopPropagation();
      event.stopPropagation();
      setAnchorEl(null);
      const pageType = event.currentTarget.getAttribute("page-type");

      if (pageType === "build-page") {
        window.open(
          `${BUILD_WEB_ADDRESS}/${championId.toLowerCase()}/build`,
          "_blank",
        );
      }

      if (pageType === "skill-page") {
        // let attemptCount = 0;

        // let url = `/ko-kr/champions/${engChampionInfo?.name
        let url = `${SKILL_WEB_ADDRESS}/${engChampionInfo?.name
          .replace(".", "")
          .replace(" ", "-")
          .toLowerCase()}`;
        // let response = await checkIfPageIsLoading(url);
        // if (response === 404) {
        //   url = `${SKILL_WEB_ADDRESS}/${championId.toLowerCase()}`;
        //   response = await checkIfPageIsLoading(url);
        // }

        // if (response === 404) {
        //   url = `${SKILL_WEB_ADDRESS}`;
        // }

        window.open(url, "_blank");
      }

      // console.log("event: ", event);
      // console.log("event: ", event.currentTarget.getAttribute("page-type"));
    },
    [engChampionInfo, championId],
  );

  /*
  const checkIfPageIsLoading = useCallback(
    async (url: string) => {
      try {
        const responseData = await axios.get(url);
        console.log("responseData: ", responseData);

        const response = await axios.head(url);
        // if (response.status===200) {

        //   window.open(url, '_blank')
        // }
        // if (response.status===404){
        //   checkIfPageIsLoading
        // }
        return response.status;
      } catch (error) {
        console.error(error);
        return 404;
      }
    },
    [engChampionInfo],
  );
*/
  const onClickEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    showSelectChampion();
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
          <Button
            onClick={onClickChampionName}
            id="championClickMenuButton"
            aris-controls={
              openChampionClickMenu ? "championClickMenu" : undefined
            }
            aria-haspopup="true"
            aria-expanded={openChampionClickMenu ? "true" : undefined}>
            <Typography variant="subtitle1" sx={{ my: 0 }}>
              <span>{championId}</span>
              <span> / {championInfo.name}</span>
            </Typography>
          </Button>
          <Menu
            id="championClickMenu"
            anchorEl={anchorEl}
            open={openChampionClickMenu}
            onClose={handleCloseChampionClickMenu}
            MenuListProps={{
              "aria-labelledby": "championClickMenuButton",
            }}>
            <MenuItem
              page-type="build-page"
              // key="build-page"
              // datatype="build-page"
              onClick={selectMenuButton}>
              Open Build Page
            </MenuItem>
            <MenuItem
              page-type="skill-page"
              // key="skill-page"
              // datatype="skill-page"
              onClick={selectMenuButton}>
              Open Skill Page
            </MenuItem>
          </Menu>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={onClickEdit}
            // variant="outlined"
            // style={{ maxWidth: "250px" }}
            sx={{ ml: 1 }}>
            <Edit />
          </IconButton>
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
