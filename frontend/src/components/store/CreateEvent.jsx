import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createEvent } from "../../redux/actions/eventActions";
import { getAllCategories } from "../../redux/actions/categoryActions";



const CreateEvent = () => {
  const { storeInfo } = useSelector((state) => state.storeLogin);
  const { success, error } = useSelector((state) => state.events);
  const { categories } = useSelector((state) => state.categories);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState(""); 
  const [subSubcategory, setSubSubcategory] = useState(""); 
  const [subcategories, setSubcategories] = useState([]); 
  const [subSubcategories, setSubSubcategories] = useState([]); 
  const [brand, setBrand] = useState(""); 
  const [model, setModel] = useState("");
  const [size, setSize] = useState(""); 
  const [color, setColor] = useState(""); 
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() ) + 3 * 24 * 60 * 60 * 1000;
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString;
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";


  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  const handleImageChange = (e) => {
    // const files = Array.from(e.target.files);
    let files = Array.from(e.target.files)
    setImages((prevImages) => [...prevImages, ...files])

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || category === "Choose a category") {
      toast.error("Please select a category.");
      return; // Exit early if category is not selected
    }
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return; // Exit early if no images are chosen
    }
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image); // Append each image
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("subcategory", subcategory);
    newForm.append("subSubcategory", subSubcategory); 
    newForm.append("brand", brand); 
    newForm.append("model", model); 
    newForm.append("size", size); 
    newForm.append("color", color)
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("storeId", storeInfo._id);
    newForm.append("start_Date", startDate);
    newForm.append("finish_Date", endDate);
  
    dispatch(createEvent(newForm));
  };

useEffect(() => {
  if (category) {
    console.log("SUBCAT", category)
    fetchSubcategories(category);
  }
}, [category]);

useEffect(() => {
  if (subcategory) {
    fetchSubSubcategories(subcategory);
  }
}, [subcategory]);

const fetchSubcategories = async (categoryId) => {
  try {
    const response = await fetch(`/api/subcategories?categoryId=${categoryId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch subcategories");
    }
    const data = await response.json();
    console.log("Subcategories", data)
    setSubcategories(data || []);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
  }
};

const fetchSubSubcategories = async (subcategoryId) => {
  try {
    const response = await fetch(`/api/sub-subcategories?subcategoryId=${subcategoryId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch sub-subcategories");
    }
    const data = await response.json();
    console.log("subSubcategories", data)
    setSubSubcategories(data.subSubcategories || []);
  } catch (error) {
    console.error("Error fetching sub-subcategories:", error);
  }
};


  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create An Event</h5>
      {/* create event form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your event product name..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description..."
          ></textarea>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {categories &&
              categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {category && (
          <div>
            <label className="pb-2">
              Subcategory <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
            >
              <option value="">Choose a subcategory</option>
              {subcategories &&
                subcategories.map((subcat) => (
                  <option value={subcat._id} key={subcat._id}>
                    {subcat.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        {subcategory && (
          <div>
            <label className="pb-2">
              Sub-subcategory <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full mt-2 border h-[35px] rounded-[5px]"
              value={subSubcategory}
              onChange={(e) => setSubSubcategory(e.target.value)}
            >
              <option value="">Choose a sub-subcategory</option>
              {subSubcategories &&
                subSubcategories.map((subSubcat) => (
                  <option value={subSubcat._id} key={subSubcat._id}>
                    {subSubcat.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <br />
        <div>
          <label className="pb-2">Brand</label>
          <input
            type="text"
            name="tags"
            value={brand}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Enter your product tags..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Model</label>
          <input
            type="text"
            name="model"
            value={model}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setModel(e.target.value)}
            placeholder="Enter your product model..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Size</label>
          <input
            type="text"
            name="size"
            value={size}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setSize(e.target.value)}
            placeholder="Enter your product size..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Color</label>
          <input
            type="text"
            name="color"
            value={color}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setColor(e.target.value)}
            placeholder="Enter your product color..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your event product price..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your event product price with discount..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your event product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={ handleStartDateChange}
            min={today}
            placeholder="Enter your event product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="Enter your event product stock..."
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent