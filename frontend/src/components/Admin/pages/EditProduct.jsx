import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductByIdAdminApi,
  getAllCategoriesWithSubCatApi,
} from "../../../utils/adminApi";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "published",
    featuredImage: "",
    variants: [],
  });

  /* ================= FETCH PRODUCT ================= */
  useEffect(() => {
    fetchProduct();
  }, [productId]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategoriesWithSubCatApi();
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await getProductByIdAdminApi(productId);
      const data = res.data;

      setProduct(data);
      setForm({
        title: data.title,
        description: data.description,
        status: data.status,
        featuredImage: data.featuredImage,
        variants: data.variants || [],
      });

      // ✅ sync category selection
      setSelectedCategory(data.category?._id);
      setSelectedSubCategory(data.subCategory?._id);
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...form.variants];
    updatedVariants[index][field] = value;
    setForm({ ...form, variants: updatedVariants });
  };

  const handleSave = () => {
    const payload = {
      ...form,
      category: selectedCategory,
      subCategory: selectedSubCategory,
    };

    console.log("Updated Product Payload:", payload);

    alert("Update API can be connected here");
    navigate("/admin/products");
  };

  /* ================= UI STATES ================= */
  if (loading) {
    return <p className="p-6">Loading product...</p>;
  }

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

  /* ================= RENDER ================= */
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ================= LEFT ================= */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow p-5">
        <h1 className="text-xl font-semibold mb-4">
          Edit Product – {form.title}
        </h1>

        <div className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Product Title"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="6"
            className="w-full border p-2 rounded"
            placeholder="Product Description"
          />

          {/* VARIANTS (ONLY IF VARIANT PRODUCT) */}
          {product.productType === "variant" && (
            <div className="mt-6">
              <h2 className="font-semibold mb-3">Variants</h2>

              <div className="space-y-4">
                {form.variants.map((variant, index) => (
                  <div
                    key={variant._id}
                    className="border rounded p-4 space-y-2"
                  >
                    <p className="text-sm font-medium">SKU: {variant.sku}</p>

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        value={variant.regularPrice}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "regularPrice",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                        placeholder="Regular Price"
                      />

                      <input
                        type="number"
                        value={variant.salePrice || ""}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "salePrice",
                            e.target.value
                          )
                        }
                        className="border p-2 rounded"
                        placeholder="Sale Price"
                      />

                      <input
                        type="number"
                        value={variant.stock}
                        onChange={(e) =>
                          handleVariantChange(index, "stock", e.target.value)
                        }
                        className="border p-2 rounded"
                        placeholder="Stock"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= RIGHT (WORDPRESS STYLE) ================= */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4">
        <h2 className="font-semibold">Product Data</h2>

        {/* FEATURED IMAGE */}
        <img
          src={form.featuredImage}
          alt="Featured"
          className="w-full h-40 object-cover rounded"
        />

        {/* CATEGORY (READ ONLY) */}
        {/* PRODUCT CATEGORIES */}
        <div>
          <h3 className="font-medium mb-2">Product Categories</h3>

          <div className="border rounded p-3 max-h-64 overflow-y-auto space-y-2">
            {categories.map((cat) => (
              <div key={cat._id}>
                {/* PARENT CATEGORY */}
                <label className="flex items-center gap-2 font-medium">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat._id}
                    onChange={() => {
                      setSelectedCategory(cat._id);
                      setSelectedSubCategory(null);
                    }}
                  />
                  {cat.name}
                </label>

                {/* SUBCATEGORIES */}
                {cat.subCategories?.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {cat.subCategories.map((sub) => (
                      <label
                        key={sub._id}
                        className="flex items-center gap-2 text-sm"
                      >
                        <input
                          type="radio"
                          name="subcategory"
                          checked={selectedSubCategory === sub._id}
                          onChange={() => {
                            setSelectedCategory(cat._id);
                            setSelectedSubCategory(sub._id);
                          }}
                        />
                        {sub.name}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        {/* ACTIONS */}
        <button
          onClick={handleSave}
          className="w-full bg-primary5 text-white py-2 rounded"
        >
          Update Product
        </button>

        <button
          onClick={() => navigate("/admin/products")}
          className="w-full border py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
