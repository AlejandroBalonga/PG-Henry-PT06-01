import styled from "styled-components";

export interface SideBarProps {
  onDirection: Function;
}

export default function OrderBrand({ onDirection }: SideBarProps) {
  return (
    <SideBarContainer>
      <Select defaultValue="" onChange={(e) => onDirection(e.target.value)}>
        <option disabled value="">
          {""}Ordenar por marca
        </option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </Select>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  width: auto;
  height: 2rem;
  border-radius: 1rem;
  padding: 0.313rem;
  margin: 0.3rem;
  /* margin: 0.625rem 0 -1.25rem 0; */
  display: flex;
  -webkit-appearance: none;
  cursor: pointer;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
  background: transparent;
  border: none;
  position: relative;
  color: #f0f0f1;
  z-index: 0;
`;

const Select = styled.select`
  border-radius: 10px;
  width: 200px;
`;
