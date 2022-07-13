import React from 'react'

const AddCrew = () => {

    
  return (
    <>
       <div className="editpage_search">
            <form>
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input type="text" placeholder="search" />
            </form>
            <i class="fa-solid fa-circle-plus"></i>
          </div>
     <div className="sys-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>User ID</th>
              <th>Employee Name</th>
              <th>Gender</th>
              <th>Additional Requests</th>
            </tr>
          </thead>
          {/* <tbody>
            {travel.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td><Link to=''>{doc.FlightNo}</Link></td>
                  <td className='No_of_crew'>{doc.CrewMembers}</td>
                  <td>{doc.FlightRoute}</td>
                  <td>{doc.FlightDateTime}</td>
                </tr>
              );
            })}
          </tbody> */}
        </table>
      </div>
    </>
  )
}

export default AddCrew