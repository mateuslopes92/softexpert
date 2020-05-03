import React, { useEffect, useState, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import {
  FiCircle,
  FiChevronLeft,
  FiChevronRight,
  FiArrowRightCircle,
  FiCheckCircle,
} from "react-icons/fi";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

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
  const [selectItens, setSelectItens] = useState([]);

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

  function handleSelect(e, addItem) {
    e.preventDefault();

    const exists = selectItens.find((i) => i === addItem);

    if (exists) {
      const selectedRemoved = selectItens.filter((r) => r !== addItem);
      setSelectItens(selectedRemoved);
    } else {
      setSelectItens([...selectItens, addItem]);
    }
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
              color="#47525E"
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
                ? companiesFiltered.map((company, index) => (
                    <tr
                      key={company.symbol}
                      className={
                        !selectItens.find((e) => e === company)
                          ? ""
                          : "selected"
                      }
                    >
                      <td>
                        <a
                          type="button"
                          onClick={(e) => handleSelect(e, company)}
                        >
                          {!selectItens.find((e) => e === company) ? (
                            <FiCircle size={28} />
                          ) : (
                            <FiCheckCircle size={28} />
                          )}
                        </a>
                      </td>
                      <td>{company.symbol}</td>
                      <td>{company.name}</td>
                      <td>{`$ ${company.price}`}</td>
                      <td>
                        <Link to={{ pathname: "/detail", state: { company } }}>
                          <FiArrowRightCircle size={28} />
                        </Link>
                      </td>
                    </tr>
                  ))
                : companies.map((company) => (
                    <tr
                      key={company.symbol}
                      className={
                        !selectItens.find((e) => e === company)
                          ? ""
                          : "selected"
                      }
                    >
                      <td>
                        <a
                          type="button"
                          onClick={(e) => handleSelect(e, company)}
                        >
                          {!selectItens.find((e) => e === company) ? (
                            <FiCircle size={28} />
                          ) : (
                            <FiCheckCircle size={28} />
                          )}
                        </a>
                      </td>
                      <td>{company.symbol}</td>
                      <td>{company.name}</td>
                      <td>{`$ ${company.price}`}</td>
                      <td>
                        <Link to={{ pathname: "/detail", state: { company } }}>
                          <FiArrowRightCircle size={28} />
                        </Link>
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
