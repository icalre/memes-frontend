import {FormItem} from "../../../styled-components";
import {Button, Form, Input} from "antd";
import {InputError} from "../../../components";
import {FormEventHandler, PropsWithChildren, useEffect, useState} from "react";
import {useAuth} from "../../../providers";
import {MemeService} from "../../../services";
import {validationAdapter} from "../../../adapters";

export const MemeForm = ({meme}: PropsWithChildren<{
    meme?: any
}>) => {

    const [title, setTitle] = useState(meme ? meme.title : "");
    const [image, setImage] = useState(meme ? meme.image : "");
    const [errors, setErrors]: [any, any] = useState({});
    const auth = useAuth();
    const user: any = auth.getAccessToken();

    const submit: FormEventHandler = () => {
        if (meme && meme.id) {
            updateMeme();
        } else {
            saveMeme();
        }
    };

    const saveMeme = () => {
        const userId = user.id;
        MemeService.create({title, image, userId}).then(() => {
            window.location.reload();
        }).catch((error) => {

            if (!!error.response && error.response.status === 422) {
                const responseErrors = validationAdapter(error.response.data.extraMessage);
                setErrors(responseErrors);
            } else if (!!error.response && error.response.status != 422) {
                console.log(error.response.data);
                const message = error.response.data.extraMessage || error.response.data.message;
                alert(message);
            } else {
                console.log(error);
                alert(error.message);
            }
        });
    }

    const updateMeme = () => {
        const userId = user.id;
        MemeService.update(meme.id, {title, image, userId}).then(() => {
            window.location.reload();
        }).catch((error) => {
            if (!!error.response && error.response.status === 422) {
                const responseErrors = validationAdapter(error.response.data.extraMessage);
                setErrors(responseErrors);
            } else if (!!error.response && error.response.status != 422) {
                console.log(error.response.data);
                const message = error.response.data.extraMessage || error.response.data.message;
                alert(message);
            } else {
                console.log(error);
                alert(error.message);
            }
        });
    }

    return (
        <Form
            name="basic"
            initialValues={{title: title, image: image}}
            onFinish={submit}
            autoComplete="off"
            layout="vertical"
            size="large"
        >
            <FormItem noStyle>
                <FormItem label="Titulo"
                          name="title">
                    <Input placeholder="Indica tu correo electronico" value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </FormItem>
                {!!errors.title && errors.title.map((error: string, index: number) => (
                    <InputError key={index} message={error} className="mt-2"/>))}
            </FormItem>
            <FormItem noStyle>
                <FormItem label="Url de la imagen"
                          name="image">
                    <Input placeholder="Url de la imagen" value={image}
                           onChange={(e) => setImage(e.target.value)}/>
                </FormItem>
                {!!errors.image && errors.image.map((error: string, index: number) => (
                    <InputError key={index} message={error} className="mt-2"/>))}
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" className="w-full">
                    Registrar
                </Button>
            </FormItem>
        </Form>
    );
};