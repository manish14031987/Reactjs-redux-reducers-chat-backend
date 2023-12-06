import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toUcFirst } from "../../utils/helpers";
import { useSelector } from "react-redux";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0f4f7c",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    with: "10%",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Index = (props) => {
  const { headCells, rows, title } = props;
  const { isRtl } = useSelector((state) => ({
    isRtl: state.isRtl,
  }));
  const divStyle = isRtl ? "arabic-rtl" : "eng-ltr";
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
        dir={isRtl ? "rtl" : "ltr"}
        className={divStyle}
      >
        <TableHead>
          <TableRow>
            {headCells.map((item, key) => (
              <StyledTableCell key={key}>{item.label}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        {title === "city" && (
          <TableBody>
            {rows.map((row, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell>{key + 1}</StyledTableCell>
                <StyledTableCell>{row.title}</StyledTableCell>
                <StyledTableCell>{row.activePost}</StyledTableCell>
                <StyledTableCell>{row.soldPost}</StyledTableCell>
                <StyledTableCell>{row.user}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        )}
        {title === "order" && (
          <TableBody>
            {rows.map((row, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell>{key + 1}</StyledTableCell>
                {row.category ? (
                  <StyledTableCell>
                    {toUcFirst(row.category.title)}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell>&nbsp;</StyledTableCell>
                )}
                {row.brand ? (
                  <StyledTableCell>
                    {toUcFirst(row.brand.title)}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell></StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        )}
        {title === "keyword" && (
          <TableBody>
            {rows.map((row, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell>{key + 1}</StyledTableCell>
                <StyledTableCell>{toUcFirst(row._id)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        )}
        {title === "post" && (
          <TableBody>
            {rows.map((row, key) => (
              <StyledTableRow key={key}>
                <StyledTableCell>{key + 1}</StyledTableCell>
                <StyledTableCell>
                  {toUcFirst(row.category.title)}
                </StyledTableCell>
                <StyledTableCell>{toUcFirst(row.brand.title)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default Index;
