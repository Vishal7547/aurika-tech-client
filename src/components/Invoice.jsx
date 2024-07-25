import {
  Box,
  Grid,
  TextField,
  Typography,
  Checkbox,
  IconButton,
  Avatar,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ShortTextIcon from "@mui/icons-material/ShortText";
import React, { useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Invoice = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sellerName: "",
    sellerAddress: "",
    sellerCity: "",
    sellerState: "",
    sellerPinCode: "",
    sellerPanNo: "",
    sellerGstNo: "",
    placeOfSupply: "",
    billingName: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingStateCode: "",
    shippingName: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingPinCode: "",
    shippingStateCode: "",
    placeOfDelivery: "",
    orderNo: `ORDER${Date.now()}`,
    orderDate: dayjs("2022-04-17"),
    invoiceNo: `INVOICE${Date.now()}`,
    invoiceDetails: "",
    invoiceDate: dayjs("2022-04-17"),
    image: null,
    reverseCharge: false,
  });
  const [product, setProduct] = useState({
    taxRate: "",
    discount: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [productList, setProductList] = useState([]);
  const [image, setImage] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setImage(imagePreviewUrl);
      setFormData((prevState) => ({
        ...prevState,
        image: file,
      }));
    }
  };
  const handleCheckboxChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      reverseCharge: e.target.checked,
    }));
  };
  const validateForm = () => {
    console.log(formData);
    return Object.values(formData).every(
      (value) => value !== "" && value !== null
    );
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const productInfo = productList.map((p, i) => {
        return {
          description: p.description,
          unit_price: p.price,
          quantity: p.quantity,
          discount: p.discount,
          tax_rate: p.taxRate,
        };
      });

      const formDataObject = new FormData();
      formDataObject.append("items", JSON.stringify(productInfo));

      formDataObject.append("seller_name", formData.sellerName);
      formDataObject.append("seller_address", formData.sellerAddress);
      formDataObject.append("seller_city", formData.sellerCity);
      formDataObject.append("seller_state", formData.sellerState);
      formDataObject.append("seller_pincode", formData.sellerPinCode);
      formDataObject.append("seller_panNo", formData.sellerPanNo);
      formDataObject.append("seller_gst_reg_no", formData.sellerGstNo);
      formDataObject.append("place_of_supply", formData.placeOfSupply);
      formDataObject.append("billing_name", formData.billingName);
      formDataObject.append("billing_address", formData.billingAddress);
      formDataObject.append("billing_city", formData.billingCity);
      formDataObject.append("billing_state", formData.billingState);
      formDataObject.append("billing_pincode", formData.billingPinCode);
      formDataObject.append("billing_state_ut_code", formData.billingStateCode);
      formDataObject.append("shipping_name", formData.shippingName);
      formDataObject.append("shipping_address", formData.shippingAddress);
      formDataObject.append("shipping_city", formData.shippingCity);
      formDataObject.append("shipping_state", formData.shippingState);
      formDataObject.append("shipping_pincode", formData.shippingPinCode);
      formDataObject.append(
        "shipping_state_ut_code",
        formData.shippingStateCode
      );
      formDataObject.append("place_of_delivery", formData.placeOfDelivery);
      formDataObject.append("order_orderNo", formData.orderNo);
      formDataObject.append(
        "order_orderDate",
        formData.orderDate.format("YYYY-MM-DD")
      ); // Adjust format as needed
      formDataObject.append("invoice_no", formData.invoiceNo);
      formDataObject.append("invoice_details", formData.invoiceDetails);
      formDataObject.append(
        "invoice_date",
        formData.invoiceDate.format("YYYY-MM-DD")
      ); // Adjust format as needed
      formDataObject.append("reverse_charge", formData.reverseCharge);

      if (formData.image) {
        formDataObject.append("signature", formData.image);
      }

      try {
        setLoading(true);
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/api/v1/invoice`,
          formDataObject,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Response:", data?.data);
        downloadImage(data?.data?.invoice_url);

        handleReset();
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.log(error.message);
        console.error("Error sending data:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };
  const handleReset = () => {
    setFormData({
      sellerName: "",
      sellerAddress: "",
      sellerCity: "",
      sellerState: "",
      sellerPinCode: "",
      sellerPanNo: "",
      sellerGstNo: "",
      placeOfSupply: "",
      billingName: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingPinCode: "",
      billingStateCode: "",
      shippingName: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingPinCode: "",
      shippingStateCode: "",
      placeOfDelivery: "",
      orderNo: `ORDER${Date.now()}`,
      orderDate: dayjs("2024-07-25"),
      invoiceNo: `INVOICE${Date.now()}`,
      invoiceDetails: "",
      invoiceDate: dayjs("2024-07-25"),
      image: null,

      reverseCharge: false,
    });
  };
  const downloadImage = async (url) => {
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
  const validateProduct = () => {
    console.log(product);
    return Object.values(product).every(
      (value) => value !== "" && value !== null
    );
  };
  const handleProductsSubmit = () => {
    if (validateProduct()) {
      setProductList([...productList, product]);
      setProduct({
        taxRate: "",
        discount: "",
        price: "",
        quantity: "",
        description: "",
      });
    } else {
      alert("Please fill in all required fields of products section");
    }
  };
  return (
    <Box padding={2}>
      {/* seller */}
      <Box padding={1}>
        <Typography variant="h4">Seller</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="sellerName"
            value={formData?.sellerName}
            onChange={handleInputChange}
            label="Name"
            variant="filled"
            defaultValue="Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            name="sellerAddress"
            value={formData?.sellerAddress}
            required
            onChange={handleInputChange}
            label="address"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="sellerCity"
            value={formData?.sellerCity}
            onChange={handleInputChange}
            label="city"
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="sellerState"
            value={formData?.sellerState}
            onChange={handleInputChange}
            label="State"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            onChange={handleInputChange}
            name="sellerPinCode"
            value={formData?.sellerPinCode}
            label="Pin Code"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="sellerPanNo"
            value={formData?.sellerPanNo}
            onChange={handleInputChange}
            label="Pan No"
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="sellerGstNo"
            value={formData?.sellerGstNo}
            onChange={handleInputChange}
            label="Gst No"
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>
      {/* place of supply */}
      <Box padding={1} marginTop={1}>
        <Typography variant="h4">Place Of Supply</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id="filled-basic"
            label="Place Of Supply"
            required
            name="placeOfSupply"
            value={formData?.placeOfSupply}
            onChange={handleInputChange}
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>
      {/* Billing */}

      <Box padding={1}>
        <Typography variant="h4">Billing</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="billingName"
            value={formData?.billingName}
            onChange={handleInputChange}
            label="Name"
            variant="filled"
            defaultValue="Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="billingAddress"
            value={formData?.billingAddress}
            onChange={handleInputChange}
            label="address"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="billingCity"
            value={formData?.billingCity}
            onChange={handleInputChange}
            label="city"
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="State"
            required
            name="billingState"
            value={formData?.billingState}
            onChange={handleInputChange}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="billingPinCode"
            value={formData?.billingPinCode}
            onChange={handleInputChange}
            label="Pin Code"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="State/UT/Code"
            required
            name="billingStateCode"
            value={formData?.billingStateCode}
            onChange={handleInputChange}
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Shipping */}
      <Box padding={1}>
        <Typography variant="h4">Shipping</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="shippingName"
            value={formData?.shippingName}
            onChange={handleInputChange}
            label="Name"
            variant="filled"
            defaultValue="Name"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="shippingAddress"
            value={formData?.shippingAddress}
            onChange={handleInputChange}
            label="address"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="shippingCity"
            value={formData?.shippingCity}
            onChange={handleInputChange}
            label="city"
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="shippingState"
            value={formData?.shippingState}
            onChange={handleInputChange}
            label="State"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="shippingPinCode"
            value={formData?.shippingPinCode}
            onChange={handleInputChange}
            label="Pin Code"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            name="shippingStateCode"
            value={formData?.shippingStateCode}
            onChange={handleInputChange}
            label="State/UT/Code"
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      {/* place of Delivery */}
      <Box padding={1} marginTop={1}>
        <Typography variant="h4">Place Of Delivery</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id="filled-basic"
            label="Place Of Delivery"
            required
            name="placeOfDelivery"
            value={formData?.placeOfDelivery}
            onChange={handleInputChange}
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>
      {/* order */}
      <Box padding={1}>
        <Typography variant="h4">Order</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="filled-basic"
            disabled
            name="orderNo"
            value={formData?.orderNo}
            onChange={handleInputChange}
            label="Order No"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker", "DatePicker", "DatePicker"]}
            >
              <DatePicker
                label="Order Date"
                variant="filled"
                required
                value={formData?.orderDate}
                onChange={(newValue) =>
                  setFormData((val) => ({
                    ...formData,
                    orderDate: newValue,
                  }))
                }
                // onChange={handleInputChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
      {/* Invoice */}
      <Box padding={1}>
        <Typography variant="h4">Invoice</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="Invoice No"
            disabled
            name="invoiceNo"
            value={formData?.invoiceNo}
            onChange={handleInputChange}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="Invoice Details"
            required
            name="invoiceDetails"
            value={formData?.invoiceDetails}
            onChange={handleInputChange}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs} variant="filled">
            <DemoContainer
              components={["DatePicker", "DatePicker", "DatePicker"]}
            >
              <DatePicker
                label="Invoice Date"
                required
                value={formData?.invoiceDate}
                onChange={(newValue) =>
                  setFormData((val) => ({
                    ...formData,
                    invoiceDate: newValue,
                  }))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
      </Grid>
      {/* Products */}
      <Box padding={1}>
        <Typography variant="h4">Products</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            label="description"
            name="description"
            value={product?.description}
            onChange={handleProductChange}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="Quantity"
            required
            name="quantity"
            value={product?.quantity}
            onChange={handleProductChange}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="Price"
            required
            name="price"
            value={product?.price}
            onChange={handleProductChange}
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            required
            label="Discount"
            name="discount"
            value={product?.discount}
            onChange={handleProductChange}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            id="filled-basic"
            label="Tax rate"
            required
            name="taxRate"
            value={product?.taxRate}
            onChange={handleProductChange}
            variant="filled"
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid container spacing={1} marginTop={1}>
        <Grid item>
          <Button variant="contained" onClick={handleProductsSubmit}>
            Add Product
          </Button>
        </Grid>
      </Grid>
      {productList.length > 0 && (
        <Grid container spacing={1} marginTop={2}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>S.NO</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Discount</TableCell>
                    <TableCell align="left">Tax Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productList.map((p, i) => (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left">{p.description}</TableCell>
                      <TableCell align="left">₹{p.price}</TableCell>
                      <TableCell align="left">{p.quantity}</TableCell>
                      <TableCell align="left">{p.discount}</TableCell>
                      <TableCell align="left">{p.taxRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}

      {/* Signature Upload */}
      <Box padding={1}>
        <Typography variant="h4">Signature Upload</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-button"
            type="file"
            onChange={handleImageChange}
          />
          {/* Label to trigger the file input */}
          <label htmlFor="upload-button">
            <Button
              variant="contained"
              startIcon={<ShortTextIcon sx={{ fontSize: 30 }} />}
              size="large"
              component="span"
            >
              Upload Signature
            </Button>
          </label>
          {formData?.image && (
            <Avatar
              alt="Uploaded Photo"
              src={image}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </Grid>
      </Grid>

      {/* reverse_charge */}
      <Box padding={1}>
        <Typography variant="h4">Reverse Charge</Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Checkbox
            {...label}
            defaultChecked
            size="large"
            onChange={handleCheckboxChange}
            required
          />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Button
            type="button"
            variant="contained"
            size="large"
            onClick={handleSubmit}
          >
            {loading ? "Loading" : "Generate Invoice"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Invoice;
