import { Box, IconButton } from "@mui/material";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
const ViewInVoive = () => {
  const [inVoice, setInVoice] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchInVoice = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/api/v1/invoice`
      );

      console.log("Response:", data?.invoice);
      setInVoice(data?.invoice);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error.message);
      console.error("Error sending data:", error);
    }
  };
  useEffect(() => {
    fetchInVoice();
  }, []);
  const downloadInVoice = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "inVoice.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Error downloading image:");
      console.error("Error downloading image:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_URL}/api/v1/invoice/${id}`
      );
      if (data.success) {
        fetchInVoice();
      }
    } catch (e) {
      alert("something wrong");
    }
  };
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S.NO</TableCell>
              <TableCell align="left">Seller Name</TableCell>
              <TableCell align="left">Total Price</TableCell>
              <TableCell align="left">Billing Name</TableCell>
              <TableCell align="left">Billing Address</TableCell>
              <TableCell align="left">Shipping Name</TableCell>
              <TableCell align="left">Shipping Address</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inVoice.map((p, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell align="left">{p?.seller?.seller_name}</TableCell>
                <TableCell align="left">₹{p.total_amount}</TableCell>
                <TableCell align="left">{p?.billing?.billing_name}</TableCell>
                <TableCell align="left">
                  {p?.billing?.billing_address}
                </TableCell>

                <TableCell align="left">{p?.shipping?.shipping_name}</TableCell>
                <TableCell align="left">
                  {p?.shipping?.shipping_address}
                </TableCell>
                <TableCell align="left">
                  <IconButton onClick={() => downloadInVoice(p?.invoice_url)}>
                    <DownloadIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(p?._id)}>
                    <IconButton></IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewInVoive;
