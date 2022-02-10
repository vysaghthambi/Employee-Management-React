import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "./Axios"
import CustomModal from "./CustomModal";

const CustomForm = ({ selectedEmployee, id, employeeList, setEmployeeList }) => {

    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false)

    if (selectedEmployee && !isEdit) {
        setIsEdit(true);
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: selectedEmployee ? selectedEmployee.name : "",
            email: selectedEmployee ? selectedEmployee.email : "",
            designation: selectedEmployee ? selectedEmployee.designation : "",
            salary: selectedEmployee ? selectedEmployee.salary : "",
            phone: selectedEmployee ? selectedEmployee.phone : ""
        }
    });

    const onSubmit = async (data) => {
        if (isEdit) {
            if (!isOpen) {
                toggleModal()
            }
            else {
                toggleModal()
                const response = await api.put(`/employees/${id}`, data);
                const updatedList = employeeList.map((employee) =>
                    employee.id === parseInt(id) ? response.data : employee
                );
                setEmployeeList(updatedList);
                navigate("/");
            }
        }
        else {
            const id = employeeList.length
                ? employeeList[employeeList.length - 1].id + 1
                : 1;
            const newEmployee = {
                id: id,
                ...data,
            };
            const response = await api.post("/employees", newEmployee);
            setEmployeeList([...employeeList, response.data]);
            navigate("/");
        }
    }

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="card mt-5">
            <div className="card-head">
                <h3 className="card-header">{isEdit ? "Update" : "Add"} Employee</h3>
            </div>
            <div className="card-body">
                <form>
                    {isEdit && <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="id"
                            placeholder="id"
                            value={id}
                            disabled
                        />
                        <label htmlFor="id">ID</label>
                    </div>}
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            placeholder="Name"
                            {...register("name", { required: true })}
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    {errors.name?.type === "required" && <p className="validation-error">Name is Required</p>}
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            type="email"
                            id="email"
                            placeholder="Email"
                            {...register("email", {
                                required: true,
                                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            })}
                        />
                        <label htmlFor="email">Email</label>
                    </div>
                    {errors.email?.type === "required" && <p className="validation-error">Email is Required</p>}
                    {errors.email?.type === "pattern" && <p className="validation-error">Email is not Valid</p>}
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="designation"
                            placeholder="Designation"
                            {...register("designation", { required: true })}
                        />
                        <label htmlFor="designation">Designation</label>
                    </div>
                    {errors.designation?.type === "required" && <p className="validation-error">Designation is Required</p>}
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            type="number"
                            id="salary"
                            placeholder="Salary"
                            {...register("salary", { required: true, min: 0 })}
                        />
                        <label htmlFor="salary">Salary</label>
                    </div>
                    {errors.salary?.type === "required" && <p className="validation-error">Salary is Required</p>}
                    {errors.salary?.type === "min" && <p className="validation-error">Amount is not Valid</p>}
                    <div className="form-floating mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="phone"
                            placeholder="Phone"
                            {...register("phone", {
                                required: true,
                                pattern:
                                    /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
                            })}
                        />
                        <label htmlFor="phone">Phone</label>
                    </div>
                    {errors.phone?.type === "required" && <p className="validation-error">Phone Number is Required</p>}
                    {errors.phone?.type === "pattern" && <p className="validation-error">Phone Number is not Valid</p>}
                </form>
            </div>
            <div className="card-footer d-flex justify-content-center">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSubmit(onSubmit)}
                >
                    {isEdit ? "UPDATE" : "ADD"}
                </button>
                <CustomModal
                    isEdit={true}
                    isOpen={isOpen}
                    toggleModal={toggleModal}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    id={id}
                />
            </div>
        </div>
    );
};

export default CustomForm;
