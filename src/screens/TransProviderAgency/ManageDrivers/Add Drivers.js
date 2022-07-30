import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./addDrivers.css"
import Input from '../../../components/Input/Input';
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from '../../../Context/UserAuthcontext';
import { connectFirestoreEmulator } from 'firebase/firestore';
import Button from '../../../components/Button/Button';


const AddDrivers = () => {
    const [cabDrivers, setcabDrivers] = useState({

        firstname: '',
        lastname: '',
        dob: '',
        userId: '',
        gender: '',
        PrimaryNumber: "",
        secondaryNumber: "",
        status: '',
        serviceArea: "",
        Shifttimings: "",
        emailadress: "",
        addline1: "",
        addline2: "",
        city: "",
        state: "",
        pincode: "",

    })
    const [cabs, updateCabs] = useState([]);
    const navigate = useNavigate();
    const { usersId, setUsersid } = useUserAuth();

    const { firstname, lastname,
        dob, userId, gender, status, Shifttimings, PrimaryNumber, emailadress,
        serviceArea, secondaryNumber, addline1, addline2, city, state, pincode, assignedCab, cab } = cabDrivers

    const handlechange = (e) => {
        let { name, value } = e.target;
        setcabDrivers({ ...cabDrivers, [name]: value })
    }
    const editHandler = async () => {
        try {
            const docSnap = await UserDataService.getDriver(usersId);
            setcabDrivers(docSnap.data());
        } catch (err) {
            console.log(err);
        }
    };
    const getcabdetails = async () => {
        const data = await UserDataService.getcabdetails();
        updateCabs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        //console.log(cabs);
    }
    useEffect(() => {
        if (usersId !== undefined && usersId !== "") {
            editHandler();
        }
    }, [usersId]
    )
    useEffect(() => {
        getcabdetails();
    }, [])

    // /// ADD/ Drivers Fn ////
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if (usersId !== undefined && usersId !== "") {
                await UserDataService.updateDriver(usersId, cabDrivers);
                setUsersid("");
                navigate("/transportprovider/ManageDrivers");
            }
            else {
                await UserDataService.addDriver(cabDrivers)
                navigate('/transportprovider/ManageDrivers')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const closeChange = () => {
        setUsersid("")
        navigate('/transportprovider/ManageDrivers')

    }

    const url = "https://www.pikpng.com/pngl/b/75-757195_user-png.png"
    return (
      <>
        <h4 className="add-driver">Add Driver </h4>
        <div className="containeritem">
          <form onSubmit={submitHandler} className="add-driver-form">
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type="text"
                  name="firstname"
                  label="First Name"
                  className="form-control"
                  value={firstname}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type="text"
                  name="lastname"
                  label="Last Name"
                  className="form-control"
                  value={lastname}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type="date"
                  name="dob"
                  label="Date Of Birth"
                  className="form-control "
                  value={dob}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type="text"
                  name="userId"
                  label="User ID"
                  className="form-control"
                  value={userId}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type="text"
                  name="gender"
                  label="Gender"
                  className="form-control"
                  value={gender}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type="text"
                  name="status"
                  label="Status"
                  className="form-control"
                  value={status}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type="text"
                  name="PrimaryNumber"
                  label="Primary Number"
                  className="form-control"
                  value={PrimaryNumber}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type="text"
                  name="serviceArea"
                  label="Service Area"
                  className="form-control"
                  value={serviceArea}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type="text"
                  name="secondaryNumber"
                  label="SecondaryNumber"
                  className="form-control"
                  value={secondaryNumber}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type="text"
                  name="Shifttimings"
                  label="Shift Timings"
                  className="form-control"
                  value={Shifttimings}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem ">
              <div className="colitem">
                <Input
                  type="text"
                  name="emailadress"
                  label="Email Adress"
                  value={emailadress}
                  onChange={handlechange}
                  className="form-control"
                />
              </div>
              <div className="colitem edittransAddress">
                <label htmlFor="address">Address</label>
                <Input
                  type="text"
                  className="edittrans w"
                  placeholder="Address Line 1"
                  name="addline1"
                  value={addline1}
                  onChange={handlechange}
                />
                <Input
                  type="text"
                  className="edittrans w"
                  placeholder="Address Line 2"
                  name="addline2"
                  value={addline2}
                  onChange={handlechange}
                />
                <div className="adress-content ">
                  <Input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                    className="form-control"
                    onChange={handlechange}
                  />
                  <Input
                    type="text"
                    placeholder="State"
                    name="state"
                    value={state}
                    className="form-control"
                    onChange={handlechange}
                  />
                  <Input
                    type="number"
                    placeholder="Pin code"
                    name="pincode"
                    value={pincode}
                    className="form-control"
                    onChange={handlechange}
                  />
                </div>
              </div>
            </div>
            <div className="btn-actions btn-group mt-4 rowitem ">
              <Button
                type="submit"
                children="save"
                className="btn btn-primary"
                wrapperClass="me-2"
              />
              <br />
              <Button
                type="submit"
                children="save&add another"
                className="btn btn-success"
                wrapperClass="me-2"
              />
              <br />
              <Button
                wrapperClass="me-2"
                children="close"
                className="btn btn-danger"
                onClick={closeChange}
              />
            </div>
          </form>
        </div>
      </>
    );
}

export default AddDrivers