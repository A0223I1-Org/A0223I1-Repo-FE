// import {useNavigate} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import * as service from "../../src/utils/InformationService/CustomerManagementService/CustomerService"
import {useState} from "react";
import "./CreateCustomerCSS.css"
import {toast} from "react-toastify";


export function CreateCustomer  () {
    // const navigate = useNavigate()
    const [lastestCustomerId,setLastestCustomerId] = useState("KH01")

    // const generateCustomerId = () =>{
    //     const currentNumber = parseInt(lastestCustomerId.slice(2),10)
    //     const nextNumber = currentNumber + 1;
    //     const nextCustomerId = `KH${nextNumber.toString().padStart(2, "0")}`
    //     setLastestCustomerId(nextCustomerId)
    //     return nextCustomerId
    // }
    return (
        <Formik initialValues={
            {
                customerId: {lastestCustomerId},
                customerName: "",
                age: 18,
                address: "",
                phoneNumber: "",
                customerType: "",
                note: "",
                accountId: 0
            }
        } validationSchema={Yup.object({
            customerName: Yup.string()
                .matches(/^[a-zA-Z\s]+$/, 'Customer name must be String')
                .required('Customer name is required'),
            age: Yup.number().min(18, 'Age must be at least 18 years old'),
            address: Yup.string().required('Address is required'),
            phoneNumber: Yup.string()
                .matches(/^[0-9]{10}$/, 'Phone number must be a 10-digit number')
                .required('Phone number is required'),
            customerType: Yup.string().required('Customer type is required'),
            note: Yup.string().required('Note is required')
        })}
                onSubmit={(values,{setSubmitting})=>{
            const createCustomer = async ()=>{
                setSubmitting(false)
                await service.createCustomer(values)
                toast('Bạn vừa thêm mới 1 khách hàng')
                // navigate("/")
            }
            createCustomer()
        }}>
            {({isSubmitting})=>(
                <div className='container'>
                    <h1>Thêm mới khách hàng</h1>
                    <Form>
                        <div className='mb-3'>
                            <label htmlFor='customerId' className='form-label'>
                                Customer ID:
                            </label>
                            <Field type='text'
                                   className='form-control'
                                   id='customerId'
                                   name='customerId'

                            ></Field>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='customerName' className='form-label'>
                                Name
                            </label>
                            <Field type='text' className='form-control' id='customerName' name='customerName'></Field>
                            <ErrorMessage name='customerName' component='span' className=' text-danger'></ErrorMessage>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='age' className='form-label'>
                                Quantity
                            </label>
                            <Field type='text' className='form-control' id="age" name='age'></Field>
                            <ErrorMessage name='age' component='span' className=' text-danger'></ErrorMessage>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='address' className='form-label'>
                                Address:
                            </label>
                            <Field type='text' className='form-control' id="address" name='address'></Field>
                            <ErrorMessage name='address' component='span' className=' text-danger'></ErrorMessage>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='phoneNumber' className='form-label'>
                                Phone number:
                            </label>
                            <Field type='text' className='form-control' id="phoneNumber" name='phoneNumber'></Field>
                            <ErrorMessage name='phoneNumber' component='span' className=' text-danger'></ErrorMessage>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='customerType' className='form-label'>
                                Customer Type:
                            </label>
                            <Field as="select" name="customerType" id="customerType">
                                <option value="">--Choose--</option>
                                <option value="Khách lẻ">Khách lẻ</option>
                                <option value="Khách sỉ">Khách sỉ</option>
                                <option value="Khách theo đơn">Khách theo đơn</option>
                            </Field>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='note' className='form-label'>
                                Note
                            </label>
                            <Field type='text' className='form-control' id="note" name='note'></Field>
                            <ErrorMessage name='note' component='span' className=' text-danger'></ErrorMessage>
                        </div>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <button type='reset' className='btn btn-primary'>Reset</button>
                        <button type='submit' className='btn btn-danger'>Cancel</button>
                    </Form>
                </div>
            )}
        </Formik>
    )

}