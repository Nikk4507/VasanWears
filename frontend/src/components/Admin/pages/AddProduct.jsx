import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createProductApi } from "../../../utils/productApi";
import { getAllCategoriesWithSubCatApi } from "../../../utils/adminApi";
const AddProduct = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    subCategory: "",
    status: "published",
  });

  const [featuredImage, setFeaturedImage] = useState(null);
  const [hoverImage, setHoverImage] = useState(null);
  const [gallery, setGallery] = useState([]);

  const [variants, setVariants] = useState([
    {
      sku: "",
      colors: "",
      sizes: "",
      regularPrice: "",
      salePrice: "",
      stock: "",
      featuredImage: null,
      gallery: [],
    },
  ]);

  /* ================= HANDLERS ================= */
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategoriesWithSubCatApi();
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        sku: "",
        colors: "",
        sizes: "",
        regularPrice: "",
        salePrice: "",
        stock: "",
        featuredImage: null,
        gallery: [],
      },
    ]);
  };

  const removeVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.slug) {
      toast.error("Required fields are missing");
      return;
    }

    setLoading(true);

    try {
      if (!selectedCategory || !selectedSubCategory) {
        toast.error("Please select category and subcategory");
        return;
      }

      const formData = new FormData();

      // TEXT FIELDS
      formData.append("title", form.title);
      formData.append("slug", form.slug);
      formData.append("description", form.description);
      formData.append("category", selectedCategory);
      formData.append("subCategory", selectedSubCategory);
      formData.append("status", form.status);

      // VARIANTS JSON (remove files)
      formData.append(
        "variants",
        JSON.stringify(
          variants.map(({ featuredImage, gallery, ...rest }) => ({
            ...rest,
            colors: rest.colors.split(","),
            sizes: rest.sizes.split(","),
          }))
        )
      );

      // PRODUCT IMAGES
      formData.append("featuredImage", featuredImage);
      formData.append("hoverImage", hoverImage);

      gallery.forEach((file) => {
        formData.append("gallery", file);
      });

      // VARIANT IMAGES
      variants.forEach((variant, index) => {
        if (variant.featuredImage) {
          formData.append(`variantFeatured_${index}`, variant.featuredImage);
        }

        variant.gallery.forEach((file) => {
          formData.append(`variantGallery_${index}`, file);
        });
      });

      await createProductApi(formData);

      toast.success("Product created successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* LEFT */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow p-5 space-y-4">
        <h1 className="text-xl font-semibold">Add New Product</h1>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Product Title"
        />

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          placeholder="Slug"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows="5"
          className="border p-2 rounded w-full"
          placeholder="Description"
        />

        {/* PRODUCT FEATURED IMAGE */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Featured Image
          </label>
          <p className="text-xs text-gray-500">
            Main image shown on product page & listings
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFeaturedImage(e.target.files[0])}
          />
        </div>

        {/* PRODUCT HOVER IMAGE */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Hover Image
          </label>
          <p className="text-xs text-gray-500">
            Image shown when user hovers on product card
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setHoverImage(e.target.files[0])}
          />
        </div>

        {/* PRODUCT GALLERY (IMAGES + VIDEO) */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Product Gallery (Images / Video)
          </label>
          <p className="text-xs text-gray-500">
            You can upload multiple images and one short video
          </p>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setGallery([...e.target.files])}
          />
        </div>

        {/* VARIANTS */}
        <h2 className="font-semibold">Variants</h2>

        {variants.map((variant, index) => (
          <div key={index} className="border p-4 rounded space-y-2">
            <input
              placeholder="SKU"
              value={variant.sku}
              onChange={(e) =>
                handleVariantChange(index, "sku", e.target.value)
              }
              className="border p-2 w-full"
            />

            <input
              placeholder="Colors (comma separated)"
              value={variant.colors}
              onChange={(e) =>
                handleVariantChange(index, "colors", e.target.value)
              }
              className="border p-2 w-full"
            />

            <input
              placeholder="Sizes (comma separated)"
              value={variant.sizes}
              onChange={(e) =>
                handleVariantChange(index, "sizes", e.target.value)
              }
              className="border p-2 w-full"
            />

            <input
              type="number"
              placeholder="Regular Price"
              value={variant.regularPrice}
              onChange={(e) =>
                handleVariantChange(index, "regularPrice", e.target.value)
              }
              className="border p-2 w-full"
            />

            <input
              type="number"
              placeholder="Sale Price"
              value={variant.salePrice}
              onChange={(e) =>
                handleVariantChange(index, "salePrice", e.target.value)
              }
              className="border p-2 w-full"
            />

            <input
              type="number"
              placeholder="Stock"
              value={variant.stock}
              onChange={(e) =>
                handleVariantChange(index, "stock", e.target.value)
              }
              className="border p-2 w-full"
            />

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Variant Featured Image
              </label>
              <p className="text-[11px] text-gray-500">
                Image for this color/size variant
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleVariantChange(index, "featuredImage", e.target.files[0])
                }
              />
            </div>

            {/* VARIANT GALLERY */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">
                Variant Gallery (Images / Video)
              </label>
              <p className="text-[11px] text-gray-500">
                Optional images or one video for this variant
              </p>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={(e) =>
                  handleVariantChange(index, "gallery", [...e.target.files])
                }
              />
            </div>

            {variants.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-600 text-sm"
              >
                Remove Variant
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addVariant} className="text-blue-600">
          + Add Variant
        </button>
      </div>

      {/* RIGHT */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4">
        <h2 className="font-semibold">Product Data</h2>

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

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-primary5 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Publish Product"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="w-full border py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
