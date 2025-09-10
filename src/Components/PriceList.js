"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  useMediaQuery
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { sendOrderEmail } from "../utils/sendEmailOrder";

const PriceList = ({ userRole }) => {
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState("success");

  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Check if mobile
  const isMobile = useMediaQuery("(max-width:600px)");

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  const handleQuantityChange = (id, value) => {
    const qty = value === "" ? "" : Number(value);
    setQuantities((prev) => ({ ...prev, [id]: qty }));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setOpenDeleteModal(true);
  };

  const submitEdit = async () => {
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...selectedProduct }),
    });
    setOpenEditModal(false);
    fetchProducts();
  };

  const confirmDelete = async () => {
    await fetch(`/api/products?id=${selectedProduct.id}`, { method: "DELETE" });
    setOpenDeleteModal(false);
    fetchProducts();
  };

  const handlePlaceOrder = async () => {
    const productsToOrder = products
      .filter((p) => quantities[p.id] && quantities[p.id] > 0)
      .map((p) => ({
        productId: p.id,
        name: p.name,
        quantity: quantities[p.id],
        rate: p.rate,
        total: quantities[p.id] * p.rate,
      }));

    if (productsToOrder.length === 0)
      return alert("Please fill quantity for at least one product");

    const orderData = { products: productsToOrder };

    const res = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (data.success) {
      setSnackMsg("Order placed successfully!");
      setSnackSeverity("success");
      setSnackOpen(true);
      setQuantities({});
      sendOrderEmail(orderData);
    } else {
      setSnackMsg("Failed to place order");
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  };

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div>
      {/* Category Filter + Place Order */}
      <div style={{ display: "flex", alignItems: "center", margin: "20px 5px", justifyContent: 'space-between' }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="category-filter-label" sx={{ color: "black", mb: 2 }} shrink>
          </InputLabel>
          <Select
            labelId="category-filter-label"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            sx={{
              color: "black",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "black" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "gray" },
              ".MuiSvgIcon-root": { color: "black" },
            }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ color: "black" }}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip title='Please fill quantity and Place the Order'>
          <Button
            variant="contained"
            onClick={handlePlaceOrder}
            sx={{
              marginLeft: "auto",
              backgroundColor: "red",
              color: "white",
              fontWeight: "bold",
              animation: "blinkRed 1s infinite",
              "&:hover": { backgroundColor: "darkred" },
            }}
          >
            Place Order
          </Button>
        </Tooltip>
        <style jsx>{`
          @keyframes blinkRed {
            0%, 50%, 100% { background-color: red; }
            25%, 75% { background-color: darkred; }
          }
        `}</style>
      </div>

      {/* Table */}
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: "95%",
          mx: "auto",
          my: 2,
          maxHeight: 500,
          overflowY: "auto",
          overflowX: "auto", // horizontal scroll for mobile
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">Product Name</TableCell>
              {!isMobile && <TableCell align="center">Content</TableCell>}
              {!isMobile && <TableCell align="center">Rate</TableCell>}
              <TableCell align="center">Quantity</TableCell>
              {!isMobile && <TableCell align="center">Final Rate</TableCell>}
              {userRole?.role === "admin" && <TableCell align="center">Action</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {Object.keys(groupedProducts).map((category) => {
              if (selectedCategory !== "All" && selectedCategory !== category) return null;

              return (
                <React.Fragment key={category}>
                  <TableRow sx={{ bgcolor: "#cce5ff" }}>
                    <TableCell colSpan={userRole?.role === "admin" ? 7 : 6} align="center" sx={{ fontWeight: "bold" }}>
                      {category}
                    </TableCell>
                  </TableRow>

                  {groupedProducts[category].map((p, i) => {
                    return (
                      <TableRow key={p.id} sx={{ bgcolor: i % 2 === 0 ? "#f9fdfd" : "#f0f8ff" }}>
                        <TableCell align="center">{p.id}</TableCell>
                        <TableCell align="center">{p.name}</TableCell>
                        {!isMobile && <TableCell align="center">{p.content}</TableCell>}
                        {!isMobile && <TableCell align="center">{p.rate.toFixed(2)}</TableCell>}
                        <TableCell align="center">
                          {userRole?.role !== "admin" ? (
                            <TextField
                              type="number"
                              size="small"
                              value={quantities[p.id] || ""}
                              onChange={(e) => handleQuantityChange(p.id, e.target.value)}
                              inputProps={{ min: 0, style: { textAlign: "center", padding: "4px 0" } }}
                              sx={{ width: { xs: 50, sm: 70 } }}
                            />
                          ) : ("-")}
                        </TableCell>
                        {!isMobile && (
                          <TableCell align="center">
                            {userRole?.role === "user" && quantities[p.id]
                              ? (Number(quantities[p.id]) * p.rate).toFixed(2)
                              : "-"}
                          </TableCell>
                        )}
                        {userRole?.role === "admin" && (
                          <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Button variant="contained" color="warning" size="small" onClick={() => handleEdit(p)}>Edit</Button>
                              <Button variant="contained" color="error" size="small" onClick={() => handleDelete(p)} disabled={p.id <= 136}>Delete</Button>
                            </Stack>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

        {/* Edit Modal */}
        <Dialog
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{ sx: { minHeight: 400, p: 2 } }}
        >
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent
            sx={{ minHeight: 300, maxHeight: 500, overflowY: "auto", display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Product Name"
              value={selectedProduct?.name || ""}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Rate"
              type="number"
              value={selectedProduct?.rate || ""}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, rate: Number(e.target.value) })}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditModal(false)} color="secondary">Cancel</Button>
            <Button onClick={submitEdit} color="primary">Update</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Modal */}
        <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} maxWidth="xs" fullWidth>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogContent>
            Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteModal(false)} color="secondary">Cancel</Button>
            <Button onClick={confirmDelete} color="error">Delete</Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackOpen}
          autoHideDuration={3000}
          onClose={() => setSnackOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackOpen(false)}
            severity={snackSeverity}
            sx={{ width: "100%" }}
          >
            {snackMsg}
          </Alert>
        </Snackbar>

      </div>
    );
  };

  export default PriceList;
