import {Button, Container, Form} from "react-bootstrap";
import styles from "../styles/navbar.module.css";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import TextInputField from "../components/form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import {useForm} from "react-hook-form";
import {ResetPasswordCredentials, UserLoginCredentials} from "../network/websites_api";
import * as WebsitesApi from "../network/websites_api";
import {UnauthorizedError} from "../errors/http_errors";

const ForgotPasswordReceivedPage = () => {
  const {id} = useParams();
  const [showResetpassword, setShowResetpassword] = useState(false);
  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<ResetPasswordCredentials>();

  async function onSubmit(credentials: ResetPasswordCredentials) {
    try {
      console.log(credentials.password, credentials.repassword);
      if (credentials.password !== credentials.repassword) {
        alert("Passwords do not match");
        return;
      }
      let result;
      if (id) {
        result = await WebsitesApi.resetPassword(credentials, id.toString());
      }
      if (result) {
        alert("Password Reset Successful");
        setShowResetpassword(false);
        // 跳转首页
        window.location.href = "/";
      }

    } catch (error) {
      if (error instanceof UnauthorizedError) {
        // setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  useEffect(() => {
    if (id) {
      setShowResetpassword(true);
    }
  }, []);

  return (
    <>
      {
        showResetpassword && <>
          <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <TextInputField
                name="password"
                label="Password"
                type="password"
                placeholder="Username"
                register={register}
                className="inputBootstrap"
                registerOptions={{required: "Required"}}
                error={errors.password}
              />
              <TextInputField
                name="repassword"
                label="rePassword"
                type="password"
                placeholder="Password"
                className="inputBootstrap"
                register={register}
                registerOptions={{required: "Required"}}
                error={errors.repassword}
              />
              <Button
                variant="success"
                type="submit"
                disabled={isSubmitting}
                className={styleUtils.width100}>
                Reset Password
              </Button>
            </Form>

          </Container>
        </>
      }
      {
        !showResetpassword &&
        <div>
          <p>
            Please check your email for a link to reset your password.
          </p>
          <Link to='/'>
            <Button className={styles.button}>
              Return Home
            </Button>
          </Link>
        </div>
      }<br/></>
  );
}

export default ForgotPasswordReceivedPage;
