import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AdminSidebar from "../../../components/AdminSidebar/AdminSidebar";
import url from "../../../utils/baseUrl";

// Validation schema for rooms
const RoomSchema = Yup.object().shape({
  title: Yup.string().required("Room title is required"),
  price: Yup.number().required("Price is required").min(0),
  maxPeople: Yup.number().required("Max people is required").min(1),
  desc: Yup.string().required("Description is required"),
  roomNumbers: Yup.array()
    .of(
      Yup.object().shape({
        number: Yup.number().required("Room number is required"),
        unavailableDates: Yup.array().of(Yup.date()),
      })
    )
    .min(1, "At least one room number is required"),
});

const AddRooms = () => {
  return (
    <div className="w-full flex">
      <AdminSidebar />

      <div className="w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Add Room</h1>
        <Formik
          initialValues={{
            hotelId: "",
            title: "",
            price: 0,
            maxPeople: 1,
            desc: "",
            roomNumbers: [],
          }}
          validationSchema={RoomSchema}
          onSubmit={async (values) => {
            try {
              await axios.post(`${url}/rooms/${values.hotelId}`, values, {
                headers: {
                  Authorization: `Bearer admin-secret-token-123`,
                },
              });
              alert("Room added successfully!");
            } catch (error) {
              console.error("Error adding room:", error);
              alert("Failed to add room");
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="hotelId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hotel ID
                </label>
                <Field
                  id="hotelId"
                  name="hotelId"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                  placeholder="Enter hotel ID"
                />
              </div>

              {/* Room */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room Title
                </label>
                <Field
                  id="title"
                  name="title"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                  placeholder="Enter room title"
                />
              </div>

              {/* Price */}
              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Price
                </label>
                <Field
                  id="price"
                  name="price"
                  type="number"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                  placeholder="Enter room price"
                />
              </div>

              {/* Max People */}
              <div className="mb-4">
                <label
                  htmlFor="maxPeople"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max People
                </label>
                <Field
                  id="maxPeople"
                  name="maxPeople"
                  type="number"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                  placeholder="Enter max people"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label
                  htmlFor="desc"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room Description
                </label>
                <Field
                  id="desc"
                  name="desc"
                  as="textarea"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                  placeholder="Enter room description"
                />
              </div>

              {/* Room Numbers */}
              <div className="mb-4">
                <label
                  htmlFor="roomNumbers"
                  className="block text-sm font-medium text-gray-700"
                >
                  Room Numbers (comma separated)
                </label>
                <input
                  id="roomNumbers"
                  name="roomNumbers"
                  type="text"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                  placeholder="Enter room numbers, e.g. 101, 102"
                  onChange={(e) => {
                   
                    const numbers = e.target.value
                      .split(",")
                      .map((num) => ({
                        number: parseInt(num.trim()), 
                        unavailableDates: [], 
                      }));

                    setFieldValue("roomNumbers", numbers);
                  }}
                />
                <pre className="mt-2 text-sm text-gray-600">
                  {JSON.stringify(values.roomNumbers, null, 2)}
                </pre>
              </div>

              {/* Submit Button */}
              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-md hover:scale-105 transition-transform duration-300"
                >
                  Add Room
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddRooms;