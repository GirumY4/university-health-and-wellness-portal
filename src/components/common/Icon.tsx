import { forwardRef } from "react";
import type SvgIconProps from "@mui/material/SvgIcon";
import { IconMap, type IconName, getIconByName } from "../../icons";

export interface IconProps extends SvgIconProps {
  name: IconName;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, ...svgIconProps }, ref) => {
    const IconComponent = getIconByName(name);

    if (!IconComponent) {
      console.warn(`Icon "${name}" not found.`);
      const DefaultIcon = IconMap.Dashboard;
      return <DefaultIcon name={name} ref={ref} {...svgIconProps} />;
    }

    return <IconComponent name={name} ref={ref} {...svgIconProps} />;
  }
);

Icon.displayName = "Icon";
export default Icon;
