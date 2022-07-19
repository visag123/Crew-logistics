import React, { useState, useEffect } from 'react';
import "./addDrivers.css"
import Input from '../../../components/input/Input';


const AddDrivers = () => {

    const url = "https://www.pikpng.com/pngl/b/75-757195_user-png.png"
    return (
        <>
            <div className="editpage_edit">
                <div className="editAddHome">
                    <form >
                        <div className='gridContainer'>
                            <div className='gridItem'>
                                <div className="input-group">
                                    <label htmlFor="firstname">First name</label>
                                    <Input
                                        type="text"
                                        name="firstname"
                                        className="input-controls"

                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="date of birth">Date Of Birth</label>
                                    <Input
                                        type="text"
                                        name="date of birth"
                                        className="input-controls"

                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="gender">Gender</label>
                                    <Input
                                        type="text"
                                        name="gender"
                                        className="input-controls"

                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="primary number">Primary Number</label>
                                    <Input
                                        type="text"
                                        name="primary number"
                                        className="input-controls"

                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="secondary number">Secondary Number</label>
                                    <Input
                                        type="text"
                                        name="secondary number"
                                        className="input-controls"

                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="email adress">Email Address</label>
                                    <Input
                                        type="text"
                                        name="email adress"
                                        className="input-controls"

                                    />
                                </div>
                                <br></br><br></br>
                                <div style={{ position: "relative", top: 8 }}>
                                    <button type="reset" className="btn btn-primary pos">
                                        Save
                                    </button>
                                </div>
                            </div>

                            <div className='gridId'>
                                <div className="input-group">
                                    <label htmlFor="lasstname">Last name</label>
                                    <Input
                                        type="text"
                                        name="lasttname"
                                        className="input-controls"

                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="userid">User Id</label>
                                    <Input
                                        type="text"
                                        name="userid"
                                        className="input-controls"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="status">Status</label>
                                    <Input
                                        type="text"
                                        name="status"
                                        className="input-controls"

                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="servicearea">Service Area</label>
                                    <Input
                                        type="text"
                                        name="service "
                                        className="input-controls"

                                    />
                                </div>
                                <div style={{ position: "relative", top: 173 }}>
                                    <button type="reset" className="btn btn-primary">
                                        Save &Add Another
                                    </button>
                                </div>

                            </div>

                            <div className='gridItem'>
                                <div className="upload">
                                    <img src={url} alt="profile img" />
                                    <span>Upload Image</span>
                                </div>
                                <br></br><br></br>
                                <div className='border'>
                                    <div className="edittransAddress">
                                        <div>
                                            <label htmlFor="address">Address</label>
                                            <Input
                                                type="text"
                                                className="editAdd"
                                                placeholder="Address Line 1"
                                                name="addline1"

                                            />
                                            <Input
                                                type="text"
                                                className="editAdd"
                                                placeholder="Address Line 2"
                                                name="addline2"

                                            />
                                            <div className="editCrewAdd">
                                                <Input
                                                    type="text"
                                                    placeholder="City"
                                                    name="city"

                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="State"

                                                />
                                                <Input
                                                    type="number"
                                                    placeholder="Pin code"
                                                    name="pincode"

                                                />
                                            </div>
                                        </div>
                                        <br />


                                    </div>

                                </div>
                                <br />
                                <div>
                                    <button type="reset" className="btn btn-primary mar " >
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