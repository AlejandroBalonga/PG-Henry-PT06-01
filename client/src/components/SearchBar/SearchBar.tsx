import React, { useState } from "react";
import styled from "styled-components";
import { ImSearch } from "react-icons/im";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { getArticulos } from "../../actions";
import axios from "axios";

const { REACT_APP_API_URL = "http://localhost:3001" } = process.env;

export interface SearchBarProps {
  onSearch: Function;
}

// export default function SearchBar({ onSearch }: SearchBarProps) {
export default function SearchBar() {
  const [state, setState] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dispatch = useDispatch<any>();

  function handlechange(e) {
    setState(e.target.value);
    axios
      .get<string[]>(REACT_APP_API_URL + "/product/suggestions", {
        params: { prefix: e.target.value },
      })
      .then((res) => {
        setSuggestions(res.data);
      });
  }

  function handleclick() {
    // if (state === "") {
    //   // alert("Enter a product to search...")
    //   Swal.fire({
    //     title: "Error!",
    //     text: "Introduce un producto para buscar...",
    //     icon: "error",
    //     confirmButtonText: "Volver",
    //     confirmButtonColor: "#335d90",
    //   });
    // }
    // onSearch(state);
    dispatch(
      getArticulos({
        page: 1,
        pageSize: 12,
        name: state,
        order: "name",
        direction: "asc",
        categoryId: undefined,
      })
    );
  }

  return (
    <SearchBarContainer>
      <Input
        autoFocus
        onChange={handlechange}
        placeholder="Encontrá lo que buscás"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            // filterOreder({ name: searchName });
            handleclick();
          }
        }}
        list="suggestions"
      />
      <datalist id="suggestions">
          {suggestions.map((suggestion, i) => (
            <option key={i} value={suggestion} />
          ))}
        </datalist>
      <Search onClick={handleclick} title="buscar">
        <ImSearch />
      </Search>
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  height: auto;
  border-radius: 0.625rem;
  padding: 0.313rem;
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
  margin-left: 2vw;
`;

const Input = styled.input`
  type: "text"; // ver si imporatndo bien anda
  width: 40%;
  height: 2.74rem;
  border-top-left-radius: 0.313rem;
  border-bottom-left-radius: 0.313rem;
  border: 1px solid black;
  text-align: center;
  /* display: block; */
  /* padding: 5px 200px 5px 10px; */
  ::placeholder {
    color: #bcb8b1;
  }
`;

const Search = styled.button`
  width: 2.65rem;
  height: 2.74rem;
  /* border-radius: 10px; */
  border-top-right-radius: 0.313rem;
  border-bottom-right-radius: 0.313rem;
  /* padding: 5px; */
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-appearance: none;
  cursor: pointer;
  font-size: 3vh;
  background-color: #335d90;
  /* box-shadow: 0 0 40px 40px #335d90 inset, 0 0 0 0 #335d90;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out; */
  color: white;
  &:hover {
    /* box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    color: #335d90; */
    background-color: #183659;
  }
  &:active {
    /* box-shadow: 0 0 10px 0 #335d90 inset, 0 0 10px 4px #335d90;
    color: #335d90; */
    background-color: #183659;
  }
`;

// const DivRight = styled.div`
