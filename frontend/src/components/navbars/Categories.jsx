import React from "react"; // Import React from 'react'
import Container from "../Container";
import CategoryBox from "../CategoryBox";
import {
  TbBeach,
  TbMountain,
  TbPool
  
} from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

// React Vite hooks import
import { useLocation } from "react-router-dom";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
    mota: "Biển"
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills!",
    mota: "Cối xoay gió"
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern!",
    mota: "Hiện đại"
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside!",
    mota: "Nông thôn"
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a beautiful pool!",
    mota: "Bể bơi"
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is on an island!",
    mota: "Đảo"
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is near a lake!",
    mota: "Hồ"
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property offers camping activities!",
    mota: "Cắm trại"
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property is in a barn!",
    mota: "Trang trại"
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property is brand new and luxurious!",
    mota: "Sang trọng"
  },
];

const Categories = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const pathname = location.pathname;

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item, index) => (
          <CategoryBox
            key={index}
            label={item.label}
            selected={item.label.toLowerCase() === category}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
