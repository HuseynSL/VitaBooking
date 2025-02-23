import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import axios from "axios";
import url from "../../../utils/baseUrl.js";

const AddHotelSchema = Yup.object().shape({
  name: Yup.string().required("Hotel name is required"),
  type: Yup.string().required("Hotel type is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  distance: Yup.string().required("Distance is required"),
  title: Yup.string().required("Title is required"),
  desc: Yup.string().required("Description is required"),
  cheapestPrice: Yup.number()
    .required("Price is required")
    .min(0, "Price can't be negative"),
});

const AddHotels = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex">
      <AdminSidebar />

      <div className="w-4/5 p-8 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Add Hotel
        </h1>
        <Formik
          initialValues={{
            name: "",
            type: "",
            city: "",
            address: "",
            distance: "",
            photos: [],
            title: "",
            desc: "",
            rating: 0,
            rooms: [],
            cheapestPrice: 0,
            featured: false,
          }}
          validationSchema={AddHotelSchema}
          onSubmit={async (values) => {
            try {
              await axios.post(`${url}/hotels`, values, {
                headers: {
                  Authorization: `Bearer admin-secret-token-123`,
                },
              });
              navigate("/admin/hotels");
            } catch (error) {
              console.error("Error adding hotel:", error);
            }
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-6 h-max py-10">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hotel Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter hotel name"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hotel Type
                  </label>
                  <Field
                    id="type"
                    name="type"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter hotel type"
                  />
                  {errors.type && touched.type && (
                    <div className="text-red-500 text-sm">{errors.type}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <Field
                    id="city"
                    name="city"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter city"
                  />
                  {errors.city && touched.city && (
                    <div className="text-red-500 text-sm">{errors.city}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <Field
                    id="address"
                    name="address"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter address"
                  />
                  {errors.address && touched.address && (
                    <div className="text-red-500 text-sm">{errors.address}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="distance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Distance
                  </label>
                  <Field
                    id="distance"
                    name="distance"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter distance"
                  />
                  {errors.distance && touched.distance && (
                    <div className="text-red-500 text-sm">
                      {errors.distance}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <Field
                    id="title"
                    name="title"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter hotel title"
                  />
                  {errors.title && touched.title && (
                    <div className="text-red-500 text-sm">{errors.title}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rating (0-10)
                  </label>
                  <Field
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="10"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  {errors.rating && touched.rating && (
                    <div className="text-red-500 text-sm">{errors.rating}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="photos"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Photos (URLs)
                  </label>
                  <input
                    id="photos"
                    name="photos"
                    type="text"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter photo URLs (comma separated)"
                    onChange={(e) =>
                      setFieldValue("photos", e.target.value.split(","))
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="desc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <Field
                    id="desc"
                    name="desc"
                    as="textarea"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter description"
                  />
                  {errors.desc && touched.desc && (
                    <div className="text-red-500 text-sm">{errors.desc}</div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="rooms"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rooms (comma separated IDs)
                  </label>
                  <input
                    id="rooms"
                    name="rooms"
                    type="text"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter room IDs (comma separated)"
                    onChange={(e) =>
                      setFieldValue("rooms", e.target.value.split(","))
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="cheapestPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cheapest Price
                  </label>
                  <Field
                    id="cheapestPrice"
                    name="cheapestPrice"
                    type="number"
                    className="mt-1 p-3 w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Enter cheapest price"
                  />
                  {errors.cheapestPrice && touched.cheapestPrice && (
                    <div className="text-red-500 text-sm">
                      {errors.cheapestPrice}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="featured"
                  className="block text-sm font-medium text-gray-700"
                >
                  Featured
                </label>
                <Field
                  type="checkbox"
                  id="featured"
                  name="featured"
                  className="mt-1 p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-md hover:scale-105 transition-transform duration-300"
                >
                  Add Hotel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddHotels;

