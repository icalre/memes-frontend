import {FormEventHandler, useState} from "react";
import {BaseLayout, InputError} from "../../components";
import {Button, Form, Input} from "antd";
import {FormItem} from "../../styled-components";
import {AuthService} from "../../services";
import {validationAdapter} from "../../adapters";
import {useAuth} from "../../providers";
import {Navigate} from "react-router-dom";


export const Register = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] : [any,any]= useState({});
    const auth = useAuth();
    const submit: FormEventHandler = () => {
        AuthService.register({email, name, password}).then((response) => {
            const {user, token} = response.data.data;
            user.token = token;
            auth.setAccessToken(user);
        }).catch((error) => {
            if(!!error.response && error.response.status === 422)
            {
                const responseErrors = validationAdapter(error.response.data.extraMessage);
                setErrors(responseErrors);
            }else if(!!error.response && error.response.status != 422){
                console.log(error.response.data);
                const message = error.response.data.extraMessage || error.response.data.message;
                alert(message);
            }else{
                console.log(error);
                alert(error.message);
            }
        });
    };

    if(auth.isAuthenticated)
    {
        return (<Navigate to="/"/>);
    }

    return (
        <BaseLayout>
            <Form
                name="basic"
                initialValues={{name:'',email: '', password: ''}}
                onFinish={submit}
                autoComplete="off"
                layout="vertical"
                size="large"
            >
                <FormItem noStyle>
                    <FormItem label="Correo electrónico"
                              name="name">
                        <Input placeholder="Indica tu correo electronico" value={name}
                               onChange={(e) => setName(e.target.value)}/>
                    </FormItem>
                    {!!errors.name && errors.name.map((error: string, index:number) => (<InputError key={index} message={error} className="mt-2"/>))}
                </FormItem>
                <FormItem noStyle>
                    <FormItem label="Correo electrónico"
                              name="email">
                        <Input placeholder="Indica tu correo electronico" value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                    </FormItem>
                    {!!errors.email && errors.email.map((error: string, index:number) => (<InputError key={index} message={error} className="mt-2"/>))}
                </FormItem>
                <FormItem noStyle>
                    <FormItem label="Contraseña"
                              name="password">
                        <Input.Password placeholder="Escribe tu contraseña" value={password}
                                        onChange={(e) => setPassword(e.target.value)}/>
                    </FormItem>
                    {!!errors.password && errors.password.map((error: string, index:number) => (<InputError key={index} message={error} className="mt-2"/>))}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="w-full">
                        Registrarse
                    </Button>
                </FormItem>
            </Form>
        </BaseLayout>
    );
}