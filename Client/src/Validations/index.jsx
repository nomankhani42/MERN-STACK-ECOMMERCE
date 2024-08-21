import * as Yup from 'yup';

export const CheckoutSchema=Yup.object({
    first_Name:Yup.string().min(3).max(10).required('First Name is Required'),
    last_Name:Yup.string().min(3).max(10).required('Last Name is Required'),
    email:Yup.string().email().required('Email is required'),
     phone:Yup.number().required('Phone Number is required'),
     street:Yup.string().required('Street is Required'),
    city:Yup.string().required('City is required'),
    state:Yup.string().required('State is required'),
    postal_code:Yup.number().required('Postal Code is required'),
    country:Yup.string().required('Country is Required')


});

export const SignUpSchema=Yup.object({
    name:Yup.string().min(3).max(25).required('Name is required'),
    userName:Yup.string().email().required('User Must be entered'),
    country:Yup.string().required('Country Must Be Eneterd'),
    answer:Yup.string().required('Please Enter Your Favorte Animal Name'),
    password:Yup.string().required('Password is Required').min(6).max(16)
})

export const SignInSchema=Yup.object({
    userName:Yup.string().min(3).max(25).required('UserName is required'),
    password:Yup.string().required('Password is Required').min(6).max(16)
})

export const updateProfileSchema=Yup.object({
    name:Yup.string().min(3).max(25).required('Name is required'),
    userName:Yup.string().email().required('User Must be entered'),
    country:Yup.string().required('Country Must Be Eneterd'),

    role:Yup.number()
})


