"use client";

import { useState } from "react";
import AdminAddProduct from "../../Components/AdminAddproduct";
import PriceList from "@/components/PriceList";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from "@mui/material";
import { useUser } from "../context/userContext";

export default function Page() {
  const [openAddModal, setOpenAddModal] = useState(false);
const userRole = useUser();
  // Define userRole here


  const handleOpen = () => setOpenAddModal(true);
  const handleClose = () => setOpenAddModal(false);

  return (
    <div className="p-4">
      {/* Only show Add Product button for admin */}
      {userRole?.role === "admin" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
            position:"sticky",
            top:0
          }}
        >
          <Typography variant="h6">Price List Table</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            Add Product
          </Button>
        </Box>
      )}

      {/* Admin Add Product Modal */}
      <Dialog open={openAddModal} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <AdminAddProduct
            onAdded={() => {
              window.location.reload();
              handleClose();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Price List */}
      <Box sx={{backgroundColor:'#FFF',padding:'10px'}}>
<PriceList userRole={userRole} />
      </Box>
      
    </div>
  );
}
