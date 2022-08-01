import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Default from "../../Default.json";
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
    let value = Default.Form;
    let {FirstName,LastName,Dop,UserId,Gender,Status,Primarynumber,SecondaryNumber,ServiceArea,shifttimings,Email,
      Addline1,Addline2,City,State,Pincode,Address}=value

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
  const addDriver = { firstname, lastname,
          dob, userId, gender, status, Shifttimings, PrimaryNumber, emailadress,
          serviceArea, secondaryNumber, addline1, addline2, city, state, pincode, assignedCab :"N/A"}
        try {
            if (usersId !== undefined && usersId !== "") {
                await UserDataService.updateDriver(usersId, cabDrivers);
                setUsersid("");
                navigate("/transportprovider/ManageDrivers");
            }
            else {
                await UserDataService.addDriver(addDriver)
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
                  type={FirstName.type}
                  name={FirstName.name}
                  label={FirstName.label}
                  className="form-control"
                  value={firstname}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                    type={LastName.type}
                    name={LastName.name}
                    label={LastName.label}
                  className="form-control"
                  value={lastname}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type={Dop.type}
                  name={Dop.name}
                  label={Dop.label}
                  className="form-control "
                  value={dob}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type={UserId.type}
                  name={UserId.name}
                  label={UserId.label}
                  className="form-control"
                  value={userId}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type={Gender.type}
                  name={Gender.name}
                  label={Gender.label}
                  className="form-control"
                  value={gender}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type={Status.type}
                  name={Status.name}
                  label={Status.label}
                  className="form-control"
                  value={status}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type={Primarynumber.type}
                  name={Primarynumber.name}
                  label={Primarynumber.label}
                  className="form-control"
                  value={PrimaryNumber}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type={ServiceArea.type}
                  name={ServiceArea.name}
                  label={ServiceArea.label}
                  className="form-control"
                  value={serviceArea}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type={SecondaryNumber.type}
                 name={SecondaryNumber.name}
                 label={SecondaryNumber.label}
                  className="form-control"
                  value={secondaryNumber}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type={shifttimings.type}
                  name={shifttimings.name}
                  label={shifttimings.label}
                  className="form-control"
                  value={Shifttimings}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem ">
              <div className="colitem">
                <Input
                 type={Email.type}
                  name={Email.name}
                  label={Email.label}
                  value={emailadress}
                  onChange={handlechange}
                  className="form-control"
                />
              </div>
              <div className="colitem edittransAddress">
                <label htmlFor="address">{Address.label}</label>
                <Input
                  type={Addline1.type}
                  name={Addline1.name}
                  className="edittrans w"
                  placeholder={Addline1.label}
                  value={addline1}
                  onChange={handlechange}
                />
                <Input
                  type={Addline2.type}
                  className="edittrans w"
                  placeholder={Addline2.label}
                  name={Addline2.name}
                  value={addline2}
                  onChange={handlechange}
                />
                <div className="adress-content ">
                  <Input
                    type={City.type}
                    name={City.name}
                    placeholder={City.label}
                    value={city}
                    className="form-control"
                    onChange={handlechange}
                  />
                  <Input
                    type={State.type}
                    placeholder={State.label}
                    name={State.name}
                    value={state}
                    className="form-control"
                    onChange={handlechange}
                  />
                  <Input
                    type={Pincode.type}
                    name={Pincode.name}
                    placeholder={Pincode.label}
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