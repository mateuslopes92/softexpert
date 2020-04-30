import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ReactLoading from "react-loading";

import api from "../../services/api";

import {
  Container,
  TableContainer,
  TableHeader,
  LoadingCentered,
  TableFooter,
  Previous,
  PreviousText,
  Next,
  NextText,
  Page,
} from "./styles";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [companiesFiltered, setCompaniesFiltered] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const loadCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("company/stock/list");

      setLoading(false);
      setCompanies(paginate(response.data.symbolsList, 20, page));
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    setCompaniesFiltered(
      companies.filter((entry) =>
        Object.values(entry).some(
          (val) =>
            typeof val === "string" &&
            val.toUpperCase().includes(searchValue.toUpperCase())
        )
      )
    );
  }, [searchValue]);

  function handleNextPage() {
    setLoading(true);
    setPage(page + 1);
    loadCompanies();
    setLoading(false);
  }

  function handlePrevPage() {
    if (page <= 0) {
      setPage(1);
    } else {
      setLoading(true);
      setPage(page - 1);

      loadCompanies();
      setLoading(false);
    }
  }

  function handleSearch(e) {
    setSearchValue(e);
  }

  return (
    <Container>
      <h1>SoftExpert</h1>

      <h2>Stock Exchange Challenge</h2>

      <TableContainer>
        <TableHeader>
          <div>
            <AiOutlineSearch size={20} color="#47525E" />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button>Compare</button>
        </TableHeader>

        {loading ? (
          <LoadingCentered>
            <ReactLoading
              type="bars"
              color="#7159c1"
              height="20%"
              width="20%"
            />
          </LoadingCentered>
        ) : (
          <table>
            <thead>
              <tr>
                <th />
                <th>Symbol</th>
                <th />
                <th>Price</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {searchValue !== ""
                ? companiesFiltered.map((company) => (
                    <tr key={company.symbol}>
                      <td>
                        <a href="">
                          <FiCircle size={22} />
                        </a>
                      </td>
                      <td>{company.symbol}</td>
                      <td>{company.name}</td>
                      <td>{`$ ${company.price}`}</td>
                      <td>
                        <FiCircle size={22} />
                      </td>
                    </tr>
                  ))
                : companies.map((company) => (
                    <tr key={company.symbol}>
                      <td>
                        <a href="">
                          <FiCircle size={22} />
                        </a>
                      </td>
                      <td>{company.symbol}</td>
                      <td>{company.name}</td>
                      <td>{`$ ${company.price}`}</td>
                      <td>
                        <FiCircle size={22} />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        )}
        <TableFooter>
          <Previous onClick={handlePrevPage}>
            <FiChevronLeft size={30} color="#47525e" />
            <PreviousText>Página anterior</PreviousText>
          </Previous>

          <Page>{`Página ${page > 0 ? page : 1}`}</Page>

          <Next onClick={handleNextPage}>
            <NextText>Página seguinte</NextText>
            <FiChevronRight size={30} color="#47525e" />
          </Next>
        </TableFooter>
      </TableContainer>
    </Container>
  );
}
