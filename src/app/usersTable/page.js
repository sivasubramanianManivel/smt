"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editUser, setEditUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "user", password: "" });
  const [creating, setCreating] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // "success", "error", "info", "warning" or a hex string
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      } else {
        console.error("Error fetching users");
      }
    } catch (err) {
      console.error("Error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Helper to generate avatar color
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).slice(-2);
    }
    return color;
  };

  // Role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch("/api/users/updateRole", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUsers(users.map(u => (u._id === updatedUser.user._id ? updatedUser.user : u)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Show Snackbar
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Edit user
  const handleEdit = (user) => setEditUser(user);

  const handleSaveEdit = async () => {
    try {
      const res = await fetch("/api/users/updateRole", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: editUser._id, name: editUser.name, role: editUser.role }),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUsers(users.map(u => (u._id === updatedUser.user._id ? updatedUser.user : u)));
        setEditUser(null);
        showSnackbar("User updated successfully", "success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete user
  const handleDelete = async () => {
    try {
      const res = await fetch("/api/users/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: deleteUserId }),
      });
      if (res.ok) {
        setUsers(users.filter(u => u._id !== deleteUserId));
        setDeleteConfirmOpen(false);
        setDeleteUserId(null);
        showSnackbar("User deleted successfully", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create new user
  const handleCreateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert("Please fill all fields");
      return;
    }
    if (newUser.password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }

    setCreating(true);
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create user");
        setCreating(false);
        return;
      }

      setUsers([...users, data.user]);
      setCreateUserOpen(false);
      setNewUser({ name: "", email: "", role: "user", password: "" });
      showSnackbar("User created successfully", "success");
    } catch (err) {
      console.error(err);
      alert("Something went wrong while creating user");
    }
    setCreating(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f9f9f9",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px 5px 10px 5px",
          position:'sticky',
          top:0
        }}
      >
        <Typography variant="h6" component="div">
          Users Details
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCreateUserOpen(true)}
        >
          Create New User
        </Button>
      </Box>

      {/* Users Table */}
      <TableContainer component={Paper} sx={{ height: "calc(100vh - 128px)", overflowY: "auto" }}>
        <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Change Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <Avatar sx={{ bgcolor: stringToColor(user.name) }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <Select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}>
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => { setDeleteUserId(user._id); setDeleteConfirmOpen(true); }}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create User Dialog */}
      <Dialog open={createUserOpen} onClose={() => setCreateUserOpen(false)}>
        <DialogTitle>Create New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="dense"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="dense"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          <Select
            fullWidth
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            sx={{ mt: 2 }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setCreateUserOpen(false); setNewUser({ name: "", email: "", role: "user", password: "" }); }}>
            Cancel
          </Button>
          <Button onClick={handleCreateUser} variant="contained" disabled={creating}>
            {creating ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editUser} onClose={() => setEditUser(null)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="dense"
            value={editUser?.name || ""}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          />
          <Select
            fullWidth
            value={editUser?.role || "user"}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
            sx={{ mt: 2 }}
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={["success", "error", "warning", "info"].includes(snackbar.severity) ? snackbar.severity : "success"}
          sx={{
            width: "100%",
            bgcolor:
              snackbar.severity === "success" ? "#58BE46" :
              snackbar.severity === "error" ? "#F43A15" :
              snackbar.severity === "warning" ? "#FFA500" :
              snackbar.severity === "info" ? "#2196F3" :
              undefined
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
