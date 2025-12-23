// controllers/product.controller.js
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../model/product.model.js";
import { SubCategory } from "../model/subcategory.model.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

/**
 * CREATE PRODUCT
 */
const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    slug,
    description,
    category,
    subCategory,
    variants,
    status,
  } = req.body;

  /* ================= BASIC VALIDATION ================= */
  if (!title || !slug || !category || !subCategory) {
    return res.status(400).json(
      new ApiResponse(400, "Title, slug, category and subCategory are required")
    );
  }

  /* ================= DUPLICATE SLUG ================= */
  const exists = await Product.findOne({ slug });
  if (exists) {
    return res
      .status(409)
      .json(new ApiResponse(409, "Product with this slug already exists"));
  }

  /* ================= VALIDATE SUBCATEGORY ================= */
  const validSubCategory = await SubCategory.findOne({
    _id: subCategory,
    category,
  });

  if (!validSubCategory) {
    return res.status(400).json(
      new ApiResponse(400, "SubCategory does not belong to selected category")
    );
  }

  /* ================= FILE EXTRACTION (upload.any) ================= */

  let featuredImageFile = null;
  let hoverImageFile = null;
  let productGalleryFiles = [];

  for (const file of req.files || []) {
    if (file.fieldname === "featuredImage") {
      featuredImageFile = file;
    }

    if (file.fieldname === "hoverImage") {
      hoverImageFile = file;
    }

    if (file.fieldname === "gallery") {
      productGalleryFiles.push(file);
    }
  }

  if (!featuredImageFile || !hoverImageFile) {
    return res.status(400).json(
      new ApiResponse(400, "Featured image and hover image are required")
    );
  }

  /* ================= UPLOAD PRODUCT IMAGES ================= */

  const featuredImageUrl = await uploadToS3(
    featuredImageFile,
    "products/featured"
  );

  const hoverImageUrl = await uploadToS3(
    hoverImageFile,
    "products/hover"
  );

  const galleryMedia = [];

  for (const file of productGalleryFiles) {
    const url = await uploadToS3(file, "products/gallery");

    galleryMedia.push({
      url,
      type: file.mimetype.startsWith("video/")
        ? "video"
        : "image",
    });
  }

  /* ================= PARSE VARIANTS ================= */

  let parsedVariants = [];

  if (!variants) {
    return res.status(400).json(
      new ApiResponse(400, "At least one variant is required")
    );
  }

  parsedVariants = JSON.parse(variants);

  if (!Array.isArray(parsedVariants) || parsedVariants.length === 0) {
    return res.status(400).json(
      new ApiResponse(400, "At least one variant is required")
    );
  }

  // Initialize variant media fields
  parsedVariants.forEach((variant) => {
    variant.featuredImage = null;
    variant.gallery = [];
  });

  /* ================= VARIANT IMAGE HANDLING ================= */

  for (const file of req.files || []) {
    // variantFeatured_0
    if (file.fieldname.startsWith("variantFeatured_")) {
      const index = Number(file.fieldname.split("_")[1]);

      if (parsedVariants[index]) {
        const url = await uploadToS3(
          file,
          `products/variants/${index}/featured`
        );
        parsedVariants[index].featuredImage = url;
      }
    }

    // variantGallery_0
    if (file.fieldname.startsWith("variantGallery_")) {
      const index = Number(file.fieldname.split("_")[1]);

      if (parsedVariants[index]) {
        const url = await uploadToS3(
          file,
          `products/variants/${index}/gallery`
        );

        parsedVariants[index].gallery.push({
          url,
          type: file.mimetype.startsWith("video/")
            ? "video"
            : "image",
        });
      }
    }
  }

  /* ================= VARIANT VALIDATION ================= */

  for (const variant of parsedVariants) {
    if (!variant.featuredImage) {
      return res.status(400).json(
        new ApiResponse(400, "Each variant must have a featured image")
      );
    }
  }

  /* ================= CREATE PRODUCT ================= */

  const product = await Product.create({
    title,
    slug,
    description,
    category,
    subCategory,
    variants: parsedVariants,
    featuredImage: featuredImageUrl,
    hoverImage: hoverImageUrl,
    gallery: galleryMedia,
    status,
    author: req.adminuser._id,
  });

  res.status(201).json(
    new ApiResponse(201, "Product created successfully", product)
  );
});


/**
 * UPDATE PRODUCT
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(
    id,
    {
      ...req.body,
      author: req.adminuser._id, // optional audit trail
    },
    { new: true, runValidators: true }
  );

  if (!product) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Product not found"));
  }

  res.json(new ApiResponse(200, "Product updated successfully", product));
});

/**
 * DELETE PRODUCT
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Product not found"));
  }

  res.json(new ApiResponse(200, "Product deleted successfully"));
});
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate({
      path: "author",
      select: "fullName", // ✅ only fullName
    })
    .populate({
      path: "category",
      select: "name", // ✅ only name
    })
    .populate({
      path: "subCategory",
      select: "name", // ✅ only name
    })

  if (!product) {
    return res
      .status(404)
      .json(new ApiResponse(404, "Product not found"));
  }
  res.status(200).json(
    new ApiResponse(200, "Product fetched successfully", product)
  );
});

/**
 * GET ALL PRODUCTS (FILTER + PAGINATION)
 */
// const getAllProducts = asyncHandler(async (req, res) => {
//   const {
//     category,
//     subCategory,
//     minPrice,
//     maxPrice,
//     color,
//     size,
//     search,
//     page = 1,
//     limit = 10,
//   } = req.query;

//   const query = {};

//   if (category) query.category = category;
//   if (subCategory) query.subCategory = subCategory;

//   if (minPrice || maxPrice) {
//     query.$or = [
//       {
//         regularPrice: {
//           $gte: Number(minPrice) || 0,
//           $lte: Number(maxPrice) || 999999,
//         },
//       },
//       {
//         "variants.regularPrice": {
//           $gte: Number(minPrice) || 0,
//           $lte: Number(maxPrice) || 999999,
//         },
//       },
//     ];
//   }

//   if (color) query["variants.colors"] = color;
//   if (size) query["variants.sizes"] = size;

//   if (search) {
//     query.title = { $regex: search, $options: "i" };
//   }

//   const products = await Product.find(query)
//     .populate("category subCategory author")
//     .skip((page - 1) * limit)
//     .limit(Number(limit))
//     .sort({ createdAt: -1 });

//   const total = await Product.countDocuments(query);

//   res.json(
//     new ApiResponse(200, "Products fetched successfully", {
//       total,
//       page: Number(page),
//       limit: Number(limit),
//       products,
//     })
//   );
// });
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate({
      path: "author",
      select: "fullName", // ✅ only fullName
    })
    .populate({
      path: "category",
      select: "name", // ✅ only name
    })
    .populate({
      path: "subCategory",
      select: "name", // ✅ only name
    })
    .sort({ createdAt: -1 });

  if (!products.length) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No products found"));
  }

  res.status(200).json(
    new ApiResponse(200, "Products fetched successfully", products)
  );
});


export { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById };
