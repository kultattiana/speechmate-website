import classNames from "clsx";
import { cva } from "cva";
import { CSSProperties } from "react";

type Color = `normal` | "success" | "warn" | "error" | "info" | "custom";
type Size = `normal` | `small` | `verySmall` | "custom";

const classNameBuilder = getClassNameBuilder();

const Badge: React.FCC<{
  color?: Color;
  size?: Size;
  className?: string;
  style?: CSSProperties;
}> = ({ children, color, size, style, ...props }) => {
  const className = classNameBuilder({
    color,
    size,
  });

  return (
    <div className={classNames(className, props.className)} style={style}>
      {children}
    </div>
  );
};

function getClassNameBuilder() {
  return cva([`flex space-x-2 items-center font-medium`], {
    variants: {
      color: {
        normal: `text-gray-500 bg-gray-100 dark:text-gray-300 dark:bg-dark-800/80`,
        success: `bg-[#c5f3a0] dark:bg-[#c5f3a0] text-[#236d2a] dark:text-[#236d2a]`,
        warn: `bg-yellow-50 dark:bg-yellow-100/10 text-yellow-800`,
        error: `bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-600`,
        info: `bg-sky-50 dark:bg-sky-500/10 text-sky-800 dark:text-sky-600`,
        custom: "",
      },
      size: {
        normal: `rounded-lg px-3 py-2 text-sm`,
        small: `rounded px-2 py-1 text-xs`,
        verySmall: `rounded px-1 py-0`,
        custom: "",
      },
    },
    defaultVariants: {
      color: `normal`,
      size: `normal`,
    },
  });
}

export default Badge;
