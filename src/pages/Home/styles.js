import styled from "styled-components";

export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap");

  h1 {
    font-size: 40px;
    font-family: "Lato";
    font-weight: 700;
    color: #47525e;
  }

  h2 {
    margin-top: 37px;
    font-size: 34px;
    font-family: "Lato";
    color: #47525e;
    font-weight: 700;
  }
`;

export const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 50px;

  div {
    background: transparent;
    padding: 20px 45px;
    width: 649px;
    border-bottom: 1px solid #eff2f7;
    color: #f4edeb;
    display: flex;
    align-items: center;

    input {
      border: 0;
      flex: 1;
      margin-left: 25px;
      font-family: "Lato";
      font-size: 18px;
      color: #47525e;

      &::placeholder {
        color: #47525e;
        font-family: "Lato";
        font-weight: 400;
      }
    }
  }
`;

export const TableContainer = styled.div`
  margin-top: 42px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #47525e;
    width: 192px;
    color: #fff;
    font-family: "Lato";
    font-weight: 400;
    border-radius: 4px;
    border: 0;
    font-size: 18px;
    height: 50px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 40px;
    border: 1px solid #c0ccda;
    font-family: "Lato";

    tr {
      border: none;
      text-align: left;
      height: 50px;
      color: #47525e;
      font-size: 16px;
      font-weight: 700;
      line-height: 20px;
      border: 1px solid #c0ccda;

      &:not(:last-of-type) {
        border-bottom: 1px solid #eee;
      }

      th {
        background: #eff2f7;
        text-align: left;

        &:nth-child(1) {
          text-align: center;
          width: 80px;
        }
        &:nth-child(2) {
          text-align: left;
          width: 140px;
        }
        &:nth-child(3) {
          text-align: left;
        }
        &:nth-child(4) {
          text-align: center;
          width: 80px;
        }
        &:nth-child(5) {
          text-align: center;
          width: 100px;
        }
      }
    }
    tr {
      color: #47525e;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      border: 1px solid #c0ccda;

      td {
        &:nth-child(1) {
          text-align: center;
        }
        &:nth-child(2) {
          text-align: left;
          padding-left: 8px;
        }
        &:nth-child(3) {
          text-align: left;
        }
        &:nth-child(4) {
          text-align: center;
        }
        &:nth-child(5) {
          text-align: center;
        }

        a {
          text-decoration: none;
          color: #47525e;
        }
      }
    }
  }
`;

export const LoadingCentered = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  margin: 200px 0;
`;

export const TableFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const Previous = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export const PreviousText = styled.span`
  font-family: "Lato";
  font-size: 16px;
  font-weight: 700;
  color: #47525e;
`;

export const Next = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

export const NextText = styled.span`
  font-family: "Lato";
  font-size: 16px;
  font-weight: 700;
  color: #47525e;
`;

export const Page = styled.span`
  font-family: "Lato";
  font-size: 16px;
  font-weight: 700;
  color: #47525e;
`;
