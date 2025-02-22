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
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <div className="w-4/5 p-8 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          Add New Room
        </h1>

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
            <Form className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-700 font-medium">Hotel ID</label>
                <Field
                  name="hotelId"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Enter hotel ID"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Room Title</label>
                <Field
                  name="title"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Enter room title"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Price</label>
                <Field
                  name="price"
                  type="number"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Enter room price"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Max People</label>
                <Field
                  name="maxPeople"
                  type="number"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Enter max people"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 font-medium">Room Description</label>
                <Field
                  name="desc"
                  as="textarea"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="Enter room description"
                  rows="3"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-gray-700 font-medium">
                  Room Numbers (comma separated)
                </label>
                <input
                  name="roomNumbers"
                  type="text"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-300"
                  placeholder="E.g. 101, 102, 103"
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
              </div>

              <div className="col-span-2 text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-8 rounded-lg text-lg font-semibold hover:scale-105 transition-transform duration-300"
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
