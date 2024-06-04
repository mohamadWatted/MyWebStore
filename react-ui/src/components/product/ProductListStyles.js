import { css } from "@emotion/react";
import responsiveness from "../css/emotion/responsiveness ";

export const containerStyles = css`
  display: flex;
  flex-direction: column;
  ustify-content: center;
  max-width: 80%;

  margin: 0 auto;
`;
export const cardGridStyles = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
  gap: 6px;
  width: 100%;

  ${responsiveness.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 46px;
  }
  ${responsiveness.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 82px;

  }
`;