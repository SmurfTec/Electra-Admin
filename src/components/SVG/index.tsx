import { ReactSVG } from 'react-svg';
import styled from 'styled-components';
const StyledSVG = styled(ReactSVG)`
  cursor: pointer;
  object-fit: contain;
  svg {
    width: ${({ width }: any) => width}; /* Added width */
    height: ${({ height }: any) => height}; /* Added height */
    path {
      fill: ${({ $filled, fillcolor }: any) =>
        $filled
          ? fillcolor?.length > 0
            ? fillcolor
            : 'white'
          : fillcolor !== undefined
          ? fillcolor
          : '#A4A4A4'} !important;
      stroke: ${({ $filled, fillcolor }: any) =>
        $filled && fillcolor?.length > 0 && 'white'} !important;
    }
  }
`;
export const SVGIcon = ({
  src,
  filled,
  fillcolor,
  width,
  height,
  ...props
}: any) => {
  return (
    <>
      <StyledSVG
        src={src}
        width={width}
        height={height}
        $filled={filled}
        fillcolor={fillcolor}
        {...props}
      />
    </>
  );
};
