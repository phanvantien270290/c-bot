
import React from "react";

import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import { getMenuIconMat } from "../utils/menu.util";
import { ID_MENU } from "../utils/enum.util";

interface IIcon extends SvgIconProps {
    id: ID_MENU
}
const IconComponent: React.FC<IIcon> = ({ id, ...props }) => {
    const IconMenu = getMenuIconMat(id)
    return (
        <SvgIcon component={IconMenu}  {...props} inheritViewBox />
    );
}
export default IconComponent