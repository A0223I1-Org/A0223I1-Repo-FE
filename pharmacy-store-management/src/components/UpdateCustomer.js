import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import * as service from "../../src/utils/InformationService/CustomerManagementService/CustomerService"
import toast from "bootstrap/js/src/toast";

export function UpdateCustomer() {
    const {customerId} = useParams()
    const [customerUpdate, setCustomerUpdate] = useState({
        customerId: '',
        customerName: '',
        age: 18,
        address: '',
        phone: '',
        customerType: 'Khách lẻ',
        note: '',
    })
    const navigate = useNavigate()
    return customerUpdate.customerName !== "" ? (
        <>
            <Formik initialValues={{
                customerId: customerUpdate.customerId,
                customerName: customerUpdate.customerName,
                age: customerUpdate.age,
                address: customerUpdate.address,
                phone: customerUpdate.phone,
                customerType: customerUpdate.customerType,
                note: customerUpdate.note
            }}
                    validationSchema={Yup.object(
                        {
                            customerName: Yup.string().required(),
                            age: Yup.number().min(18),
                            address: Yup.string().required(),
                            phone: Yup.string().required(),
                            customerType: Yup.string().required(),
                            note: Yup.string().required()
                        })}
                    onSubmit={(values, {setSubmitting}) => {
                        const update = async () => {
                            setSubmitting(false)
                            await service.updateCustomer(customerId, values)
                            toast("Update success")
                            navigate("/")
                        }
                        update()
                    }}>
                {({isSubmitting}) => (
                    <div className='container'>
                        <h1>Update customer</h1>
                        <Form>
                            <div className='mb-3'>
                                <label htmlFor='customerId' className='form-label'>
                                    Customer ID:
                                </label>
                                <Field type='text'
                                       className='form-control'
                                       id='customerId'
                                       name='customerId'
                                       disabled
                                ></Field>
                                <ErrorMessage name='name' component='span' className=' text-danger'></ErrorMessage>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='name' className='form-label'>
                                    Name
                                </label>
                                <Field type='text' className='form-control' id='name' name='name'></Field>
                                <ErrorMessage name='name' component='span' className=' text-danger'></ErrorMessage>
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
                                <label htmlFor='phone' className='form-label'>
                                    Phone number:
                                </label>
                                <Field type='text' className='form-control' id="phone" name='phone'></Field>
                                <ErrorMessage name='phone' component='span' className=' text-danger'></ErrorMessage>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='customerType' className='form-label'>
                                    Customer Type:
                                </label>
                                <option value="Khách lẻ" selected={customerUpdate.customerType === 'Khách lẻ'}>
                                    Khách lẻ
                                </option>
                                <option value="Khách sỉ" selected={customerUpdate.customerType === 'Khách sỉ'}>
                                    Khách sỉ
                                </option>
                                <option value="Khách theo đơn" selected={customerUpdate.customerType === 'Khách theo đơn'}>
                                    Khách theo đơn
                                </option>
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
        </>
    ) : ""
}
