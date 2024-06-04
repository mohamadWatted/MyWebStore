import { useEffect } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartments } from "../../features/departments-slice";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DropDown = () => {
  const data = useSelector((state) => state.data.filtered);
  const departments = useSelector((state) => state.departments.data);
  const  navigate  = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartments());
  }, []);
  return (
    <>
      {departments.map((d) => (
        <NavDropdown title={d.name} key={d.id}>
          {d.categories.map((c) => (
            <NavDropdown key={c.id} title={c.name}>
              {c.subcategories.map((s) => (
                <Dropdown.Item
                  key={s.id}
                  onClick={() => navigate(`/products/${d.name}/${c.name}/${s.name}`)}
                >
                  <li>{s.name}</li>
                </Dropdown.Item>
              ))}
            </NavDropdown>
          ))}
        </NavDropdown>
      ))}
    </>
  );
};

export default DropDown;

{
  /* <>
{departments.map((c) => (
  <div key={c.department.id}>
    <NavDropdown title={c.department.name} id="collasible-nav-dropdown" key={c.department.id}>
      {
        c.categories.map(c1 => <NavDropdown title={c1.name} key={`${c.department.i}_${c1.id}`}>

        </NavDropdown>)
      }
    </NavDropdown>
  </div>
))}
</> */
}
