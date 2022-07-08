import React from 'react';
import { Row, Button, Container } from 'react-bootstrap';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import callApi from '../../utils/callApi';
import cookies from 'react-cookies';

function Login(props) {

    const schema = yup.object().shape({
        username: yup.string().required().min(5),
        password: yup.string().required().min(5),

    }).required();


    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        if (handleLogin) {
            handleLogin(data)
        }
    }


    const history = useHistory();

    const handleLogin = async (data) => {
        try {
            await callApi('api/admins/login', 'POST', {
                username: data.username,
                password: data.password,
            })
                .then(res => {
                    // console.log('res', res)
                    if (res.status === 200) {
                        cookies.save('admin', res.data)
                    }
                    else if (res.status === 400) {
                        alert("Tài khoản hoặc mật khẩu không đúng");
                        // loginFaild = true
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert("Tài khoản hoặc mật khẩu không đúng");
                })

            history.push('/list')

        }
        catch (err) {
            console.log(err.response)
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <h3 className="mt-80">Đăng Nhập</h3>
                <form className="mt-20">
                    <p className="form-group">
                        <label>Tài Khoản</label>
                        <input
                            name="username"
                            className="form-control max-width-400"
                            type="text"
                            {...register("username")}
                        />
                    </p>
                    {errors?.username?.type === "required" && <p className="valid-form__message">* Vui lòng nhập tên đăng nhập</p>}
                    {errors?.username?.type === "min" && <p className="valid-form__message">* Tên đăng nhập phải dài hơn 5 ký tự</p>}
                    <p className="form-group">
                        <label>Mật Khẩu</label>
                        <input
                            name="password"
                            className="form-control max-width-400"
                            type="password"
                            {...register("password")}
                        />
                    </p>
                    {errors?.password?.type === "required" && <p className="valid-form__message">* Vui lòng nhập mật khẩu</p>}
                    {errors?.password?.type === "min" && <p className="valid-form__message">* Mật khẩu phải dài hơn 5 ký tự</p>}
                </form>

            </Row>
            <Button variant="primary"
                onClick={handleSubmit(onSubmit)}
            >
                Đăng Nhập
            </Button>
        </Container>
    );
}

export default Login;