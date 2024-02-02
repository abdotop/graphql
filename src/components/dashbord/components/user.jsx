import { useEffect, useRef } from "react";
import { user } from "../../../config/query.js";
import { fetchData } from "../../../tools/tools.js";



export function User() {
  const id = useRef(null);
  const fname = useRef(null);
  const lname = useRef(null);
  const email = useRef(null);
  const age = useRef(null);
  const nationality = useRef(null);
  const phone = useRef(null);
 

  useEffect(() => {
    fetchData(user).then((result) => {
      const user = result.data.data.user[0];
      const attrs = user.attrs;
      id.current.innerHTML = user.id;
      fname.current.innerHTML = user.firstName;
      lname.current.innerHTML = user.lastName;
      email.current.innerHTML = user.email;
      age.current.innerHTML = attrs.age;
      nationality.current.innerHTML = attrs.nationality1;
      phone.current.innerHTML = attrs.phone;
    });
  }, []);
  return (
    <div className="user">
      <span className="id">
        ID: #<span ref={id}></span>
      </span>
      <span>
        FirstName: <span ref={fname}>#</span>{" "}
      </span>
      <span>
        LastName: <span ref={lname}>#</span>{" "}
      </span>
      <span>
        Email: <span ref={email}>#</span>{" "}
      </span>
      <span>
        Age: <span ref={age}>#</span> ans
      </span>
      <span>
        Nationality: <span ref={nationality}>#</span>{" "}
      </span>
      <span>
        Phone Number: <span ref={phone}>#</span>{" "}
      </span>
      {/* <span >LastName: <span ref={lname}>Top</span> </span> */}
      {/* <span >LastName: <span ref={lname}>Top</span> </span> */}
      {/* <span >LastName: <span ref={lname}>Top</span> </span> */}
    </div>
  );
}
