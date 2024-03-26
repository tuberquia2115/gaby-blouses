import { Color } from '@/interfaces';
import clsx from 'clsx';

interface Props {
  availableColors: Color[];
  selectedColor: Color;
}

export const ColorSelector = ({ selectedColor, availableColors }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">
        Color: <span className="text-[#a2a3a5] capitalize">{selectedColor.color}</span>
      </h3>
      <div className="flex">
        {availableColors.map((color) => (
          <div
            key={color.value}
            className={clsx(`w-5 h-5 ml-2 border border-white`, {
              'border-2 border-blue-600': color.value === selectedColor.value,
            })}
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
    </div>
  );
};
