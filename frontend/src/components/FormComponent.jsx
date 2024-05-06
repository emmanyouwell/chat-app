import { useFormik } from 'formik';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import socket from '../socket';
  const FormComponent = ({setConnected}) => {
    const formik = useFormik({
        initialValues: {
            username: '',
        },
        onSubmit: values => {
            console.log(values);
            socket.emit('join server', values.username);
            setConnected(true);
        }
    })
    return (
       <Card color="transparent" shadow={false}>
        
        <form onSubmit={formik.handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Name
            </Typography>
            <Input
              size="lg"
              placeholder="ex. John Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
           </div>
          <Button type="submit" className="mt-6" fullWidth>
            Join Server
          </Button>
         
        </form>
      </Card>
    );
  }

  export default FormComponent;