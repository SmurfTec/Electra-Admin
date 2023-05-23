import { ReactSVG } from 'react-svg'
import styled from 'styled-components'
const StyledSVG = styled(ReactSVG)`
  svg {
    path{
      fill: ${({ $filled, fillcolor }: any) => ($filled ? 'white' : fillcolor !== undefined ? fillcolor : '#A4A4A4')} !important;
      
    }
  }
  `;
export const SVGIcon = ({ src, filled, fillcolor }: any) => {
  return (
    <>
      <StyledSVG src={src} $filled={filled} fillcolor={fillcolor} />
    </>
  )
}