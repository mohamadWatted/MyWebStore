import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { useSelector } from "react-redux";

const BackOfficeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const departmentTree = useSelector((state) => state.departments.data);

  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    addedOn: "",
    galleryImage: "",
    galleryImageTitle: "",
    galleryImageAlt: "",
    galleryImageName: "",
    departmentID: 0,
    categoryID: 0,
    subCategoryID: 0,
  });

  const handleCategoryChange = (e) => {
    const newCategoryId = Number.parseInt(e.target.value);
    setProduct({ ...product, categoryID: newCategoryId, subCategoryID: 0 });
  };

  const handleSubCategoryChange = (e) => {
    const newSubCategoryId = Number.parseInt(e.target.value);
    setProduct({ ...product, subCategoryID: newSubCategoryId });
  };

  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      api
        .get(`product/${id}`)
        .then((response) => {
          const {
            productName,
            price,
            description,
            addedOn,
            galleryImage,
            departmentID,
            categoryID,
            subCategoryID,
          } = response.data;
          setProduct({
            productName,
            price: price.toString(),
            description,
            addedOn: new Date(addedOn).toISOString().split("T")[0],
            galleryImage: galleryImage[0] ? galleryImage[0].imageURL : "",
            galleryImageTitle: galleryImage[0] ? galleryImage[0].title : "",
            galleryImageAlt: galleryImage[0] ? galleryImage[0].alt : "",
            galleryImageName: galleryImage[0] ? galleryImage[0].name : "",
            departmentID: departmentID,
            categoryID: categoryID,
            subCategoryID: subCategoryID,
          });
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setFeedback({
            type: "danger",
            message: "Failed to load product data",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleDepartmentChange = (e) => {
    const newDepartmentId = Number.parseInt(e.target.value);
    setProduct({
      ...product,
      departmentID: newDepartmentId,
      categoryID: 0,
      subCategoryID: 0,
    });
  };

  const validateForm = () => {
    const errors = {
      productNameError: "",
      priceError: "",
      descriptionError: "",
      addedOnError: "",
      galleryImageError: "",
    };

    if (!product.productName.trim()) {
      errors.productNameError = "Name is required";
    }

    if (!product.price.trim()) {
      errors.priceError = "Price is required";
    }

    if (!product.description.trim()) {
      errors.descriptionError = "Description is required";
    }

    if (!product.addedOn.trim()) {
      errors.addedOnError = "Add-On is required";
    }

    if (!product.galleryImage.trim()) {
      errors.galleryImageError = "Gallery Image is required";
    }
    if (
      !departmentTree.some(
        (department) => department.id === product.departmentID
      )
    ) {
      return "Invalid DepartmentID. Department does not exist.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (
      errors.productNameError ||
      errors.priceError ||
      errors.descriptionError ||
      errors.addedOnError ||
      errors.galleryImageError
    ) {
      setFeedback({
        type: "danger",
        message: "Please fill in all required fields",
      });
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("mywebsite_token");

    const productData = {
      Name: product.productName,
      price: parseFloat(product.price),
      description: product.description,
      addedOn: product.addedOn,
      galleryImage: [
        {
          imageURL: product.galleryImage,
          title: product.galleryImageTitle,
          alt: product.galleryImageAlt,
          name: product.galleryImageName,
        },
      ],
      departmentID: product.departmentID,
      categoryID: product.categoryID,
      subCategoryID: product.subCategoryID,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = isEditMode
        ? await api.put(`product?id=${id}`, productData, config)
        : await api.post("product", productData, config);

      setFeedback({
        type: "success",
        message: `Product ${isEditMode ? "updated" : "added"} successfully!`,
      });
      navigate("/backoffice/products/"); // Redirect to product list
    } catch (error) {
      console.error(error);
      setFeedback({ type: "danger", message: "An error occurred!" });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setProduct({
      productName: "",
      price: "",
      description: "",
      addedOn: "",
      galleryImage: "",
      galleryImageTitle: "",
      galleryImageAlt: "",
      galleryImageName: "",
      departmentID: 0,
      categoryID: 0,
      subCategoryID: 0,
    });

    setFeedback(null);
  };

  return (
    <div inline="true">
      <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>
      <Form onSubmit={handleSubmit}>
        {/* Form Group for Product Name */}
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={product.productName}
            onChange={(e) =>
              setProduct({ ...product, productName: e.target.value })
            }
            isInvalid={
              feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Name")
            }
          />
          <Form.Control.Feedback type="invalid">
            {feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Name") &&
              feedback.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Form Group for Price */}
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            isInvalid={
              feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Price")
            }
          />
          <Form.Control.Feedback type="invalid">
            {feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Price") &&
              feedback.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Form Group for Description */}
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            isInvalid={
              feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Description")
            }
          />
          <Form.Control.Feedback type="invalid">
            {feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Description") &&
              feedback.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Form Group for Added On */}
        <Form.Group controlId="addOn">
          <Form.Label>Add-On</Form.Label>
          <Form.Control
            type="date"
            value={product.addedOn}
            onChange={(e) =>
              setProduct({ ...product, addedOn: e.target.value })
            }
            isInvalid={
              feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Add-On")
            }
          />
          <Form.Control.Feedback type="invalid">
            {feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Add-On") &&
              feedback.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Form Groups for Gallery Image */}
        <Form.Group controlId="galleryImage">
          <Form.Label>Gallery Image URL</Form.Label>
          <Form.Control
            type="text"
            value={product.galleryImage}
            onChange={(e) =>
              setProduct({ ...product, galleryImage: e.target.value })
            }
            isInvalid={
              feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Gallery Image")
            }
          />
          <Form.Control.Feedback type="invalid">
            {feedback &&
              feedback.type === "danger" &&
              feedback.message.includes("Gallery Image") &&
              feedback.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Form Group for Gallery Image Title */}
        <Form.Group controlId="galleryImageTitle">
          <Form.Label>Gallery Image Title</Form.Label>
          <Form.Control
            type="text"
            value={product.galleryImageTitle}
            onChange={(e) =>
              setProduct({ ...product, galleryImageTitle: e.target.value })
            }
          />
        </Form.Group>

        {/* Form Group for Gallery Image Alt Text */}
        <Form.Group controlId="galleryImageAlt">
          <Form.Label>Gallery Image Alt Text</Form.Label>
          <Form.Control
            type="text"
            value={product.galleryImageAlt}
            onChange={(e) =>
              setProduct({ ...product, galleryImageAlt: e.target.value })
            }
          />
        </Form.Group>

        {/* Form Group for Gallery Image Name */}
        <Form.Group controlId="galleryImageName">
          <Form.Label>Gallery Image Name</Form.Label>
          <Form.Control
            type="text"
            value={product.galleryImageName}
            onChange={(e) =>
              setProduct({ ...product, galleryImageName: e.target.value })
            }
          />
        </Form.Group>

        <div
          style={{
            display: "flex",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
          }}
        >
          {/* Selector for Departments */}
          <Form.Select
            aria-label="Default select example"
            value={product.departmentID}
            onChange={handleDepartmentChange}
          >
            <option value="">Select Department</option>
            {departmentTree.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </Form.Select>

          {/* Selector for Categories */}
          <Form.Select
            value={product.categoryID}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            {departmentTree
              .find((department) => department.id === product.departmentID)
              ?.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Form.Select>

          {/* Selector for Subcategories */}
          <Form.Select
            value={product.subCategoryID}
            onChange={handleSubCategoryChange}
          >
            <option value="">Select Subcategory</option>
            {departmentTree
              .find((department) => department.id === product.departmentID)
              ?.categories.find(
                (category) => category.id === product.categoryID
              )
              ?.subcategories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))}
          </Form.Select>
        </div>

        {/* Buttons for Submit and Reset */}
        <div style={{ display: "flex",justifyContent:"center" }}>
          <Button variant="primary" type="submit" disabled={loading}>
            {isEditMode ? "Update" : "Save"}
          </Button>
          <Button variant="secondary" type="button" onClick={handleReset}>
            Cancel
          </Button>
        </div>
      </Form>
      {feedback && (
        <div className={`alert alert-${feedback.type}`}>{feedback.message}</div>
      )}
    </div>
  );
};

export default BackOfficeForm;
