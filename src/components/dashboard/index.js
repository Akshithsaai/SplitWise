import React, { useState } from 'react'
import Menubar from './components/Menubar'
import { Box, Divider } from '@mui/material'
import Home from './components/Home';
import Group from './components/Group';
import Friend from './components/Friend';

function Dashboard() {

  const [selectedTab,setSelectedTab] = useState("Home");
  var colorArray = ["#63B598",	"#CE7D78",	"#EA9E70",	"#A48A9E",	"#C6E1E8",	"#648177",	"#0D5AC1",
  "#F205E6",	"#1C0365",	"#14A9AD",	"#4CA2F9",	"#A4E43F",	"#D298E2",	"#6119D0",
  "#D2737D",	"#C0A43C",	"#F2510E",	"#651BE6",	"#79806E",	"#61DA5E",	"#CD2F00",
  "#9348AF",	"#01AC53",	"#C5A4FB",	"#996635",	"#B11573",	"#4BB473",	"#75D89E",
  "#2F3F94",	"#2F7B99",	"#DA967D",	"#34891F",	"#B0D87B",	"#CA4751",	"#7E50A8",
  "#C4D647",	"#E0EEB8",	"#11DEC1",	"#289812",	"#566CA0",	"#FFDBE1",	"#2F1179",
  "#935B6D",	"#916988",	"#513D98",	"#AEAD3A",	"#9E6D71",	"#4B5BDC",	"#0CD36D",
  "#250662",	"#CB5BEA",	"#228916",	"#AC3E1B",	"#DF514A",	"#539397",	"#880977",
  "#F697C1",	"#BA96CE",	"#679C9D",	"#C6C42C",	"#5D2C52",	"#48B41B",	"#E1CF3B",
  "#5BE4F0",	"#57C4D8",	"#A4D17A",	"#225B8",	"#BE608B",	"#96B00C",	"#088BAF",
  "#F158BF",	"#E145BA",	"#EE91E3",	"#05D371",	"#5426E0",	"#4834D0",	"#802234",
  "#6749E8",	"#0971F0",	"#8FB413",	"#B2B4F0",	"#C3C89D",	"#C9A941",	"#41D158",
  "#FB21A3",	"#51AED9",	"#5BB32D",	"#807FB",	"#21538E",	"#89D534",	"#D36647",
  "#7FB411",	"#0023B8",	"#3B8C2A",	"#986B53",	"#F50422",	"#983F7A",	"#EA24A3",
  "#79352C",	"#521250",	"#C79ED2",	"#D6DD92",	"#E33E52",	"#B2BE57",	"#FA06EC",
  "#1BB699",	"#6B2E5F",	"#64820F",	"#1C271",	"#21538E",	"#89D534",	"#D36647",
  "#7FB411",	"#0023B8",	"#3B8C2A",	"#986B53",	"#F50422",	"#983F7A",	"#EA24A3",
  "#79352C",	"#521250",	"#C79ED2",	"#D6DD92",	"#E33E52",	"#B2BE57",	"#FA06EC",
  "#1BB699",	"#6B2E5F",	"#64820F",	"#1C271",	"#9CB64A",	"#996C48",	"#9AB9B7",
  "#06E052",	"#E3A481",	"#0EB621",	"#FC458E",	"#B2DB15",	"#AA226D",	"#792ED8",
  "#73872A",	"#520D3A",	"#CEFCB8",	"#A5B3D9",	"#7D1D85",	"#C4FD57",	"#F1AE16",
  "#8FE22A",	"#EF6E3C",	"#243EEB",	"#1DC18",	"#DD93FD",	"#3F8473",	"#E7DBCE",
  "#421F79",	"#7A3D93",	"#635F6D",	"#93F2D7",	"#9B5C2A",	"#15B9EE",	"#0F5997",
  "#409188",	"#911E20",	"#1350CE",	"#10E5B1",	"#FFF4D7",	"#CB2582",	"#CE00BE",
  "#32D5D6",	"#17232",	"#608572",	"#C79BC2",	"#00F87C",	"#77772A",	"#6995BA",
  "#FC6B57",	"#F07815",];

  return (
    <Box display="flex">
      <Menubar setSelectedTab={setSelectedTab} selectedTab={selectedTab}/>
      <Divider orientation='vertical' flexItem/>
      <Box width="100%">
        {selectedTab === "Home" && <Home />}
        {selectedTab === "Groups" && <Group colors={colorArray}/>}
        {selectedTab === "Friends" && <Friend colors={colorArray.reverse()}/>}
      </Box>
    </Box>
  )
}

export default Dashboard