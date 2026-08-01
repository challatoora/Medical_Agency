// import React, { useEffect, useState } from "react";
// import { medicineAPI } from "../services/api";

// function Medicines() {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await medicineAPI.getAll();

//       setMedicines(response);
//     } catch (error) {
//       console.error("Failed to fetch medicines:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Medicines</h1>

//       {loading && <p>Loading medicines...</p>}

//       {error && (
//         <div>
//           <p style={{ color: "red" }}>
//             Failed to load medicines: {error}
//           </p>

//           <button onClick={fetchMedicines}>
//             Retry
//           </button>
//         </div>
//       )}

//       {!loading && !error && (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Price</th>
//             </tr>
//           </thead>

//           <tbody>
//             {medicines.length === 0 ? (
//               <tr>
//                 <td colSpan="4">
//                   No medicines found
//                 </td>
//               </tr>
//             ) : (
//               medicines.map((medicine) => (
//                 <tr key={medicine.id}>
//                   <td>{medicine.id}</td>
//                   <td>{medicine.name}</td>
//                   <td>{medicine.category}</td>
//                   <td>{medicine.price}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Medicines;
///////////////////////////////////////////////////////////////////////

// import React, { useEffect, useMemo, useState } from "react";
// import { medicineAPI } from "../services/api";
// import "./Medicines.css";

// function Medicines() {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [showModal, setShowModal] = useState(false);
//   const [adding, setAdding] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     manufacturer: "",
//     price: "",
//     quantity: "",
//     expiry_date: "",
//     description: "",
//   });

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const fetchMedicines = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await medicineAPI.getAll();

//       setMedicines(Array.isArray(response) ? response : []);
//     } catch (error) {
//       console.error("Failed to fetch medicines:", error);
//       setError(error.message || "Failed to load medicines");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const categories = useMemo(() => {
//     const uniqueCategories = medicines
//       .map((medicine) => medicine.category)
//       .filter(Boolean);

//     return ["All", ...new Set(uniqueCategories)];
//   }, [medicines]);

//   const filteredMedicines = useMemo(() => {
//     return medicines.filter((medicine) => {
//       const matchesSearch =
//         medicine.name
//           ?.toLowerCase()
//           .includes(search.toLowerCase()) ||
//         medicine.manufacturer
//           ?.toLowerCase()
//           .includes(search.toLowerCase());

//       const matchesCategory =
//         category === "All" ||
//         medicine.category === category;

//       return matchesSearch && matchesCategory;
//     });
//   }, [medicines, search, category]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleAddMedicine = async (event) => {
//     event.preventDefault();

//     try {
//       setAdding(true);

//       await medicineAPI.create({
//         ...formData,
//         price: Number(formData.price),
//         quantity: Number(formData.quantity),
//       });

//       setFormData({
//         name: "",
//         category: "",
//         manufacturer: "",
//         price: "",
//         quantity: "",
//         expiry_date: "",
//         description: "",
//       });

//       setShowModal(false);

//       await fetchMedicines();
//     } catch (error) {
//       console.error("Failed to add medicine:", error);

//       alert(
//         error.message || "Failed to add medicine"
//       );
//     } finally {
//       setAdding(false);
//     }
//   };

//   return (
//     <div className="medicines-page">

//       {/* Page Header */}
//       <div className="medicine-page-header">
//         <div>
//           <h1>Medicines</h1>
//           <p>
//             Manage your medicine catalog and inventory
//           </p>
//         </div>

//         <button
//           className="add-medicine-btn"
//           onClick={() => setShowModal(true)}
//         >
//           <span>+</span>
//           Add Medicine
//         </button>
//       </div>

//       {/* Summary Cards */}
//       <div className="medicine-summary">

//         <div className="summary-card">
//           <div className="summary-icon blue">
//             💊
//           </div>

//           <div>
//             <span>Total Medicines</span>
//             <strong>{medicines.length}</strong>
//           </div>
//         </div>

//         <div className="summary-card">
//           <div className="summary-icon green">
//             📦
//           </div>

//           <div>
//             <span>Total Stock</span>
//             <strong>
//               {medicines.reduce(
//                 (total, medicine) =>
//                   total + Number(medicine.quantity || 0),
//                 0
//               )}
//             </strong>
//           </div>
//         </div>

//         <div className="summary-card">
//           <div className="summary-icon orange">
//             🏷️
//           </div>

//           <div>
//             <span>Categories</span>
//             <strong>
//               {categories.length - 1}
//             </strong>
//           </div>
//         </div>

//         <div className="summary-card">
//           <div className="summary-icon purple">
//             💰
//           </div>

//           <div>
//             <span>Products Listed</span>
//             <strong>
//               {filteredMedicines.length}
//             </strong>
//           </div>
//         </div>

//       </div>

//       {/* Search and Filters */}
//       <div className="medicine-toolbar">

//         <div className="medicine-search">
//           <span>⌕</span>

//           <input
//             type="text"
//             placeholder="Search medicine or manufacturer..."
//             value={search}
//             onChange={(event) =>
//               setSearch(event.target.value)
//             }
//           />
//         </div>

//         <select
//           value={category}
//           onChange={(event) =>
//             setCategory(event.target.value)
//           }
//         >
//           {categories.map((item) => (
//             <option
//               key={item}
//               value={item}
//             >
//               {item === "All"
//                 ? "All Categories"
//                 : item}
//             </option>
//           ))}
//         </select>

//         <button
//           className="refresh-btn"
//           onClick={fetchMedicines}
//           disabled={loading}
//         >
//           ↻ Refresh
//         </button>

//       </div>

//       {/* Error */}
//       {error && (
//         <div className="medicine-error">
//           <span>{error}</span>

//           <button onClick={fetchMedicines}>
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Loading */}
//       {loading && (
//         <div className="medicine-loading">
//           <div className="spinner"></div>
//           <p>Loading medicines...</p>
//         </div>
//       )}

//       {/* Medicine Table */}
//       {!loading && !error && (
//         <div className="medicine-table-container">

//           <div className="table-header">
//             <div>
//               <h2>Medicine Inventory</h2>
//               <p>
//                 {filteredMedicines.length} medicines found
//               </p>
//             </div>
//           </div>

//           <div className="table-wrapper">

//             <table className="medicine-table">

//               <thead>
//                 <tr>
//                   <th>Medicine</th>
//                   <th>Category</th>
//                   <th>Manufacturer</th>
//                   <th>Price</th>
//                   <th>Stock</th>
//                   <th>Expiry Date</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {filteredMedicines.length === 0 ? (

//                   <tr>
//                     <td
//                       colSpan="6"
//                       className="empty-state"
//                     >
//                       <div>
//                         <span>💊</span>
//                         <h3>
//                           No medicines found
//                         </h3>
//                         <p>
//                           Try changing your search
//                           or add a new medicine.
//                         </p>
//                       </div>
//                     </td>
//                   </tr>

//                 ) : (

//                   filteredMedicines.map(
//                     (medicine) => {

//                       const quantity =
//                         Number(
//                           medicine.quantity || 0
//                         );

//                       return (
//                         <tr
//                           key={
//                             medicine._id ||
//                             medicine.id
//                           }
//                         >

//                           <td>
//                             <div className="medicine-name">

//                               <div className="medicine-avatar">
//                                 💊
//                               </div>

//                               <div>
//                                 <strong>
//                                   {medicine.name}
//                                 </strong>

//                                 <small>
//                                   ID:{" "}
//                                   {medicine._id
//                                     ? medicine._id
//                                         .slice(-6)
//                                     : medicine.id}
//                                 </small>
//                               </div>

//                             </div>
//                           </td>

//                           <td>
//                             <span className="category-badge">
//                               {medicine.category}
//                             </span>
//                           </td>

//                           <td>
//                             {medicine.manufacturer ||
//                               "—"}
//                           </td>

//                           <td>
//                             <strong>
//                               ₹
//                               {Number(
//                                 medicine.price || 0
//                               ).toFixed(2)}
//                             </strong>
//                           </td>

//                           <td>

//                             <span
//                               className={
//                                 quantity <= 10
//                                   ? "stock-badge low"
//                                   : "stock-badge"
//                               }
//                             >
//                               {quantity <= 10
//                                 ? "Low: "
//                                 : ""}
//                               {quantity}
//                             </span>

//                           </td>

//                           <td>
//                             {medicine.expiry_date
//                               ? new Date(
//                                   medicine.expiry_date
//                                 ).toLocaleDateString(
//                                   "en-IN"
//                                 )
//                               : "—"}
//                           </td>

//                         </tr>
//                       );
//                     }
//                   )

//                 )}

//               </tbody>

//             </table>

//           </div>

//         </div>
//       )}

//       {/* Add Medicine Modal */}
//       {showModal && (

//         <div
//           className="modal-overlay"
//           onClick={() =>
//             setShowModal(false)
//           }
//         >

//           <div
//             className="medicine-modal"
//             onClick={(event) =>
//               event.stopPropagation()
//             }
//           >

//             <div className="modal-header">

//               <div>
//                 <h2>Add New Medicine</h2>
//                 <p>
//                   Enter medicine details below
//                 </p>
//               </div>

//               <button
//                 className="close-modal"
//                 onClick={() =>
//                   setShowModal(false)
//                 }
//               >
//                 ×
//               </button>

//             </div>

//             <form
//               onSubmit={handleAddMedicine}
//             >

//               <div className="form-grid">

//                 <div className="form-group">
//                   <label>
//                     Medicine Name *
//                   </label>

//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="e.g. Paracetamol 500mg"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Category *
//                   </label>

//                   <input
//                     type="text"
//                     name="category"
//                     placeholder="e.g. Pain Relief"
//                     value={formData.category}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Manufacturer
//                   </label>

//                   <input
//                     type="text"
//                     name="manufacturer"
//                     placeholder="e.g. Cipla"
//                     value={
//                       formData.manufacturer
//                     }
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Price *
//                   </label>

//                   <input
//                     type="number"
//                     name="price"
//                     placeholder="0.00"
//                     min="0"
//                     value={formData.price}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Quantity
//                   </label>

//                   <input
//                     type="number"
//                     name="quantity"
//                     placeholder="0"
//                     min="0"
//                     value={formData.quantity}
//                     onChange={handleInputChange}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>
//                     Expiry Date
//                   </label>

//                   <input
//                     type="date"
//                     name="expiry_date"
//                     value={
//                       formData.expiry_date
//                     }
//                     onChange={handleInputChange}
//                   />
//                 </div>

//               </div>

//               <div className="form-group">
//                 <label>
//                   Description
//                 </label>

//                 <textarea
//                   name="description"
//                   placeholder="Enter medicine description..."
//                   rows="4"
//                   value={
//                     formData.description
//                   }
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div className="modal-actions">

//                 <button
//                   type="button"
//                   className="cancel-btn"
//                   onClick={() =>
//                     setShowModal(false)
//                   }
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="save-medicine-btn"
//                   disabled={adding}
//                 >
//                   {adding
//                     ? "Adding..."
//                     : "Add Medicine"}
//                 </button>

//               </div>

//             </form>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// }

// export default Medicines;
//////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from "react";
// import { medicineAPI } from "../services/api";
// import "./Medicines.css";

// function Medicines() {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchMedicines = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await medicineAPI.getAll();

//       setMedicines(response);
//     } catch (err) {
//       console.error("Failed to fetch medicines:", err);
//       setError(err.message || "Failed to load medicines");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   return (
//     <div className="medicines-page">
//       <div className="medicines-page-header">
//         <div>
//           <h1>Medicines</h1>
//           <p>Manage your medical inventory and medicines</p>
//         </div>

//         <button
//           className="add-medicine-btn"
//           onClick={() => alert("Add Medicine feature coming next")}
//         >
//           + Add Medicine
//         </button>
//       </div>

//       <div className="medicines-card">
//         <div className="medicines-card-header">
//           <div>
//             <h2>Medicine Inventory</h2>
//             <p>All medicines available in your system</p>
//           </div>

//           <button
//             className="refresh-btn"
//             onClick={fetchMedicines}
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Refresh"}
//           </button>
//         </div>

//         {error && (
//           <div className="medicine-error">
//             <p>Failed to load medicines: {error}</p>

//             <button onClick={fetchMedicines}>
//               Retry
//             </button>
//           </div>
//         )}

//         {loading && !error && (
//           <div className="medicine-loading">
//             Loading medicines...
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="medicine-table-container">
//             <table className="medicine-table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Category</th>
//                   <th>Manufacturer</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Expiry Date</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {medicines.length === 0 ? (
//                   <tr>
//                     <td colSpan="7" className="no-medicines">
//                       No medicines found
//                     </td>
//                   </tr>
//                 ) : (
//                   medicines.map((medicine) => (
//                     <tr key={medicine._id}>
//                       <td>
//                         {medicine._id
//                           ? medicine._id.substring(0, 8)
//                           : "-"}
//                       </td>

//                       <td>{medicine.name || "-"}</td>

//                       <td>{medicine.category || "-"}</td>

//                       <td>{medicine.manufacturer || "-"}</td>

//                       <td>
//                         ₹{medicine.price || 0}
//                       </td>

//                       <td>{medicine.quantity || 0}</td>

//                       <td>
//                         {medicine.expiry_date
//                           ? new Date(
//                               medicine.expiry_date
//                             ).toLocaleDateString()
//                           : "-"}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Medicines;
/////////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { medicineAPI } from "../services/api";
// import "./Medicines.css";

// function Medicines() {
//   const [medicines, setMedicines] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [showForm, setShowForm] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     category: "",
//     manufacturer: "",
//     price: "",
//     quantity: "",
//     expiry_date: "",
//     description: "",
//   });

//   const fetchMedicines = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await medicineAPI.getAll();

//       setMedicines(response);
//     } catch (err) {
//       console.error("Failed to fetch medicines:", err);
//       setError(err.message || "Failed to load medicines");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMedicines();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleAddMedicine = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);
//       setError("");

//       const medicineData = {
//         name: formData.name,
//         category: formData.category,
//         manufacturer: formData.manufacturer,
//         price: Number(formData.price),
//         quantity: Number(formData.quantity),
//         expiry_date: formData.expiry_date || undefined,
//         description: formData.description,
//       };

//       await medicineAPI.create(medicineData);

//       alert("Medicine added successfully!");

//       setFormData({
//         name: "",
//         category: "",
//         manufacturer: "",
//         price: "",
//         quantity: "",
//         expiry_date: "",
//         description: "",
//       });

//       setShowForm(false);

//       await fetchMedicines();
//     } catch (err) {
//       console.error("Failed to add medicine:", err);
//       setError(err.message || "Failed to add medicine");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="medicines-page">

//       {/* PAGE HEADER */}
//       <div className="medicines-page-header">
//         <div>
//           <h1>Medicines</h1>
//           <p>Manage your medical inventory and medicines</p>
//         </div>

//         <button
//           className="add-medicine-btn"
//           onClick={() => setShowForm(true)}
//         >
//           + Add Medicine
//         </button>
//       </div>

//       {/* ADD MEDICINE FORM */}
//       {showForm && (
//         <div className="medicine-form-card">
//           <div className="medicine-form-header">
//             <div>
//               <h2>Add New Medicine</h2>
//               <p>Enter the medicine details below</p>
//             </div>

//             <button
//               type="button"
//               className="close-form-btn"
//               onClick={() => setShowForm(false)}
//             >
//               ×
//             </button>
//           </div>

//           <form onSubmit={handleAddMedicine}>

//             <div className="medicine-form-grid">

//               <div className="form-group">
//                 <label>Medicine Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Enter medicine name"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Category *</label>
//                 <input
//                   type="text"
//                   name="category"
//                   value={formData.category}
//                   onChange={handleChange}
//                   placeholder="e.g. Antibiotic"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Manufacturer</label>
//                 <input
//                   type="text"
//                   name="manufacturer"
//                   value={formData.manufacturer}
//                   onChange={handleChange}
//                   placeholder="Enter manufacturer"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Price *</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={formData.price}
//                   onChange={handleChange}
//                   placeholder="Enter price"
//                   min="0"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Quantity</label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={formData.quantity}
//                   onChange={handleChange}
//                   placeholder="Enter quantity"
//                   min="0"
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Expiry Date</label>
//                 <input
//                   type="date"
//                   name="expiry_date"
//                   value={formData.expiry_date}
//                   onChange={handleChange}
//                 />
//               </div>

//             </div>

//             <div className="form-group full-width">
//               <label>Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 placeholder="Enter medicine description"
//                 rows="4"
//               />
//             </div>

//             {error && (
//               <div className="medicine-error">
//                 {error}
//               </div>
//             )}

//             <div className="medicine-form-actions">

//               <button
//                 type="button"
//                 className="cancel-medicine-btn"
//                 onClick={() => setShowForm(false)}
//                 disabled={saving}
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 className="save-medicine-btn"
//                 disabled={saving}
//               >
//                 {saving ? "Saving..." : "Add Medicine"}
//               </button>

//             </div>

//           </form>
//         </div>
//       )}

//       {/* MEDICINE INVENTORY */}
//       <div className="medicines-card">

//         <div className="medicines-card-header">

//           <div>
//             <h2>Medicine Inventory</h2>
//             <p>All medicines available in your system</p>
//           </div>

//           <button
//             className="refresh-btn"
//             onClick={fetchMedicines}
//             disabled={loading}
//           >
//             {loading ? "Loading..." : "Refresh"}
//           </button>

//         </div>

//         {error && !showForm && (
//           <div className="medicine-error">
//             <p>Failed to load medicines: {error}</p>

//             <button onClick={fetchMedicines}>
//               Retry
//             </button>
//           </div>
//         )}

//         {loading && !error && (
//           <div className="medicine-loading">
//             Loading medicines...
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="medicine-table-container">

//             <table className="medicine-table">

//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Category</th>
//                   <th>Manufacturer</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Expiry Date</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {medicines.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="7"
//                       className="no-medicines"
//                     >
//                       No medicines found
//                     </td>
//                   </tr>
//                 ) : (
//                   medicines.map((medicine) => (
//                     <tr key={medicine._id}>

//                       <td>
//                         {medicine._id
//                           ? medicine._id.substring(0, 8)
//                           : "-"}
//                       </td>

//                       <td>
//                         {medicine.name || "-"}
//                       </td>

//                       <td>
//                         {medicine.category || "-"}
//                       </td>

//                       <td>
//                         {medicine.manufacturer || "-"}
//                       </td>

//                       <td>
//                         ₹{medicine.price || 0}
//                       </td>

//                       <td>
//                         {medicine.quantity || 0}
//                       </td>

//                       <td>
//                         {medicine.expiry_date
//                           ? new Date(
//                               medicine.expiry_date
//                             ).toLocaleDateString()
//                           : "-"}
//                       </td>

//                     </tr>
//                   ))
//                 )}

//               </tbody>

//             </table>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

// export default Medicines;

//////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { medicineAPI } from "../services/api";
import "./Medicines.css";

function Medicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  // Used to know if we are adding or editing
  const [editingMedicine, setEditingMedicine] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    manufacturer: "",
    price: "",
    quantity: "",
    expiry_date: "",
    description: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  //const isAdmin = user?.role === "admin";
  const isAdmin = user?.role?.toLowerCase().trim() === "admin";

  console.log("USER:", user);
  console.log("ROLE:", user?.role);
  console.log("IS ADMIN:", isAdmin);

  // ===============================
  // FETCH MEDICINES
  // ===============================

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await medicineAPI.getAll();

      setMedicines(response);
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
      setError(err.message || "Failed to load medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // ===============================
  // FORM CHANGE
  // ===============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ===============================
  // RESET FORM
  // ===============================

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      manufacturer: "",
      price: "",
      quantity: "",
      expiry_date: "",
      description: "",
    });

    setEditingMedicine(null);
    setShowForm(false);
  };

  // ===============================
  // ADD / UPDATE MEDICINE
  // ===============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const medicineData = {
        name: formData.name,
        category: formData.category,
        manufacturer: formData.manufacturer,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        expiry_date: formData.expiry_date || undefined,
        description: formData.description,
      };

      // EDIT
      if (editingMedicine) {
        await medicineAPI.update(
          editingMedicine._id,
          medicineData
        );

        alert("Medicine updated successfully!");
      }

      // ADD
      else {
        await medicineAPI.create(medicineData);

        alert("Medicine added successfully!");
      }

      resetForm();

      await fetchMedicines();

    } catch (err) {
      console.error("Failed to save medicine:", err);

      setError(
        err.message || "Failed to save medicine"
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // EDIT MEDICINE
  // ===============================

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine);

    setFormData({
      name: medicine.name || "",
      category: medicine.category || "",
      manufacturer: medicine.manufacturer || "",
      price: medicine.price || "",
      quantity: medicine.quantity || "",
      expiry_date: medicine.expiry_date
        ? medicine.expiry_date.substring(0, 10)
        : "",
      description: medicine.description || "",
    });

    setShowForm(true);
  };

  // ===============================
  // DELETE MEDICINE
  // ===============================

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await medicineAPI.delete(id);

      alert("Medicine deleted successfully!");

      await fetchMedicines();

    } catch (err) {
      console.error("Failed to delete medicine:", err);

      setError(
        err.message || "Failed to delete medicine"
      );
    }
  };

  return (
    <div className="medicines-page">

      {/* ===============================
          PAGE HEADER
      =============================== */}

      <div className="medicines-page-header">

        <div>
          <h1>Medicines</h1>

          <p>
            Manage your medical inventory and medicines
          </p>
        </div>

        {isAdmin && (
        <button
            className="add-medicine-btn"
            onClick={() => {
            setEditingMedicine(null);

            setFormData({
              name: "",
              category: "",
              manufacturer: "",
              price: "",
              quantity: "",
              expiry_date: "",
              description: "",
            });

            setShowForm(true);
          }}
        >
         + Add Medicine
</button>
)}
      </div>

      {/* ===============================
          ADD / EDIT FORM
      =============================== */}

      {isAdmin && showForm && (

        <div className="medicine-form-card">

          <div className="medicine-form-header">

            <div>

              <h2>
                {editingMedicine
                  ? "Edit Medicine"
                  : "Add New Medicine"}
              </h2>

              <p>
                {editingMedicine
                  ? "Update the medicine details below"
                  : "Enter the medicine details below"}
              </p>

            </div>

            <button
              type="button"
              className="close-form-btn"
              onClick={resetForm}
            >
              ×
            </button>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="medicine-form-grid">

              {/* NAME */}

              <div className="form-group">

                <label>
                  Medicine Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter medicine name"
                  required
                />

              </div>

              {/* CATEGORY */}

              <div className="form-group">

                <label>
                  Category *
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Antibiotic"
                  required
                />

              </div>

              {/* MANUFACTURER */}

              <div className="form-group">

                <label>
                  Manufacturer
                </label>

                <input
                  type="text"
                  name="manufacturer"
                  value={formData.manufacturer}
                  onChange={handleChange}
                  placeholder="Enter manufacturer"
                />

              </div>

              {/* PRICE */}

              <div className="form-group">

                <label>
                  Price *
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  required
                />

              </div>

              {/* QUANTITY */}

              <div className="form-group">

                <label>
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  min="0"
                />

              </div>

              {/* EXPIRY DATE */}

              <div className="form-group">

                <label>
                  Expiry Date
                </label>

                <input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                />

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="form-group full-width">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter medicine description"
                rows="4"
              />

            </div>

            {error && (

              <div className="medicine-error">
                {error}
              </div>

            )}

            {/* FORM BUTTONS */}

            <div className="medicine-form-actions">

              <button
                type="button"
                className="cancel-medicine-btn"
                onClick={resetForm}
                disabled={saving}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-medicine-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : editingMedicine
                  ? "Update Medicine"
                  : "Add Medicine"}
              </button>

            </div>

          </form>

        </div>

      )}

      {/* ===============================
          MEDICINE INVENTORY
      =============================== */}

      <div className="medicines-card">

        <div className="medicines-card-header">

          <div>

            <h2>
              Medicine Inventory
            </h2>

            <p>
              All medicines available in your system
            </p>

          </div>

          <button
            className="refresh-btn"
            onClick={fetchMedicines}
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : "Refresh"}
          </button>

        </div>

        {/* ERROR */}

        {error && !showForm && (

          <div className="medicine-error">

            <p>
              Failed to load medicines: {error}
            </p>

            <button
              onClick={fetchMedicines}
            >
              Retry
            </button>

          </div>

        )}

        {/* LOADING */}

        {loading && !error && (

          <div className="medicine-loading">
            Loading medicines...
          </div>

        )}

        {/* TABLE */}

        {!loading && !error && (

          <div className="medicine-table-container">

            <table className="medicine-table">

              <thead>

                <tr>

                  <th>ID</th>

                  <th>Name</th>

                  <th>Category</th>

                  <th>Manufacturer</th>

                  <th>Price</th>

                  <th>Quantity</th>

                  <th>Expiry Date</th>

                  {isAdmin && <th>Actions</th>}
                </tr>

              </thead>

              <tbody>

                {medicines.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="no-medicines"
                    >
                      No medicines found
                    </td>

                  </tr>

                ) : (

                  medicines.map((medicine) => (

                    <tr key={medicine._id}>

                      <td>

                        {medicine._id
                          ? medicine._id.substring(0, 8)
                          : "-"}

                      </td>

                      <td>

                        {medicine.name || "-"}

                      </td>

                      <td>

                        {medicine.category || "-"}

                      </td>

                      <td>

                        {medicine.manufacturer || "-"}

                      </td>

                      <td>

                        ₹{medicine.price || 0}

                      </td>

                      <td>

                        {medicine.quantity || 0}

                      </td>

                      <td>

                        {medicine.expiry_date

                          ? new Date(
                              medicine.expiry_date
                            ).toLocaleDateString()

                          : "-"}

                      </td>

                     {/* ACTIONS */}

{isAdmin && (
  <td>

    <div className="medicine-actions">

      <button
        className="edit-medicine-btn"
        onClick={() =>
          handleEdit(medicine)
        }
      >
        Edit
      </button>

      <button
        className="delete-medicine-btn"
        onClick={() =>
          handleDelete(
            medicine._id,
            medicine.name
          )
        }
      >
        Delete
      </button>

    </div>

  </td>
)}

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default Medicines;