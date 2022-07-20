import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./addDrivers.css"
import Input from '../../../components/input/Input';
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from '../../../context/UserAuthcontext';


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
        shiftTimings: "",
        emailAdress: "",
        addline1: "",
        addline2: "",
        city: "",
        state: "",
        pincode: "",
    })
    const navigate = useNavigate();
    const { usersId, setUsersid } = useUserAuth();

    const { firstname, lastname,
        dob, userId, gender, status,
        serviceArea, shifttimings, emailAdresss,
        PrimaryNumber, secondaryNumber, addline1, addline2, city, state, pincode } = cabDrivers

     const handlechange = (e) => {
        let { name, value } = e.target;
         setcabDrivers({ ...cabDrivers, [name]: value })
    }
    


    // /// ADD/ Drivers Fn ////
    const submitHandler =  async(e) => {
        e.preventDefault();
        const result =  await UserDataService.addDriver(cabDrivers);
        if(result){
            navigate("/admin/trans/manageDrivers");
        }else{

        }
        }

    const closeChange = () => {
        setUsersid("")
        navigate('/admin/trans/manageDrivers')

    }

    const url = "https://www.pikpng.com/pngl/b/75-757195_user-png.png"
    return (
        <>
            <div className="editpage_edit">
                <div className="editAddHome">
                    <form onSubmit={submitHandler}>
                        <div className='gridContainer'>
                            <div className='gridItem'>
                                <div className="input-group">
                                    <label htmlFor="firstname">First name</label>
                                    <Input
                                        type="text"
                                        name="firstname"
                                        className="input-controls"
                                        value={firstname}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="dob">Date Of Birth</label>
                                    <Input
                                        type="date"
                                        name="dob"
                                        className="input-controls"
                                        value={dob}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="gender">Gender</label>
                                    <Input
                                        type="text"
                                        name="gender"
                                        className="input-controls"
                                        value={gender}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="PrimaryNumber">Primary Number</label>
                                    <Input
                                        type="text"
                                        name="PrimaryNumber"
                                        className="input-controls"
                                        value={PrimaryNumber}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="secondaryNumber">Secondary Number</label>
                                    <Input
                                        type="text"
                                        name="secondaryNumber"
                                        className="input-controls"
                                        value={secondaryNumber}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="emailAdress">Email Address</label>
                                    <Input
                                        type="email"
                                        name="emaildress"
                                        className="input-controls"
                                        value={emailAdresss}
                                        onChange={handlechange}
                                    />
                                </div>
                                <br></br><br></br>
                                <div style={{ position: "relative", top: 24 }}>
                                    <button type="submit" className="btn btn-primary pos">
                                        Save
                                    </button>
                                </div>
                            </div>
                            <div className='gridId'>
                                <div className="input-group">
                                    <label htmlFor="lastname">Last Name</label>
                                    <Input
                                        type="text"
                                        name="lastname"
                                        className="input-controls"
                                        value={lastname}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="userId">User ID</label>
                                    <Input
                                        type="text"
                                        name="userId"
                                        className="input-controls"
                                        value={userId}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="status">Status</label>
                                    <Input
                                        type="text"
                                        name="status"
                                        className="input-controls"
                                        value={status}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="serviceArea">Service Area</label>
                                    <Input
                                        type="text"
                                        name="serviceArea"
                                        className="input-controls"
                                        value={serviceArea}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="shifttiming">Shift Timings</label>
                                    <Input
                                        type="text"
                                        name="Shifttimings "
                                        className="input-controls"
                                        value={shifttimings}
                                        onChange={handlechange}
                                    />
                                </div>
                                <div style={{ position: "relative", top: 130 }}>
                                    <button type="submit" className="btn btn-primary ">{usersId === "" ? "save&add Another" : "Save Another"}
                                    </button>
                                </div>
                            </div>
                            <div className='gridItem buttonGrid'>
                                
                                <div className='border'>
                                    <div className="edittransAddress">
                                        <div>
                                            <label htmlFor="address">Address</label>
                                            <Input
                                                type="text"
                                                className="editAdd"
                                                placeholder="Address Line 1"
                                                name="addline1"
                                                value={addline1}
                                                onChange={handlechange}
                                            />
                                            <Input
                                                type="text"
                                                className="editAdd"
                                                placeholder="Address Line 2"
                                                name="addline2"
                                                value={addline2}
                                                onChange={handlechange}
                                            />
                                            <div className="editCrewAdd">
                                                <Input
                                                    type="text"
                                                    placeholder="City"
                                                    name="city"
                                                    value={city}
                                                    onChange={handlechange}
                                                />
                                                <Input 
                                                type="text"
                                                name="state"
                                                placeholder="State"
                                                value={state}
                                                onChange={handlechange}
                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Pin code"
                                                    name="pincode"
                                                    className="pincode"
                                                    value={pincode}
                                                    onChange={handlechange}
                                                />
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                                <br></br>
                                <div>
                                    <button type="reset" className="btn btn-primary " onClick={closeChange}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddDrivers