import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onsubmit(data) {
    navigate("/welcome");
    setTimeout(() => {
      navigate("/page1", { state: { formData: data } });
    }, 2700);
  }

  return (
    <div className={styles.main}>
      <div className={styles.hleft}>
        <img
          className={styles.image1}
          src="/src/images/HF.png"
          alt="Image Not Found"
        />
        <h1 className={styles.statement}>Discover new things on Superapp</h1>
      </div>

      <div className={styles.hright}>
        <h1 className={styles.heading}>Super app</h1>
        <p className={styles.l2}>Create your new account</p>
        <div className={styles.inputfield}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <input
              type="text"
              placeholder="Name"
              {...register("Name", {
                required: {
                  value: true,
                  message: "Name is Requried",
                },
              })}
            />
            <br />
            {errors.Name && (
              <p className={styles.error}>{errors.Name.message}</p>
            )}

            <input
              type="text"
              placeholder="UserName"
              {...register("UserName", {
                required: {
                  value: true,
                  message: "UserName is Requried",
                },
              })}
            />
            <br />
            {errors.UserName && (
              <p className={styles.error}>{errors.UserName.message}</p>
            )}

            <input
              type="email"
              placeholder="Email"
              {...register("Email", {
                required: {
                  value: true,
                  message: "Email is Requried",
                },
              })}
            />
            <br />
            {errors.Email && (
              <p className={styles.error}>{errors.Email.message}</p>
            )}

            <input
              type="text"
              placeholder="Mobile"
              {...register("Mobile", {
                required: {
                  value: true,
                  message: "Mobile Number is Requried",
                },

                minLength: {
                  value: 10,
                  message: "Enter 10 digit mobile number",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "Mobile Number must be numeric",
                },
              })}
            />
            <br />
            {errors.Mobile && (
              <p className={styles.error}>{errors.Mobile.message}</p>
            )}

            <input
              className={styles.checkbox}
              type="checkbox"
              {...register("Checkbox", {
                required: {
                  value: true,
                  message: "Data is safe to share, Pleace Select this field",
                },
              })}
            />

            <span className={styles.checkboxinfo}>
              Share my registration data with Superapp
            </span>
            <br />
            {errors.Checkbox && (
              <p className={styles.error}>{errors.Checkbox.message}</p>
            )}

            <button className={styles.signupbtn}>SIGN UP</button>
          </form>

          <p className={styles.l3}>
            By clicking on Sign up. you agree to Superapp{" "}
            <span className={styles.highlight}>
              Terms and Conditions of Use
            </span>
          </p>
          <p className={styles.l4}>
            To learn more about how Superapp collects, uses, shares and protects
            your personal data please head Superapp{" "}
            <span className={styles.highlight}>Privacy Policy </span>
          </p>
        </div>
      </div>
    </div>
  );
}
