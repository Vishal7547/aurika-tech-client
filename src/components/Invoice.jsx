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
  const [image, setImage] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
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
      const formDataObject = new FormData();
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
      orderDate: dayjs("2022-04-17"),
      invoiceNo: `INVOICE${Date.now()}`,
      invoiceDetails: "",
      invoiceDate: dayjs("2022-04-17"),
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
          {/* <TextField
            id="filled-basic"
            required
            name="orderDate"
            value={formData?.orderDate}
            onChange={handleInputChange}
            label="Order Date"
            variant="filled"
            fullWidth
          /> */}

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
          {/* <TextField
            id="filled-basic"
            label="Invoice Date"
            required
            name="invoiceDate"
            value={formData?.invoiceDate}
            onChange={handleInputChange}
            variant="filled"
            fullWidth
          /> */}

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
