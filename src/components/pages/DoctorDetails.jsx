import React from 'react'
import data from '../data'
import { useState } from 'react'
import { CalendarComponent } from '@syncfusion/ej2-react-calendars';
// import the ripple effect
import { enableRipple } from '@syncfusion/ej2-base';
// import the timepicker
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
// enable ripple effect
enableRipple(true);

const checkDays = (day) => {
  // console.log(day)
  if (day === "sun") {
    return 0
  }
  else if (day === "mon") {
    return 1
  }
  else if (day === "tue") {
    return 2
  }
  else if (day === "wed") {
    return 3
  }
  else if (day === "thu") {
    return 4
  }
  else if (day === "fri") {
    return 5
  }
  else if (day === "sat") {
    return 6
  }
}

const DoctorDetails = () => {

  const [submitDate, setSubmitDate] = useState();
  const [active, setActive] = useState(false)
  const [date, setDate] = useState([])
  const [slotTime, setSlotTime] = useState([])
  // console.log(active)
  const [formControl, setFormControl] = useState(false)
  const formHandle = () => {
    setFormControl(true)
    setActive(false)
  }

  const bookAppointment = () => {
    setActive(true)
  }

  const handleClose = () => {
    setActive(false)
  }

  const id = window.location.href.split("/")[4]
  // console.log(id)
  const [dataList, setDataList] = useState(data[id])
  // console.log(dataList)

  //  spearating json value here

  // days
  let days = {};
  days = dataList.availibility
  let dayArray = Object.keys(days);

  //  times
  let time = Object.values(days);
  // console.log(time)

  let splitTime = time.toString().split(",");
  // console.log(splitTime)
  let timeFromSplit = []

  const splitingTime = (value) => {
    for (let i = 0; i < value.length; i++) {
      timeFromSplit[i] = value[i]
    }
  }

  let dateString = date.toString()
  let splitDate = dateString.split(" ")
  let startDay = checkDays(dayArray[0])
  let midDay = checkDays(dayArray[1])
  let endDay = checkDays(dayArray[2])

  const mainDateToShow = splitDate[0] + "/" + splitDate[1] + "/" + splitDate[2];
  // console.log("This is date ", mainDateToShow)

  //calendar
  const dateValue = new Date();
  const disabledDate = (args) => {
    if (args.date.getDay() !== startDay && args.date.getDay() !== midDay && args.date.getDay() !== endDay) {
      // set 'true' to disable the weekends
      args.isDisabled = true;
    }
  }

  // timepicker
  const minTime = (new Date(`${mainDateToShow} 9:00 AM`));
  const maxTime = (new Date(`${mainDateToShow} 11:30 PM`));

  return (
    <div className="row d-flex justify-content-center align-items-center mt-5">
      <div className="col">
        <div className="card">
          <div className="card-body text-center">
            <h2 className="card-title">{dataList.name}</h2>
            <h5 className="card-text ">{dataList.org}</h5>
            <p> Visit Duration : {dataList.visitDurationInMin + " Min"}</p>
            <div className="btn btn-primary" onClick={bookAppointment}>Book an appointment</div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-center items-center mt-4'>
        <p>{dataList.availibility[0]}</p>
        {
          active &&
          <div className='mr-3' >
            <i className="fas fa-times mr-2" onClick={handleClose}></i>
            <div className='ml-4'>
              <CalendarComponent id="calendar" renderDayCell={disabledDate} value={dateValue} onChange={(e) => { setDate(e.target.value) }} />
              <TimePickerComponent id="timepicker" placeholder="Select a Time" min={minTime} max={maxTime} step={15} onChange={(e) => { setSlotTime(e.target.prevValue) }} />
            </div>
            <div className="btn btn-primary" onClick={formHandle}>Proceed</div>
            <div className='container mt-4 border bg-primary text-white text-center'>
              <p className='mt-2'>Appointment Time: Date: <br /> {mainDateToShow} <br></br> {slotTime} </p>
            </div>
          </div>
        }

        {formControl &&
          <form>
            <div className="form-group">
              <label for="text">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Name" />
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label for="number">Phone Number</label>
              <input type="tel" className="form-control" id="number" placeholder="Number" />
            </div>
            <div className="form-group">
              <label for="text">Visit Reason</label>
              <input type="text" className="form-control" id="reason" placeholder="Reason" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        }
      </div>
    </div>
  )
}

export default DoctorDetails