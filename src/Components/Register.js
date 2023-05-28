import React, { useState } from "react";
import FormLog from "./FormLog";
import InfoTooltip from "./InfoTooltip";
import iconSeccessfull from "../img/SeccessfullIcon.svg";
import badIcon from "../img/badIcon.svg";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ handleRegister }) {
  const [formValue, setFormValue] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [regStatus, setRegStatus] = useState({
    messageError: "",
    isError: true,
  });
  const [isOpenPupup, setIsOpenPupup] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.userEmail || !formValue.userPassword) {
      return;
    }
    handleRegister(formValue)
      .then(() => {
        setFormValue({ userEmail: "", userPassword: "" });
        setRegStatus({
          messageError: "",
          isError: false,
        });
        setIsOpenPupup(true);
        setTimeout(() => {
          navigate("/sign-in", { replace: true });
        }, 1000);
      })
      .catch((err) => {
        setRegStatus({
          messageError: err,
          isError: true,
        });
        setIsOpenPupup(true);
      });
  };

  return (
    <main>
      <section className="login container">
        <h1 className="login__title">Регистрация</h1>
        <FormLog
          btnTextInfo="Зарегистрироваться"
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        ></FormLog>
        <button className="login__redirect" type="button">
          <Link to="/sign-in" className="main-menu__item-link">
            Уже зарегистрированы? Войти
          </Link>
        </button>
        <InfoTooltip
          isSeccessfull={!regStatus.isError}
          iconSeccessfull={iconSeccessfull}
          badIcon={badIcon}
          isOpen={isOpenPupup}
          onClose={() => {
            setIsOpenPupup(false);
          }}
        />
      </section>
    </main>
  );
}
